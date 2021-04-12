const Joi = require('joi');

module.exports.moocSchema = Joi.object({
    mooc: Joi.object({
        name: Joi.string().required(),
        instructors: Joi.string().required(),
        topics: Joi.string().required(),
        description: Joi.string().required(),
        difficulty: Joi.string().required(),
        hosting_site: Joi.string().required(),
        course_link: Joi.string().required()
    }),
});

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required(),
		rating: Joi.number().required().min(0).max(1),
	}).required(),
});
