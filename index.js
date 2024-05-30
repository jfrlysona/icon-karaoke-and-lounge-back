import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { CategoriesRouter } from "./src/router/CategoriesRouter.js";
import { ItemsRouter } from "./src/router/ItemsRouter.js";
import UploadRouter from "./src/router/UploadRouter.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { OtpRouter } from "./src/router/OtpRouter.js";
import { UsersRouter } from "./src/router/UsersRouter.js";
import { OrdersRouter } from "./src/router/OrdersRouter.js";

const app = express();
const port = process.env.PORT;
const key = process.env.KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());

app.use("/api/images", express.static(path.join(__dirname, "public")));

app.use("/api", CategoriesRouter);
app.use("/api", ItemsRouter);
app.use("/api", UploadRouter);
app.use("/api", OtpRouter);
app.use("/api", UsersRouter);
app.use("/api", OrdersRouter);

mongoose
  .connect(key)
  .then(() => console.log("Connected to the menu database!"))
  .catch((error) => console.log("Not Connected! Error:", error));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
