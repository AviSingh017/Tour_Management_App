const {TourModel} = require("../models/Tour");
const {ReviewModel} = require("../models/Review");

const createReview = async(req,res)=>{

    const tourId = req.params.tourId;
    const newReview = new ReviewModel({...req.body})

    try {
        const savedReview = await newReview.save()

        await TourModel.findByIdAndUpdate(tourId,{
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({success:true, message:"Review Submitted", data:savedReview})
        
    } catch (error) {
        res.status(500).json({success:false, message:"Failed to submit review", error:error.message})
    }
};

module.exports={createReview};