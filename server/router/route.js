import { Router } from "express";

//import all components

import * as controller from "../controllers/appController.js";

const router = Router();

//POST Method
router.route("/register").post(controller.register); //register user

/* router.route("/registerMail").post();  */ //send a mail
router.route("/authendicate").post((req, res) => res.end()); //authendicate user
router.route("/login").post(controller.login); //login to the app

//GET Method
router.route("/user/:username").get(controller.getUser); //user with username
router.route("/generateOTP").get(controller.generateOTP); //generate random otp
router.route("/verifyOTP").get(controller.generateOTP); //veryfy the otp
router.route("/createResetSession").get(controller.createResetSession); //reset all the variables

//PUT Method
router.route("/updateuser").put(controller.updateUser); //update the user profile
router.route("/resetPassword").put(controller.resetPassword); //use the reset password

export default router;
