import { useState, useEffect } from 'react'
import Header from '~/components/Header/Header'
import HomeContent from '~/pages/Home/HomeContent/HomeContent'
import Footer from '~/components/Footer/Footer'
import GetOTP from '~/components/LoginModal/GetOTP'
import VerifyOTP from '~/components/LoginModal/VerifyOTP'
import Logout from '~/components/LoginModal/Logout'
import ExchangedPoints from '~/components/BottomNav/ExchangedPoints'

function Home() {
  const [showGetOtpModal, setShowGetOtpModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)

  const showVerifyOtpModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(true)
  }

  const closeModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(false)
    setShowLogOutModal(false)
  }

  const logInSuccess = (data) => {
    setHasUser(true)
    localStorage.setItem('hasUser', 'true')
    localStorage.setItem('accessToken', data.token.accessToken)
    localStorage.setItem('refreshToken', data.token.refreshToken)
    closeModal()
    window.location.href = '/profile/account'
  }

  const logOutSuccess = () => {
    setHasUser(false)
    localStorage.setItem('hasUser', 'false')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userEmail')
    setShowLogOutModal(false)
  }

  useEffect(() => {
    if (localStorage.getItem('hasUser') === 'true') {
      setHasUser(true)
    } else {
      setHasUser(false)
    }
  }, [])

  return (
    <div className='container mx-auto'>
      <Header hasUser={hasUser} openModal={() => setShowGetOtpModal(true)} openLogOutModal={() => setShowLogOutModal(true)}/>
      <HomeContent hasUser={hasUser} openModal={() => setShowGetOtpModal(true)} />
      <Footer />
      {showGetOtpModal && <GetOTP showModal={showGetOtpModal} handleClose={closeModal} showVerifyOtpModal={showVerifyOtpModal} />}
      {showVerifyModal && <VerifyOTP showModal={showVerifyOtpModal} handleClose={closeModal} logInSuccess={logInSuccess} />}
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={closeModal} logOutSuccess={logOutSuccess} />}
      {hasUser && <ExchangedPoints />}
    </div>
  )
}

export default Home