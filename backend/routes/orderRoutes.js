import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { placeOrder, placeOrderStripe } from '../controller/orderController.js'
import { createStripePayment } from '../controller/orderController.js'


const orderRoutes = express.Router()

//for user
orderRoutes.post("/placeorder",isAuth,placeOrder)
orderRoutes.post("/create-stripe-payment", isAuth, createStripePayment);
orderRoutes.post("/stripe",isAuth,placeOrderStripe)

export default orderRoutes