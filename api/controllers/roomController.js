import hotels_schema from "../models/hotels_schema";
import room_schema from "../models/room_schema";
import { createError } from "../utils/error";

export const createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    const Room = new room_schema(req.body);

    try {
        const NewRoom = await Room.save();
        await hotels_schema.findByIdAndUpdate(hotelId, {$push: {rooms: NewRoom._id}});

        res.status(200).json(NewRoom);
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await room_schema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
      next(err);
    }
  };
  export const updateRoomAvailability = async (req, res, next) => {
    try {
      await room_schema.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };
  export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await room_schema.findByIdAndDelete(req.params.id);
      try {
        await hotels_schema.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  export const getRoom = async (req, res, next) => {
    try {
      const room = await room_schema.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };
  export const getRooms = async (req, res, next) => {
    try {
      const rooms = await room_schema.find();
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };