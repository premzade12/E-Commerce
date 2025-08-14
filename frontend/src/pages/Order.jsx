import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Order() {
    const [orderData, setOrderData] = useState([]);
    const { currency } = useContext(shopDataContext);
    const { serverUrl } = useContext(authDataContext);

    const loadOrderData = async () => {
        try {
            const result = await axios.post(
                `${serverUrl}/api/order/userOrders`,
                {},
                { withCredentials: true }
            );

            if (result.data && result.data.length > 0) {
                // Flatten all order items
                const allOrdersItem = [];
                result.data.forEach((order) => {
                    order.items.forEach((item) => {
                        allOrdersItem.push({
                            ...item,
                            status: order.status || "Processing",
                            payment: order.payment,
                            paymentMethod: order.paymentMethod,
                            date: order.date,
                        });
                    });
                });

                // Latest orders first
                setOrderData(allOrdersItem.reverse());
            } else {
                setOrderData([]); // No orders
            }
        } catch (error) {
            console.log("Error loading orders:", error);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, []);

    return (
        <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[15px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1="MY" text2="ORDER" />
            </div>
            <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
                {orderData.length === 0 ? (
                    <p className='text-white text-center w-full mt-10'>
                        No orders yet.
                    </p>
                ) : (
                    orderData.map((item, index) => (
                        <div key={index} className='w-[100%] h-auto border-t border-b'>
                            <div className='w-[100%] flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative'>
                                {/* Product Image */}
                                <img
                                    src={item.image1}
                                    alt={item.name}
                                    className='w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-md mx-auto md:mx-0'
                                />

                                <div className='flex flex-col w-full items-center md:items-start gap-[5px]'>
                                    <p className='md:text-[25px] text-[18px] text-[#f3f9fc] text-center md:text-left'>
                                        {item.name}
                                    </p>

                                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-[8px] md:gap-[20px]'>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>
                                            {currency} {item.price}
                                        </p>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>
                                            Quantity: {item.quantity}
                                        </p>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7]'>
                                            Size: {item.size}
                                        </p>
                                    </div>

                                    <div className='md:text-[18px] text-[12px] text-[#aaf4e7] text-center md:text-left'>
                                        Date:{" "}
                                        <span className='text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px]'>
                                            {new Date(item.date).toDateString()}
                                        </span>
                                    </div>

                                    <p className='md:text-[16px] text-[12px] text-[#aaf4e7]'>
                                        Payment Method: {item.paymentMethod}
                                    </p>

                                    {/* Status */}
                                    <div className='flex items-center gap-[5px] mt-2'>
                                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                        <p className='md:text-[17px] text-[10px] text-[#f3f9fc]'>
                                            {item.status}
                                        </p>
                                    </div>

                                    {/* Track Order Button */}
                                    <button
                                        className='mt-2 md:mt-0 md:px-[15px] px-[8px] md:py-[7px] py-[5px] rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] md:text-[16px] cursor-pointer active:bg-slate-500'
                                        onClick={loadOrderData}
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Order;

