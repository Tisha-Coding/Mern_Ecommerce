import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) =>
{

      const currency = '$'; // simply change the currency from here , if you want to use this proj for any other currency, symbol will get updated on complete website
      const delivery_fee = 10;
      const [search,setSearch] = useState('');
      const [showSearch,setShowSearch] = useState(false);
      const [cartItems,setCartItems] = useState({});
      const navigate = useNavigate();

    const addToCart = async(itemId,size) =>
    {

          if(!size)
          {
            toast.error('Select product Size');
            return;
          }




        // using structuredClone to create the copy of the object
           let cartData = structuredClone(cartItems);

           if(cartData[itemId])
           {
              if(cartData[itemId][size])
              {
                cartData[itemId][size] += 1;
              }
              else
              {
                cartData[itemId][size] = 1;
              }
           }
           else
           {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
           }
           setCartItems(cartData);
    }

   const getCartCount = () =>
   {
    let totalCount = 0;
    // iterating the items
    for(const items in cartItems)
    {
        // iterate the product size
        for(const item in cartItems[items])
        {
            try
            {
                if(cartItems[items][item] > 0)
                {
                     totalCount += cartItems[items][item];
                }
            }catch(error)
            {
               
            }
            }
        }
    return totalCount;
   }

   const updateQuantity = async(itemId,size,quantity) =>
   {
       let cartData = structuredClone(cartItems);
       cartData[itemId][size] = quantity;
       setCartItems(cartData);
   }

   const getCartAmount = () =>
   {
    let totalAmount = 0;
    for(const items in cartItems)
    {
        let itemInfo = products.find((product) => product._id === items);
        for(const item in cartItems[items])
        {
            try
            {
                if(cartItems[items][item] > 0)
                {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }catch(error)
            {

            }
        }
    }
    return totalAmount;
   }

    const value = {
            products, currency, delivery_fee,
            search,setSearch,showSearch,setShowSearch,
            cartItems,addToCart,
            getCartCount,updateQuantity,
            getCartAmount, navigate
    }

    return(
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
