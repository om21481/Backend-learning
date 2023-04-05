import user_schema from "../models/user_schema.js"
import { createError } from "../utils/error.js";

// DELETE
export const deleteusers = async(req, res, next) => {
    try {
        const Deletedusers = await user_schema.findByIdAndDelete(req.params.id);
        res.status(200).json(Deletedusers)

    } catch (error) {
        next(createError(500, "Error in deleting the user"))
    }
}
//UPDATE
export const updateusers = async(req, res, next) => {
    try {
        const Updatedusers = await user_schema.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(Updatedusers)

    } catch (error) {
        next(createError(500, "Error in updating the user"))
    }
}
// GET
export const getusers = async(req, res, next) => {
    try {
        const Newusers = await user_schema.findById(req.params.id);
        res.status(200).json(Newusers)

    } catch (error) {
       next(createError(500, "Error in getting the user"))
    }
}

// GETALL
export const getallUsers = async(req, res, next) => {
    try {
        const AllUsers = await user_schema.find(req.params.id);
        res.status(200).json(AllUsers)

    } catch (error) {
        next(createError(500, "Error in getting the user"))
    }
}