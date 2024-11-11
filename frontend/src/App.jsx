import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '~/pages/Home/index'
import Gifts from '~/pages/Gifts/index'
import Profile from '~/pages/Profile/index'
import Cart from '~/pages/Cart/index'
import { CartProvider } from '~/pages/Cart/CartProvider/CartProvider'

function App() {

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/gifts/*' element={<Gifts />} />
          <Route path='/profile/*' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
