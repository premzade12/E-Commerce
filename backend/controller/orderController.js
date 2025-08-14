import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
<<<<<<< HEAD

=======
import Product from "../model/productModel.js";
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "inr";

// COD Order
export const placeOrder = async (req, res) => {
<<<<<<< HEAD
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

// Get orders for a user
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: "userOrders error" });
    }
};

// For admin - get all orders
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: "adminAllOrders error" });
    }
=======
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
    return res.status(500).json({ message: "Order Place error" });
  }
};

// Create Stripe Checkout Session
export const createStripePayment = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    // Build line_items from DB prices
    const line_items = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item._id);
        if (!product) throw new Error(`Product not found: ${item._id}`);
        return {
          price_data: {
            currency,
            product_data: { name: product.name },
            unit_amount: product.price * 100, // paise
          },
          quantity: item.quantity,
        };
      })
    );

    // Calculate total amount
    const orderAmount = line_items.reduce(
      (acc, li) => acc + li.price_data.unit_amount * li.quantity,
      0
    ) / 100;

    // Create order in DB (payment: false)
    const newOrder = new Order({
      items,
      amount: orderAmount,
      userId,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });
    await newOrder.save();

    const origin = req.headers.origin;

    // Create Stripe Checkout Session
    const session = await stripeInstance.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items,
  mode: "payment",
  success_url: `${origin}/verify?sessionId={CHECKOUT_SESSION_ID}&orderId=${newOrder._id}`,

  cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
});


    return res.status(200).json({ url: session.url });
  
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Stripe Step 2: Mark order as paid
export const placeOrderStripe = async (req, res) => {
  const { orderId, sessionId } = req.body;
  const userId = req.userId;

  try {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Verify payment with Stripe
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Mark order as paid
    order.payment = true;
    order.status = "Processing"; // optional, set default status
    await order.save();

    // ✅ Clear user's cart
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({ message: "Order placed via Stripe" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



// Get user's orders
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ date: -1 }); // latest first
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "userOrders error" });
  }
};


// Admin: get all orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "adminAllOrders error" });
  }
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
};

// Update order status
export const updateStatus = async (req, res) => {
<<<<<<< HEAD
    try {
        const { orderId, status } = req.body;

        await Order.findByIdAndUpdate(orderId, { status });
        return res.status(201).json({ message: "Status Updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
=======
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ message: "Status Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
};
