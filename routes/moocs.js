const express = require('express');
const router = express.Router();
const AppError = require('../utilities/AppError');
const asyncCatcher = require('../utilities/asyncCatcher');
const { validateMOOC, isAuthenticated, isCreator } = require('../middleware/middleware');
const mooc = require('../controllers/moocs');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

// ------------- Model --------------

const MOOC = require('../models/mooc');

// ---------- Routes -----------------

router
    .route('/')
    .get(asyncCatcher(mooc.renderIndex))
    .post(
        isAuthenticated,
        upload.single("image"),
        validateMOOC,
        asyncCatcher( mooc.postNewMOOC )
    );

router.get('/about', mooc.renderAbout);

router.get('/new', isAuthenticated, mooc.renderNew);

router.get('/all', asyncCatcher(mooc.renderAll));

router
    .route('/:id')
    .get(asyncCatcher( mooc.renderMOOC ))
    .put(
        isAuthenticated,
        isCreator,
        validateMOOC,
        asyncCatcher( mooc.updateMOOC )
    );

router.get(
    '/:id/edit',
    isAuthenticated,
    isCreator,
    asyncCatcher( mooc.renderMOOCEdit )
);

router

router.delete(
    '/:id/delete',
    isAuthenticated,
    isCreator,
    asyncCatcher( mooc.deleteMOOC ));


module.exports = router;