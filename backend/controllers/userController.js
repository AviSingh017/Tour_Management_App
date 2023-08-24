const { UserModel } = require("../models/User");


const createUser = async (req, res) => {
    const newUser = new UserModel(req.body);
    try {
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true,
            message: "User Successfully Created",
            data: savedUser,
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create new User!",
            error:err.message
        })
    }

};

const updateUser = async (req, res) => {

    const id = req.params.id;

    try {

        const updatedUser = await UserModel.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: updatedUser,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to Update User!",
            error:error.message
        });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {

        await UserModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete User!",
            error:error.message
        });
    }
};

const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {

        const user = await UserModel.findById(id);

        res.status(200).json({
            success: true,
            message: "User",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found!",
            error:error.message
        });
    }
};

const getAllUser = async (req, res) => {

    try {

        const users = await UserModel.find({})

        res.status(200).json({
            success: true,
            message: "Successful",
            data: users
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unable to fetch users. Something went wrong!",
            error:error.message
        })
    }
};

module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getAllUser,
    getSingleUser
}