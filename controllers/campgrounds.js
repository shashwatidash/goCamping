const Campground = require('../models/campgrounds');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.newCampForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCamp = async(req, res, next) => {

    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();

    // if (!req.body.campground) throw new ExpressError('Invalid Data', 400);
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.author = req.user._id;

    await campground.save();
    console.log(campground)
    req.flash('success', 'Successfully made a  new campground!');
    res.redirect(`/campgrounds/${campground.id}`);

}

module.exports.showCamp = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if(!campground) {
        req.flash('error', 'Cannot find that campground!');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.editCampForm = async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCamp = async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const photos = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.images.push(...photos);
    await campground.save();
    req.flash('success', 'Successfully updated the campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}
module.exports.deleteCamp = async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Deleted a campground');
    res.redirect('/campgrounds');
}