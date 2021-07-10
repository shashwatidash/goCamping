const { campJoiSchema, reviewSchema } = require('./schemas.js');

const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campgrounds');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {

        //store the url they were accessing!
        req.session.returnTo = req.originalUrl;

        req.flash('error', 'You must be signed in to add a camp!');
        return res.redirect('/login');
    }
    next();
}
module.exports.campValidation = (req, res, next) => {
    
    const { error } = campJoiSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', `You don't have permission to do that!`);
        return res.redirect(`/campgrounds/${id}`);
    } else {
        next();
    }

}

module.exports.reviewValidation = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', `You don't have permission to do that!`);
        return res.redirect(`/campgrounds/${id}`);
    }
    next();

}