import { createContext, useState } from 'react'

const CartContext = createContext()

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item])
  }

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }