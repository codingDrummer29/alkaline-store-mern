const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// for individual items
const productInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "ProductModel",
  }, // an array of quantity-changed product ids
  name: String,
  count: Number,
  price: Number,
});

const ProductInCartModel = mongoose.model(
  "ProductInCartModel",
  productInCartSchema
);

// for all the orders
const orderSchema = new mongoose.Schema(
  {
    products: [productInCartSchema],
    // for individual items altogether
    transaction_id: {},
    amount: { type: Number },
    address: {
      type: String,
      trim: true,
      maxlength: 2000,
      required: true,
    },
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processesing", "Recieved"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("OrderModel", orderSchema);

// module.exports = mongoose.model("OrderModel", OrderSchema);
module.exports = { OrderModel, ProductInCartModel };
// exporting multiple schemas from a single file
