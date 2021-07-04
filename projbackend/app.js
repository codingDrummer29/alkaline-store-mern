require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");

// middleware imports
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// route imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");
// const stripeRoutes = require("./routes/stripepayment");

const app = express();

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//  middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// my routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);
// app.use("/api", stripeRoutes);

// port
const port = process.env.PORT || 8000;

// starting the server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
