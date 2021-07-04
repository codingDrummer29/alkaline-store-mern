const { OrderModel, ProductInCartModel } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  OrderModel.findById(id)
    .populate("products.product", "name price")
    .exec((err, resOrder) => {
      if (err) {
        return res.status(400).json({
          error: "No order found associate with this order-id",
        });
      }
      req.order = resOrder;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const localOrder = new OrderModel(req.body.order);
  localOrder.save((err, resOrder) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to place the order in DB",
      });
    }
    res.json(resOrder);
  });
};

exports.getAllOrders = (req, res) => {
  OrderModel.find()
    .populate("user", "_id name ")
    .exec((err, resOrders) => {
      if (err) {
        return res.status(400).json({
          error: "No Orders found in DB",
        });
      }
      res.json(resOrders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(OrderModel.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  OrderModel.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, resStatus) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update the order status",
        });
      }
      res.json(resStatus);
    }
  );
};
