import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '~/pages/Home/index'
import Redemption from '~/pages/Redemption/index'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/redemption' element={<Redemption />} />
      </Routes>
    </Router>
  )
}

export default App
