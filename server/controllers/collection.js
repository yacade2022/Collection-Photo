import { StatusCodes } from "http-status-codes";
import Collection from "../models/collectionModel.js";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

export const upLoad = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const Obj = { ...req.body };

  const response = await cloudinary.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "file-upload",
  });

  Obj.image = response.secure_url;
  await fs.unlink(req.file.path);
  const collection = await Collection.create(Obj);

  res.status(StatusCodes.OK).json({ message: "image uploaded", collection });
};

export const getAllImages = async (req, res) => {
  const collection = await Collection.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ collection, userName: req.user.name });
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  const collection = await Collection.findByIdAndDelete({
    _id: id,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.OK).json("image deleted");
};
