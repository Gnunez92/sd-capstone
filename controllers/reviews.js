const MOOC = require('../models/mooc');
const Review = require('../models/review');

module.exports.postReview = async (req,res) => {
    const { id } = req.params;
    const mooc = await MOOC.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    mooc.reviews.push(review);
    await mooc.save();
    await review.save();
    res.redirect(`/moocs/${id}`)
}

module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params;
    await MOOC.findByIdAndUpdate(id, { $pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/moocs/${ id }`);
}