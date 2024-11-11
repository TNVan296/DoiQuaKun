import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import Logout from '~/components/LoginModal/Logout'
import CartContent from '~/pages/Cart/CartContent/CartContent'

function Cart() {
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)
  const [hasCartItem, setHasCartItem] = useState(true)
  const navigate = useNavigate()

  const logOutSuccess = () => {
    setHasUser(false)
    localStorage.setItem('hasUser', 'false')
    setShowLogOutModal(false)
    navigate('/home')
  }

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('hasUser')
    setHasUser(
      isUserLoggedIn === 'true' ? true : false
    )
    if (!isUserLoggedIn) {
      navigate('/home')
    }
    return () => {
      setHasUser(false)
    }
  }, [navigate])

  return (
    <div className='container mx-auto'>
      <Header hasUser={hasUser} openLogOutModal={() => setShowLogOutModal(true)}/>
      <CartContent hasCartItem={hasCartItem} />
      <Footer />
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={() => setShowLogOutModal(false)} logOutSuccess={() => logOutSuccess()} />}
    </div>
  )
}

export default Cart