import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { placeOrder } from '../controller/orderController'



const orderRoutes = express.Router()

orderRoutes.post("/placeorder",isAuth,placeOrder)

export default orderRoutes