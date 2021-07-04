const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("./../controllers/user");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("./../controllers/auth");

// my routes starts

router.param("userId", getUserById);
// populates req.profile in controller

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// using populate from other collection
router.get(
  "/order/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

// my routes end

module.exports = router;
