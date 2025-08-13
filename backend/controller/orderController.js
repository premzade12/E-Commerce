import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "inr";

// COD Order
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId, { cartData: {} });

        return res.status(200).json({ message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Order Place error" });
    }
};

// Stripe Step 1: Create Payment Intent
export const createStripePayment = async (req, res) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: amount * 100, // amount in paise
            currency,
            payment_method_types: ["card"],
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Stripe Step 2: Place order after payment success
export const placeOrderStripe = async (req, res) => {
    try {
        const { items, amount, address, paymentIntentId } = req.body;
        const userId = req.userId;

        // Verify payment
        const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ message: "Payment not successful" });
        }

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "Stripe",
            payment: true,
            date: Date.now(),
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.status(200).json({ message: "Order placed via Stripe" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};




export const userOrders = async (req,res)=>{
    try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({message:"userOrders error"})
    }
}



//for admin
export const allOrders = async(req,res)=>{
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({message:"adminAllOrders error"})
    }
}

export const updateStatus = async(req,res)=>{
    try {
        const {orderId, status} = req.body;

        await Order.findByIdAndUpdate(orderId, {status});
        return res.status(201).json({message:'Status Updated'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}