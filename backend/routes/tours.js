const express = require("express");
const tourRoute = express.Router();
const {createTour, updateTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getFeaturedTour, getTourCount} = require("../controllers/tourController");
const {verifyToken, verifyAdmin, verifyUser} = require("../middleware/verifyToken");

//create new Tour
tourRoute.post("/", verifyAdmin, createTour);

//update new Tour
tourRoute.put("/:id", verifyAdmin, updateTour);

//delete new Tour
tourRoute.delete("/:id", verifyAdmin, deleteTour);

//get all new Tour
tourRoute.get("/", getAllTour);

//get single new Tour
tourRoute.get("/:id", getSingleTour);

//get tours by search
tourRoute.get("/search/getTourBySearch", getTourBySearch);

//get tours by featured post
tourRoute.get("/search/getFeaturedTour", getFeaturedTour);

//get tours count
tourRoute.get("/search/getTourCount", getTourCount);


module.exports = {tourRoute};