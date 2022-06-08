require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models/index");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");

const app = express();
app.use(cors());

// sequelize.sync({ force: true });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/cartitems", authenticate, cartRouter);
app.use("/orders", authenticate, orderRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port: " + port));
