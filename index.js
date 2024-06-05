require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { CategoriesRouter } = require("./src/router/CategoriesRouter.js");
const { ItemsRouter } = require("./src/router/ItemsRouter.js");
const UploadRouter = require("./src/router/UploadRouter.js");
const { OtpRouter } = require("./src/router/OtpRouter.js");
const { UsersRouter } = require("./src/router/UsersRouter.js");
const { OrdersRouter } = require("./src/router/OrdersRouter.js");
const path = require("path");

const app = express();
const port = process.env.PORT;
const key = process.env.KEY;

app.use(express.json());
app.use(cors());

const publicPath = path.join(__dirname, "public");
app.use("/api/images", express.static(publicPath));

app.use("/api", CategoriesRouter);
app.use("/api", ItemsRouter);
app.use("/api", UploadRouter);
app.use("/api", OtpRouter);
app.use("/api", UsersRouter);
app.use("/api", OrdersRouter);

mongoose
  .connect(key)
  .then(() => console.log("Connected to the menu database!"))
  .catch((error) => console.error("Not Connected! Error:", error));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
