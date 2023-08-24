const express = require("express");
const reviewRoute = express.Router();
const { createReview } = require("../controllers/reviewController");

reviewRoute.post("/:tourId", createReview);

module.exports = {reviewRoute}