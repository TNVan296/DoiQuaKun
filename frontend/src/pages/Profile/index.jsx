import { useEffect, useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import Logout from '~/components/LoginModal/Logout'
import Account from '~/pages/Profile/Account/Account'
import Coupons from '~/pages/Profile/Coupons/Coupons'
import History from '~/pages/Profile/History/History'
import ExchangedPoints from '~/components/BottomNav/ExchangedPoints'

function User() {
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)
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
      <Routes>
        <Route path='/account' element={<Account />} />
        <Route path='/coupons' element={<Coupons />} />
        <Route path='/history' element={<History />} />
      </Routes>
      <Footer />
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={() => setShowLogOutModal(false)} logOutSuccess={() => logOutSuccess()} />}
      <ExchangedPoints />
    </div>
  )
}

export default User