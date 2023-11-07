import { createContext, useState, useEffect, useContext } from "react";

const ShoppingCartContext = createContext({})

export const useShoppingCartContext = () => useContext(ShoppingCartContext)

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [isItemInCart, setIsItemInCart] = useState(false);

    const addToCart = async (item) => {
        setCartItems((cartItems) => ({...cartItems, ...item}))

        setQuantity((prevQuantity) => prevQuantity + 1)
        const inCart = cartItems.find((cartItem) => cartItem.name === item.name); // check if the item is already in the cart
        
        if (!inCart) {
            setIsItemInCart(true)
        }
    }

    return (
        <ShoppingCartContext.Provider value={{
            addToCart,
            cartItems,
            setCartItems,
            quantity,
            setQuantity,
            isItemInCart,
            setIsItemInCart
        }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContext;