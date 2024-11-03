import { useEffect, useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import Logout from '~/components/LoginModal/Logout'
import Account from '~/pages/Profile/Account/Account'
import Coupons from '~/pages/Profile/Coupons/Coupons'

function User() {
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)
  const navigate = useNavigate()

  const openLogOutModal = () => {
    setShowLogOutModal(true)
  }

  const logOutSuccess = () => {
    setHasUser(false)
    localStorage.removeItem('hasUser')
    setShowLogOutModal(false)
  }

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('hasUser')
    setHasUser(
      isUserLoggedIn === 'true' ? true : false
    )
    if (!isUserLoggedIn) {
      navigate('/')
    }
    return () => {
      setHasUser(false)
    }
  }, [navigate])

  return (
    <div className='container mx-auto'>
      <Header hasUser={hasUser} openLogOutModal={openLogOutModal}/>
      <div className='content pt-[80px] pb-[200px] mx-[150px]'>
        <Routes>
          <Route path='/account' element={<Account />} />
          <Route path='/coupons' element={<Coupons />} />
        </Routes>
      </div>
      <Footer />
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={() => setShowLogOutModal(false)} logOutSuccess={() => logOutSuccess()} />}
    </div>
  )
}

export default User