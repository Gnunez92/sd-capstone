const MOOC = require('../models/mooc')
const User = require('../models/user');


module.exports.renderRegistration = (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res) => {
    try{
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const newUser = await User.register(user, password);
        req.login(newUser, (err) => {
            if(err) return next(e);
            req.flash("success", "Welcome to LearnGreen!");
            res.redirect('/moocs')
        });
    } catch (e){
        req.flash("error", e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome back to LearnGreen');
    res.redirect('/moocs');
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', "You are now logged out");
    res.redirect('/moocs')
}

module.exports.userDetails = async (req, res) =>{
    const {id} = req.params;
    const user = await User.findById(id)
    const user_moocs = await MOOC.find({submittedBy: user._id})
    const username = user.username
    res.render('users/details', { user_moocs, username, id})
}