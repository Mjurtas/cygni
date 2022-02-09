import express from "express";
import {getPhotos} from "../Controllers/galleryController.js"

const router = express.Router();
router.route("/").get(getPhotos);

export default router;