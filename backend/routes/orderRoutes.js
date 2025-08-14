import express from 'express';
import isAuth from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import {
    allOrders,
    placeOrder,
    updateStatus,
    userOrders,
    placeOrderStripe,
    createStripePayment
} from '../controller/orderController.js';

const orderRoutes = express.Router();

// For user - COD
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/userorder", isAuth, userOrders);

// For user - Stripe
orderRoutes.post("/create-stripe-payment", isAuth, createStripePayment);
orderRoutes.post("/Stripe", isAuth, placeOrderStripe);

// For admin
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);

export default orderRoutes;
