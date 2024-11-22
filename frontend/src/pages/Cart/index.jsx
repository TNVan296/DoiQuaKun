import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import Logout from '~/components/LoginModal/Logout'
import CartContent from '~/pages/Cart/CartContent/CartContent'
import ExchangedPoints from '~/components/BottomNav/ExchangedPoints'

function Cart() {
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)
  const navigate = useNavigate()

  const logOutSuccess = () => {
    setHasUser(false)
    localStorage.setItem('hasUser', 'false')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userEmail')
    setShowLogOutModal(false)
    navigate('/home')
  }

  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ children }) => {
    const isUserLoggedIn = localStorage.getItem('accessToken')
    if (!isUserLoggedIn) {
      alert('Vui lòng đăng nhập để truy cập nội dung này !')
      return <Navigate to='/home' />
    }
    return children
  }

  useEffect(() => {
    const isAccessToken = localStorage.getItem('accessToken')
    if (isAccessToken) {
      setHasUser(true)
    } else {
      setHasUser(false)
      return <Navigate to='/home' />
    }
  }, [navigate])

  return (
    <div className='container mx-auto'>
      <Header hasUser={hasUser} openLogOutModal={() => setShowLogOutModal(true)}/>
      <PrivateRoute>
        <CartContent />
      </PrivateRoute>
      <Footer />
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={() => setShowLogOutModal(false)} logOutSuccess={() => logOutSuccess()} />}
      {hasUser && <ExchangedPoints />}
    </div>
  )
}

export default Cart