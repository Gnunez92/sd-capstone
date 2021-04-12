const AppError = require('../utilities/AppError');

const MOOC = require('../models/mooc');
const Review = require('../models/review');

const { moocSchema, reviewSchema } = require('../joiSchemas');



module.exports.isAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You must be signed in to do that');
		return res.redirect('/login');
	}
	next();
};


module.exports.isCreator = async (req, res, next) => {
	const { id } = req.params;
	const mooc = await MOOC.findById(id);
	if (!mooc.submittedBy.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/moocs/${id}`);
	}
	next();
};

module.exports.isReviewCreator = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/moocs/${id}`);
	}
	next();
};


module.exports.validateMOOC = (req, res, next) => {
    const { error } = moocSchema.validate(req.body);
    if(error){
        const msg = error.details.map( e => e.message ).join(",")
        throw new AppError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};