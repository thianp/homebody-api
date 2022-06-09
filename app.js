require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models/index");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const paymentRouter = require("./routes/paymentRoute");
const adminRouter = require("./routes/adminRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const addressRouter = require("./routes/addressRoute");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authUser = require("./middlewares/authUser");
const authAdmin = require("./middlewares/authAdmin");

const app = express();
app.use(cors());

// sequelize.sync({ force: true });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/users", authUser, userRouter);
app.use("/cartitems", authUser, cartRouter);
app.use("/orders", orderRouter); // authorization specified within router
app.use("/payments", paymentRouter); // authorization specified within router
app.use("/admin", adminRouter);
app.use("/products", productRouter); // authorization specified within router
app.use("/categories", categoryRouter); 
app.use("/address", addressRouter); 

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port: " + port));
