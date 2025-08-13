import React, { useContext, useState } from "react";
import Title from "./Title";
import CartTotal from "../component/CartTotal.jsx";
import stripe1 from "../assets/stripe.png";
import { shopDataContext } from "../context/ShopContext.jsx";
import { authDataContext } from "../context/authContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

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

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

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
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
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
          console.log(result.data);
          if (result.data) {
            setCartItem({});
            navigate("/order");
          } else {
            console.log(result.data.message);
          }
          break;

        case "stripe":
          if (!stripe || !elements) {
            toast.error("Stripe is still loading...");
            return;
          }
          const token = localStorage.getItem("token");

          const createIntent = await axios.post(
            serverUrl + "/api/order/create-stripe-payment",
            { amount: getCartAmount() + delivery_fee },
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          const cardElement = elements.getElement(CardElement);
          if (!cardElement) {
            toast.error("Card details not entered!");
            setLoading(false);
            return;
          }

          const { clientSecret, paymentIntentId } = createIntent.data;

          const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  name: `${formData.firstName} ${formData.lastName}`,
                  email: formData.email,
                },
              },
            }
          );

          if (error) {
            toast.error(error.message);
            return;
          }
          if (paymentIntent.status === "succeeded") {
            // 3. Call backend to place the order
            await axios.post(
              serverUrl + "/api/order/stripe",
              {
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                address: formData,
                paymentIntentId, // send ID for backend verification
              },
              {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }
            );

            setCartItem({});
            navigate("/order");
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center
    flex-col md:flex-row gap:[50px] relative"
    >
      <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]">
        <form
          onSubmit={onSubmitHandler}
          className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]"
        >
          <div className="py-[10px]">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
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
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Phone"
              className="w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-white text-[18px] px-[20px]"
              maxLength={10}
              pattern="[0-9]{10}"
              inputMode="numeric"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/g, ""))
              }
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
            />
          </div>
          {method === "stripe" && (
            <div className="w-full px-[10px] mb-[20px]">
              <CardElement
                options={{
                  style: {
                    base: {
                      color: "#fff", // white text
                      fontSize: "16px",
                      "::placeholder": { color: "#ccc" },
                    },
                    invalid: { color: "#ff6b6b" },
                  },
                }}
                className="bg-slate-700 p-[10px] rounded-md shadow-sm shadow-[#343434]"
              />
            </div>
          )}
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
                  ${
                    method === "stripe"
                      ? "border-[3px] border-blue-900 shadow-lg shadow-blue-500/30"
                      : "border-[3px] border-blue-900 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
                  }`}
            >
              <img
                src={stripe1}
                alt="Stripe"
                className="w-full h-full object-contain rounded-sm"
              />
            </button>
            <button
              onClick={() => setMethod("cod")}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] 
              text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${
                method === "cod"
                  ? "border-[5px] border-blue-900 rounded-sm"
                  : ""
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
