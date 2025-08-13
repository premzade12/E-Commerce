import express from 'express'
import isAuth from '../middleware/isAuth.js'
<<<<<<< HEAD
import { allOrders, placeOrder, updateStatus, userOrders } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

=======
import { placeOrder, placeOrderStripe } from '../controller/orderController.js'
import { createStripePayment } from '../controller/orderController.js'
>>>>>>> 9a328788552d80f7625eb3e6f93c21c195cc86a1


const orderRoutes = express.Router()

//for user
orderRoutes.post("/placeorder",isAuth,placeOrder)
<<<<<<< HEAD
orderRoutes.post("/userorder",isAuth,userOrders)

//for admin
orderRoutes.post("/list",adminAuth,allOrders)
orderRoutes.post("/status",adminAuth,updateStatus)
=======
orderRoutes.post("/create-stripe-payment", isAuth, createStripePayment);
orderRoutes.post("/Stripe",isAuth,placeOrderStripe)
>>>>>>> 9a328788552d80f7625eb3e6f93c21c195cc86a1

export default orderRoutes