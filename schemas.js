const Joi = require('joi');

module.exports.campJoiSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(10),
        //image : Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
        
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required()
    }).required()
})