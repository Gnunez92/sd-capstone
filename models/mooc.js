const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const MOOCSchema = new Schema({
    name: String,
    image: {
        url: String,
        filename: String
    },
    instructors: Array,
    topics: Array,
    description: String,
    difficulty: String,
    hosting_site: String,
    course_link: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    submittedBy:  {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
})

MOOCSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Review.deleteMany({
			_id: {
				$in: data.reviews,
			},
		});
	}
});


module.exports = mongoose.model("MOOC", MOOCSchema)