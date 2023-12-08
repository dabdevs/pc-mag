import { createContext, useState, useEffect, useContext } from "react";

const ShoppingCartContext = createContext({})

export const useShoppingCartContext = () => useContext(ShoppingCartContext)

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        console.log('Adding to cart:', item)
        setCartItems([...cartItems, item])
    }

    return (
        <ShoppingCartContext.Provider value={{
            addToCart,
            cartItems,
            setCartItems
        }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContext;