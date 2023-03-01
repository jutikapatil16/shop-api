// import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const userproductRoute = require('./routes/product');
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

// db connection
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

  //  ALL API ROUTES 
  app.use(express.json());

  app.use("/api/auth",authRoute);
  app.use("/api/users",userRoute);
  app.use("/api/products",userproductRoute)
  app.use("/api/cart",cartRoute)
  app.use("/api/orders",orderRoute)


//app listening
app.listen(5000, function () {
  console.log("server started at 5000");
});
