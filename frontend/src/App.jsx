import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '~/pages/Home/index'
import Gifts from '~/pages/Gifts/index'
import Profile from '~/pages/Profile/index'
import Cart from '~/pages/Cart/index'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/gifts/*' element={<Gifts />} />
        <Route path='/profile/*' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App
