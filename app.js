if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const AppError = require('./utilities/AppError');
const session = require('express-session');
const flash = require('connect-flash');


const passport = require('passport');
const PassportLocal = require('passport-local');
const User = require('./models/user');

const PORT = 3000;

// Routers
const moocRouter = require('./routes/moocs');
const reviewRouter = require('./routes/reviews');
const authRouter = require('./routes/users')

mongoose
    .connect('mongodb://localhost:27017/MOOCdb',{
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch((error) => handleError(error))

const sessionConfig = {
	secret: 'drake',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));
app.use(flash());

//passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// ------------ Middleware ----------------

app.use((req, res, next) => {
    res.locals.user = req.user;
	res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
	next();
});

// ---------------Routes ------------------

app.get('/', (req, res) => {
    res.render('home');
});

// MOOC paths
app.use('/moocs', moocRouter);

// Review paths
app.use('/moocs/:id/reviews', reviewRouter);

// User paths
app.use('/', authRouter);

// Catch-all Routes
app.use('*', (req, res, next) => {
    next(new AppError("Page not found", 404))
});

app.use((err, req, res, next) => {
	const { status = 500 } = err;
	const { message = 'I am in danger' } = err;
	res.status(status).render("error", {err});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})