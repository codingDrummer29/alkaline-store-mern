const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 chars long"),
  check("email").isEmail().withMessage("Valid mail is requirde"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 characters, including a number")
    .matches(/\d/)
    .withMessage("Must Contain a Number"),
  signup
);

router.post(
  "/signin",
  check("email").isEmail().withMessage("Valid mail is requirde"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
  signin
);

router.get("/signout", signout);

/* secure route - needs authentication
router.get("/testroute", isSignedIn, (req, res) => {
  // res.send("A protected route");
  res.json(req.auth);
});
/* router.get("/testroute", (req, res) => {
 *   res.send("A protected route");
 * });
 *
 * for this code we don't require authorization
 * always shows the res.sed message
 */
module.exports = router;
