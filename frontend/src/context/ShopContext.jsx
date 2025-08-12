import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext';
import axios from 'axios';
import { userDataContext } from './UserContext';

export const shopDataContext = createContext();

function ShopContext({ children }) {

    let [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});

    let { serverUrl } = useContext(authDataContext);
    let { userData } = useContext(userDataContext); // ✅ minimal fix added

    let currency = '₹';
    let delivery_fee = 40;

    const getProducts = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list");
            
            setProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addtoCart = async (itemId, size) => {
        if (!size) {
            console.log("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);

        if (userData) {
            try {
                await axios.post(serverUrl + '/api/cart/add', { itemId, size }, { withCredentials: true });
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("Add error");
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item]
                    }
                } catch (error) { }
            }
        }
        return totalCount;
    }

    useEffect(() => {
        getProducts();
    }, [])

    let value = {
        products, currency, delivery_fee, getProducts,
        search, setSearch, showSearch, setShowSearch,
        cartItem, addtoCart, getCartCount, setCartItem
    }

    return (
        <div>
            <shopDataContext.Provider value={value}>
                {children}
            </shopDataContext.Provider>
        </div>
    )
}

export default ShopContext
