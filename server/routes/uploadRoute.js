import { Router } from "express";
const router = Router();

import {
  upLoad,
  getAllImages,
  deleteImage,
} from "../controllers/collection.js";
import upload from "../middelware/multerMiddelware.js";

router.post("/upload", upload.single("image"), upLoad);
router.get("/getImages", getAllImages);
router.delete("/delete/:id", deleteImage);

export default router;
