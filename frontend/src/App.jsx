import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '~/pages/Home/index'
import Redemption from '~/pages/Redemption/index'
import Gifts from '~/pages/Gifts/index'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/redemption' element={<Redemption />} />
        <Route path='/gifts' element={<Gifts />} />
      </Routes>
    </Router>
  )
}

export default App
