const { TourModel } = require("../models/Tour");


const createTour = async (req, res) => {
    const newTour = new TourModel(req.body);
    try {
        const savedTour = await newTour.save();

        res.status(200).json({
            success: true,
            message: "Tour Successfully Created",
            data: savedTour,
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create new tour!",
            error:err.message
        })
    }

};

const updateTour = async (req, res) => {

    const id = req.params.id;

    try {

        const updatedTour = await TourModel.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.status(200).json({
            success: true,
            message: "Tour Updated Successfully",
            data: updatedTour,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to Update tour!",
            error:error.message
        });
    }
};

const deleteTour = async (req, res) => {
    const id = req.params.id;

    try {

        await TourModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Tour Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete tour!",
            error:error.message
        });
    }
};

const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {

        const tour = await TourModel.findById(id).populate('reviews');

        res.status(200).json({
            success: true,
            message: "Tour",
            data: tour,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Tour not found!",
            error:error.message
        });
    }
};

const getAllTour = async (req, res) => {

    const page = parseInt(req.query.page);

    try {

        const tours = await TourModel.find({}).populate('reviews').skip(page * 8).limit(8);

        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Successful",
            data: tours
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unable to fetch tours. Something went wrong!",
            error:error.message
        })
    }
};


const getTourBySearch = async (req,res) =>{

    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {

        const tours = await TourModel.find({ city, 
            distance:{$gte: distance}, 
            maxGroupSize: {$gte:maxGroupSize} }).populate('reviews');

            res.status(200).json({
                success: true,
                message: "Successful",
                data: tours
            })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found!",
            error:error.message
        })
    }
};

const getFeaturedTour = async (req,res) =>{

    try {

        const tours = await TourModel.find({ featured:true} ).populate('reviews').limit(8);

            res.status(200).json({
                success: true,
                message: "Successful",
                data: tours
            })
        
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found!",
            error:error.message
        })
    }
};


const getTourCount = async (req, res) => {

    try {

        const tourCount = await TourModel.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tourCount
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unable to fetch tours. Something went wrong!",
            error:error.message
        })
    }
};



module.exports = {
    createTour,
    updateTour,
    deleteTour,
    getAllTour,
    getSingleTour,
    getTourBySearch,
    getFeaturedTour,
    getTourCount
};
