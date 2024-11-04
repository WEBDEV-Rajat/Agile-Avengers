import { Router } from "express";
const router = Router();

import { registerUser,loginUser ,changePassword,logoutUser} from "../Controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
router.route("/register").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJWT,logoutUser);
router.route("/change-password").post(verifyJWT,changePassword);
export default router;
