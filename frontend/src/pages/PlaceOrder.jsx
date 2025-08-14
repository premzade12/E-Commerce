import React, { useContext, useState } from "react";
import Title from "./Title";
import CartTotal from "../component/CartTotal.jsx";
<<<<<<< HEAD
import stripe from "../assets/stripe.png";
=======
import stripe1 from "../assets/stripe.png";
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
import { shopDataContext } from "../context/ShopContext.jsx";
import { authDataContext } from "../context/authContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

function PlaceOrder() {
  let [method, setMethod] = useState("cod");
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();
=======
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RvXaHFufNua0lBNgvpJJqI1gbwKTFcQoW5sFXoNSxB0aWoxeJqNXhIhHvKMJThpdbGIQBlKWGhjb2T0wr00YTuD00jycTRjc4"
);

function PlaceOrder() {
  let [method, setMethod] = useState("cod");
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
<<<<<<< HEAD
    phone: ""
  });

  // ✅ FIX: Correctly extract name and value from target
=======
    phone: "",
  });

>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
<<<<<<< HEAD
            const itemInfo = structuredClone(products.find((product) => product._id === items));
=======
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
<<<<<<< HEAD
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };
      switch (method) {
        case "cod":
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true });
          console.log(result.data);
          if(result.data){
            setCartItem({});
            navigate("/order");
          }else{
            console.log(result.data.message);
          }
          break;
=======

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          );
          if (result.data) {
            setCartItem({});
            navigate("/order");
          } else {
            toast.error(result.data.message);
          }
          break;

        case "stripe":
          if (!stripe || !elements) {
            toast.error("Stripe is still loading...");
            return;
          }
          const token = localStorage.getItem("token");

          // ✅ Send items + address instead of just amount
          const createIntent = await axios.post(
            serverUrl + "/api/order/create-stripe-payment",
            { items: orderItems, address: formData },
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          if (!createIntent.data.url) {
            toast.error("Failed to create Stripe session");
            return;
          }

          // ✅ Redirect to Stripe Checkout
          window.location.href = createIntent.data.url;
          setCartItem({});
          break;

>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
        default:
          break;
      }
    } catch (error) {
      console.log(error);
<<<<<<< HEAD
=======
      toast.error("Order submission failed");
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
    }
  };

  return (
    <div
      className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center
    flex-col md:flex-row gap:[50px] relative"
    >
      <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]">
<<<<<<< HEAD
        {/* ✅ FIX: Add onSubmit to form */}
        <form onSubmit={onSubmitHandler} className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]">
          <div className="py-[10px]">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
=======
        <form
          onSubmit={onSubmitHandler}
          className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]"
        >
          <div className="py-[10px]">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          {/* Form Inputs */}
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="First name"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white]
            text-[18px] px-[20px]"
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
            />
<<<<<<< HEAD

=======
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
            <input
              type="text"
              placeholder="Last name"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white]
            text-[18px] px-[20px]"
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </div>
<<<<<<< HEAD
=======

>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="email"
              placeholder="Email address"
              className="w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white]
            text-[18px] px-[20px]"
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
            />
          </div>
<<<<<<< HEAD
=======

>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Street"
              className="w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white]
            text-[18px] px-[20px]"
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
            />
          </div>
<<<<<<< HEAD
=======

>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white]
            text-[18px] px-[20px]"
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
            />
<<<<<<< HEAD

=======
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white]
            text-[18px] px-[20px]"
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
            />
          </div>
<<<<<<< HEAD
=======

>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white]
            text-[18px] px-[20px]"
              required
              onChange={onChangeHandler}
              name="pinCode"
              value={formData.pinCode}
            />
<<<<<<< HEAD

=======
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white]
            text-[18px] px-[20px]"
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
            />
          </div>
<<<<<<< HEAD
=======

>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Phone"
              className="w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-white text-[18px] px-[20px]"
              maxLength={10}
              pattern="[0-9]{10}"
              inputMode="numeric"
              onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
            />
          </div>

<<<<<<< HEAD
=======

>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
          <div>
            <button
              type="submit"
              className="text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex 
            items-center justify-center gap-[20px] absolute lg:right-[20%]  bottom-[10%] right-[35%] border-[1px] border-[#80808049] 
            ml-[30px] mt-[20px]"
            >
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>
<<<<<<< HEAD
=======

      {/* Payment Method Buttons */}
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
      <div className="lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]">
        <div className="lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col">
          <CartTotal />
          <div className="py-[10px]">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className="w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]">
            <button
              onClick={() => setMethod("stripe")}
              className={`w-[200px] h-[50px] rounded-sm transition-all duration-200 
<<<<<<< HEAD
                  ${
                    method === "stripe"
                      ? "border-[3px] border-blue-900 shadow-lg shadow-blue-500/30"
                      : "border-[3px] border-blue-900 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
                  }`}
            >
              <img src={stripe} alt="Stripe" className="w-full h-full object-contain rounded-sm" />
=======
                  ${method === "stripe"
                    ? "border-[3px] border-blue-900 shadow-lg shadow-blue-500/30"
                    : "border-[3px] border-blue-900 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
                  }`}
            >
              <img src={stripe1} alt="Stripe" className="w-full h-full object-contain rounded-sm" />
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
            </button>
            <button
              onClick={() => setMethod("cod")}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] 
              text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${
<<<<<<< HEAD
                method === "cod" ? "border-[5px] border-blue-900 rounded-sm" : ""
=======
                method === "cod"
                  ? "border-[5px] border-blue-900 rounded-sm"
                  : ""
>>>>>>> f214fbc2aa966f01bc370c6f02777c92dd97920f
              }`}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
