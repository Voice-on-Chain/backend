import express from "express";
import { uploadImage } from "../middlewares/imagekit.middleware";
import { ExtendedRequest } from "../utils/interfaces";
import { userVerification } from "../middlewares/authorization.middleware";

const router = express.Router();

router.post(
  "",
  userVerification,
  uploadImage,
  (request: ExtendedRequest, response) => {
    const fileUploaded = request.fileUploaded;
    response.status(200).json(fileUploaded);
  }
);

export default router;
