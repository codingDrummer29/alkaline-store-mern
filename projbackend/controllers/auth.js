const UserModel = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new UserModel(req.body);
  user.save((err, user) => {
    console.log("ERROR while SignUp is: ", err);
    if (err) {
      return res.status(400).json({
        err: "Not able to register user",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });

  // console.log("REQ BODY", req.body);
  // res.json({
  //   message: "Signup from auth",
  // });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  // validator for inserted values while signin
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  // checking entered email-pw with database
  UserModel.findOne({ email }, (err, user) => {
    // FIXME: no response when email without reg
    // DEBUG:
    if (err || !user) {
      return res.status(400).json({
        error: "User with this email doesn't exist",
      });
    }

    // checking pw if authenticated with reg. email
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "User Email with this password does't exists",
      });
    }

    // STEPS: if no errors found, let signin
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 999 });

    // send response to the frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  // clear the cookie
  res.clearCookie("token");

  res.json({
    message: "User Signout Successfully",
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["RSA", "sha1", "RS256", "HS256"],
  userProperty: "auth",
});

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  // profile from frontend for user to denote a role
  // auth from above protected route
  // that f.end profile_id === auth._id
  if (!checker) {
    return res.status(403).json({
      error: "Access DENIED",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access DENIED",
    });
  }

  next();
};
