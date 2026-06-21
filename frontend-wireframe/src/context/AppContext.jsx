import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, id: Date.now() }])
  }

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    setUser,
    login,
    logout,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    showChat,
    setShowChat,
    cartOpen,
    setCartOpen,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
