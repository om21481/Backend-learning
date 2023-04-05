import user_schema from "../models/user_schema.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        const newUser = new user_schema(req.body);
        const NewUser = await newUser.save();
        res.status(200).json(NewUser);
    } catch (error) {
        next(error)
    }
}

export const login = async(req, res, next) => {
    try {
        const User = await user_schema.findOne({username: req.body.username});

        if(!User) return next(createError(404, "User Not found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            User.password
        )

        if(!isPasswordCorrect) return next(createError(404, "User not found"))

        const {password, isAdmin, ...OtherDetails} = User._doc;

        const token = jwt.sign({id: User._id, isAdmin: User.isAdmin}, process.env.SECRET_KEY);

        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json(OtherDetails)

        // res.clearCookie("access_token");     # to delete a cookie

    } catch (error) {
        next(error)
    }
}
