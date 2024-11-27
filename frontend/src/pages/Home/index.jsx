import { useState, useEffect } from 'react'
import Header from '~/components/Header/Header'
import HomeContent from '~/pages/Home/HomeContent/HomeContent'
import Footer from '~/components/Footer/Footer'
import GetOTP from '~/components/LoginModal/GetOTP'
import VerifyOTP from '~/components/LoginModal/VerifyOTP'
import SuccessLoginModal from '~/components/NotificationModal/SuccessLoginModal'
import Logout from '~/components/LoginModal/Logout'
import ExchangedPoints from '~/components/BottomNav/ExchangedPoints'

function Home() {
  const [showGetOtpModal, setShowGetOtpModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)

  const showVerifyOtpModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(true)
  }

  const showSuccessLoginModal = () => {
    setShowVerifyModal(false)
    setShowSuccessModal(true)
  }

  const verifySuccess = (data) => {
    setHasUser(true)
    localStorage.setItem('hasUser', 'true')
    localStorage.setItem('accessToken', data.token.accessToken)
    localStorage.setItem('refreshToken', data.token.refreshToken)
  }

  const logOutSuccess = () => {
    setHasUser(false)
    localStorage.setItem('hasUser', 'false')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userId')
    setShowLogOutModal(false)
    window.location.reload()
  }

  useEffect(() => {
    const isAccessToken = localStorage.getItem('accessToken')
    if (isAccessToken) {
      setHasUser(true)
    } else {
      setHasUser(false)
    }
  }, [hasUser])

  return (
    <div className='container mx-auto'>
      <Header hasUser={hasUser} openModal={() => setShowGetOtpModal(true)} openLogOutModal={() => setShowLogOutModal(true)}/>
      <HomeContent hasUser={hasUser} openModal={() => setShowGetOtpModal(true)} />
      <Footer />
      {showGetOtpModal && <GetOTP showModal={showGetOtpModal} handleClose={() => setShowGetOtpModal(false)} showVerifyOtpModal={showVerifyOtpModal} />}
      {showVerifyModal && <VerifyOTP showModal={showVerifyModal} handleClose={() => setShowVerifyModal(false)} verifySuccess={verifySuccess} showSuccessLoginModal={showSuccessLoginModal} />}
      {showSuccessModal && <SuccessLoginModal showModal={showSuccessModal} handleClose={() => setShowSuccessModal(false)} />}
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={() => setShowLogOutModal(false)} logOutSuccess={logOutSuccess} />}
      {hasUser && <ExchangedPoints />}
    </div>
  )
}

export default Home