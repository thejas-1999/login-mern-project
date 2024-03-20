import { Router } from "express";

const router = Router();

//POST Method
router.route("/register").post((req, res) => {
  res.json(`Register route`);
});

router.route("/registerMail").post(); //register user
router.route("/authendicate").post(); //authendicate user
router.route("/login").post(); //login to the app

//GET Method
router.route("/user/:username").get(); //user with username
router.route("/generateOTP").get(); //generate random otp
router.route("/verifyOTP").get(); //veryfy the otp
router.route("/createResetSession").get(); //reset all the variables

//PUT Method
router.route("/updateuser").put(); //update the user profile
router.route("/resetPassword").put(); //use the reset password

export default router;
