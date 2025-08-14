import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrders, placeOrder, placeOrderStripe, updateStatus } from '../controller/orderController.js'
import { createStripePayment,userOrders } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import { adminLogin } from '../controller/authController.js'


const orderRoutes = express.Router()

//for user
orderRoutes.post("/placeorder",isAuth,placeOrder)
orderRoutes.post("/create-stripe-payment", isAuth, createStripePayment);
orderRoutes.post("/verifyStripe", isAuth, placeOrderStripe);
orderRoutes.post("/userOrders", isAuth, userOrders)
orderRoutes.post("/list", adminAuth, allOrders)
orderRoutes.post("/status", adminAuth, updateStatus)

export default orderRoutes