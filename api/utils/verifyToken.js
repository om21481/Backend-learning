import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return next(createError(401, "User Not Authenticated"))

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return next(createError(403, "Token is not valid"));

        req.user = user;
        next()
    });
}

export const VerifyUser = (req, res, next) =>{
    VerifyToken(req, res, () =>{
        if(req.params.id === req.user.id || req.user.isAdmin){
            next()
        }else{
            next(createError(403, "You are not authorized"))
        }
    })
}

export const VerifyAdmin = (req, res, next) =>{
    VerifyToken(req, res, () => {
        if(req.user.isAdmin === true){
            next()
        }else{
            return next(createError(403, "You are not authorized"))
        }
    });    
}