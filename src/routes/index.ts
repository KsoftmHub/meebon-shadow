import imageToServer from "@meebon/packages/utils/lib/ImageToServer.js";
import express from "express";
const appRoute = express.Router();


import multer from "multer";
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });



export default appRoute;