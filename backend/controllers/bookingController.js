const {BookingModel} = require("../models/Booking");


const createBooking = async(req,res)=>{

    const newBooking = new BookingModel(req.body);

    try {
        const savedBooking = await newBooking.save()

        res.status(200).json({success:true, message:"Your tour is booked", data:savedBooking})
        
    } catch (error) {
        res.status(500).json({success:false, message:"Failed to book tour", error:error.message})
    }
};


const getBooking = async(req,res) =>{
    const id = req.params.id;

    try {
        const book = await BookingModel.findById(id);

        res.status(200).json({success:true, message:"successful", data:book})
        
    } catch (error) {
        res.status(500).json({success:false, message:"Booking not found!", error:error.message})
    }
}

const getAllBooking = async(req,res) =>{

    try {
        const books = await BookingModel.find();

        res.status(200).json({success:true, message:"successful", data:books})
        
    } catch (error) {
        res.status(404).json({success:false, message:"Booking not found!", error:error.message})
    }
}


module.exports={createBooking,getBooking,getAllBooking};