const express = require("express");
const userRoute = express.Router();

const { updateUser, deleteUser, createUser, getAllUser, getSingleUser} = require("../controllers/userController");
const {verifyAdmin, verifyUser} = require("../middleware/verifyToken");


//create new user
userRoute.post("/", verifyUser, createUser);

//update new user
userRoute.put("/:id", verifyUser, updateUser);

//delete new user
userRoute.delete("/:id", verifyUser, deleteUser);

//get all new user
userRoute.get("/", verifyAdmin, getAllUser);

//get single new user
userRoute.get("/:id", verifyUser, getSingleUser);

module.exports = {userRoute};
