import express from "express";
import {getPhotos} from "../Controllers/galleryController.js"

const router = express.Router();

router.route("/:tags&:page").get(getPhotos);

export default router;