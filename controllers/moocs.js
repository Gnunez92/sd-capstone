const MOOC = require('../models/mooc');
const ObjectId = require('mongoose').Types.ObjectId;
const { cloudinary } = require('../cloudinary/index')


module.exports.renderIndex = async (req, res) => {
    const moocs = await MOOC.find({}).populate('submittedBy');
    res.render('moocs/index', { moocs });
}

module.exports.renderAbout = ( req, res ) => {
    res.render('moocs/about');
}

module.exports.renderNew = (req, res) => {
    res.render('moocs/new');
}

module.exports.renderAll = async (req, res) => {
    const moocs = await MOOC.find({}).populate('submittedBy');
    res.render('moocs/all', { moocs });
}

module.exports.renderMOOC = async (req, res, next) => {
    const {id} = req.params;
    if(!ObjectId.isValid(id)){
        req.flash('error', 'Invalid URL!');
        res.redirect('/moocs')
    }
    const mooc = await MOOC.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate('submittedBy');
    if(!mooc){
        req.flash('error', 'Class does not exist!');
        res.redirect("/moocs")
    }
    res.render('moocs/show', { mooc });
}

module.exports.renderMOOCEdit = async (req, res) => {
    const {id} = req.params;
    const mooc = await MOOC.findById(id);
    if(!mooc) {
        req.flash('error', 'Class does not exist!');
        res.redirect("/moocs")
    }
    mooc.instructors = mooc.instructors.join(';');
    mooc.topics = mooc.topics.join(';');
    res.render('moocs/edit', { mooc });
}

module.exports.postNewMOOC = async (req, res) => {
    const mooc = new MOOC(req.body.mooc);
    mooc.image = {
		url: req.file.path,
		filename: req.file.filename,
	};
    mooc.submittedBy = req.user._id;
    mooc.instructors = mooc.instructors[0].split(';')
    mooc.topics = mooc.topics[0].split(';')
    await mooc.save();
    req.flash('success', 'New class was successfully added');
    res.redirect('/moocs');
}

module.exports.updateMOOC = async (req, res) => {
    const {id} = req.params;
    req.body.mooc.instructors = req.body.mooc.instructors.split(';')
    req.body.mooc.topics = req.body.mooc.topics.split(';')
    await MOOC.findByIdAndUpdate(
        id, {...req.body.mooc}
    );
    req.flash('success', `${req.body.mooc.name} was successfully updated`);
    res.redirect(`/moocs/${id}`);
}

module.exports.deleteMOOC = async (req, res) => {
    const {id} = req.params;
    const mooc = await MOOC.findById(id);
    await cloudinary.uploader.destroy(mooc.image.filename);
    await MOOC.findByIdAndDelete(id);
    res.redirect('/moocs');
}