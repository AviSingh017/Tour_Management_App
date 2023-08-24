const express = require("express");
const bookingRoute = express.Router();
const { createBooking, getAllBooking, getBooking } = require("../controllers/bookingController");
const {verifyUser,verifyAdmin} = require("../middleware/verifyToken");

bookingRoute.post("/", createBooking);
bookingRoute.get("/:id", verifyUser, getBooking);
bookingRoute.get("/", verifyAdmin, getAllBooking);

module.exports = {bookingRoute}