import { createError } from "../utils/error.js";
import Hotel from "../models/hotels_schema.js";

// CREATE 
export const createHotel = async(req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)

    } catch (error) {
        next(createError(500, "Error in creating the hotel"))
    }
}

// DELETE
export const deleteHotel = async(req, res, next) => {
    try {
        const DeletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(DeletedHotel)

    } catch (error) {
        next(createError(500, "Error in deleting the hotel"))
    }
}
//UPDATE
export const updateHotel = async(req, res, next) => {
    try {
        const UpdatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(UpdatedHotel)

    } catch (error) {
        next(createError(500, "Error in updating the hotel"))
    }
}
// GET
export const getHotel = async(req, res, next) => {
    try {
        const NewHotel = await Hotel.findById(req.params.id);
        res.status(200).json(NewHotel)

    } catch (error) {
       next(createError(500, "Error in getting the hotel"))
    }
}

// GETALL
export const getallHotels = async(req, res, next) => {
    try {
        const AllHotels = await Hotel.find();
        res.status(200).json(AllHotels)

    } catch (error) {
        next(createError(500, "Error in getting the hotel"))
    }
}

// Custom Queries
export const countByCity = async(req, res ,next) => {
    try {
        const cities = req.query.cities.split(',');         // query cities whithout double quotes
        
        const Hotel_data = await Promise.all(cities.map((city) => {
            return Hotel.countDocuments({city: city})
        }))

        res.status(200).json(Hotel_data);
    } catch (error) {
        next(createError(400, "Invalid Query"))
    }
}