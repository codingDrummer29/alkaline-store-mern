const UserModel = require("./../models/user");
const OrderModel = require("../models/order");

// works with param - with id
exports.getUserById = (req, res, next, id) => {
  // FIXME: giving error "TypeError: UserModel.findById(...).execute is not a function"
  // DEBUG: the document suggenst the chain func. as exec()
  UserModel.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found inside DB",
      });
    }
    req.profile = user;
    next();
  });

  UserModel.findById(id).exec();
};

// simple () - grabs user
exports.getUser = (req, res) => {
  //   rectifying user-profile data for req
  //   req.profile.salt = ""; shows field as blank
  req.profile.salt = undefined; // doesn't show the field
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(403).json({
          error: "Updatation of the User Unsuccessfull!",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

// populate controller
exports.userPurchaseList = (req, res) => {
  OrderModel.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "There are No Orders for this account",
        });
      }
      return res.json(order);
    });
};

// middleware - purchase-list handler - used in order controller
exports.pushOrderInPurchaseList = (req, res, next) => {
  let localPurchases = [];
  req.body.order.products.forEach((product) => {
    localPurchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });
  // store this in DB
  UserModel.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: localPurchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );

  //   next();
};
