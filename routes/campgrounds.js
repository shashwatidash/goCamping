
const express = require('express');
const router = express.Router();

const campgrounds = require('../controllers/campgrounds');

const Campground = require('../models/campgrounds');
const { isLoggedIn, isAuthor, campValidation } = require('../middleware');


const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })

// list all campgrounds
router.get('/', catchAsync(campgrounds.index));

// add new camp: form page
router.get('/new', isLoggedIn, campgrounds.newCampForm);

// post the new camp to list
router.post('/', isLoggedIn, upload.array('image'), campValidation, catchAsync(campgrounds.createCamp));

// individual camp page
router.get('/:id', catchAsync(campgrounds.showCamp));


// edit camp
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampForm));

// update camp
router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), campValidation, catchAsync(campgrounds.updateCamp));

// delete camp
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

module.exports = router;