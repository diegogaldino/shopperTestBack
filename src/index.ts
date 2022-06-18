
import app from "./app";
import { orderRouter } from "./routes/orderRouter";
import { productRouter } from "./routes/productRouter";
import { userRouter } from "./routes/userRouter";

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)

