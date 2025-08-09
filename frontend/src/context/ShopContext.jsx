import React, { createContext, useContext, useState } from 'react'
import { authDataContext } from './authContext';
import axios from 'axios';

export const shopDataContext = createContext();

function ShopContext({children}) {

    let [products,setProducts] = useState([]);
    let {serverUrl} = useContext(authDataContext);
    let currency = '₹';
    let delivery_fee = 40;

    const getProducts = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list");
            
        } catch (error) {
            
        }
    }

    let value = {

    }
  return (
    <div>
        <shopDataContext.Provider value = {value}>
            {children}
        </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext