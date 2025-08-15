import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors'
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

let port = process.env.PORT || 6000

let app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.use(cors({
    origin:["https://e-commerce-frontend-934t.onrender.com","https://e-commerce-admin-pymb.onrender.com"],
    credentials:true
}));


app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);


app.listen(port, ()=>{
    console.log("Hello From Server");
    connectDb();
})

