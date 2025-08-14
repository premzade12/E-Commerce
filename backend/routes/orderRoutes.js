import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { placeOrder, placeOrderStripe } from '../controller/orderController.js'
import { createStripePayment,userOrders } from '../controller/orderController.js'


const orderRoutes = express.Router()

//for user
orderRoutes.post("/placeorder",isAuth,placeOrder)
orderRoutes.post("/create-stripe-payment", isAuth, createStripePayment);
orderRoutes.post("/verifyStripe", isAuth, placeOrderStripe);
orderRoutes.post("/userOrders", isAuth, userOrders)

export default orderRoutes