import express from "express";
import {
  addressAuthentication,
  userVerification,
} from "../middlewares/authorization.middleware";
import { deleteImage, uploadImage } from "../middlewares/imagekit.middleware";
import { UserController } from "./../controllers/user.controller";

const userController = new UserController();
const router = express.Router();

// router.post("/create", addressAuthentication, userController.createProfile);

router
  .route("")
  .get(userVerification, userController.getProfile)
  .put(addressAuthentication, userController.updateProfile);

router.get("/communities", userVerification, userController.getUserCommunities);
router.post(
  "/communities/:communityId/join",
  userVerification,
  userController.joinCommunity
);
router.post(
  "/communities/:communityId/leave",
  userVerification,
  userController.leaveCommunity
);

router.post("/lend", userVerification, userController.lendVoice);
router.post("/retract", userVerification, userController.retractVoice);

router
  .route("/photo")
  .patch(userVerification, uploadImage, userController.updateProfilePhoto)
  .delete(userVerification, deleteImage, userController.deleteProfilePhoto);

export default router;
