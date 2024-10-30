import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '~/components/Header/Header'
import HomeContent from '~/pages/Home/HomeContent/HomeContent'
import Footer from '~/components/Footer/Footer'
import GetOTP from '~/components/LoginModal/GetOTP'
import VerifyOTP from '~/components/LoginModal/VerifyOTP'

function Home() {
  const [showGetOtpModal, setShowGetOtpModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)
  const navigate = useNavigate()
  const openModal = () => {
    setShowGetOtpModal(true)
  }

  const showVerifyOtpModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(true)
  }

  const closeModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(false)
  }

  const loginSuccess = () => {
    setHasUser(true)
    closeModal()
    navigate('/redemption')
  }
  return (
    <div className='container mx-auto'>
      <Header openModal={openModal} hasUser={hasUser} />
      <HomeContent />
      <Footer />
      {showGetOtpModal && <GetOTP showModal={showGetOtpModal} handleClose={closeModal} showVerifyOtpModal={showVerifyOtpModal} />}
      {showVerifyModal && <VerifyOTP showModal={showVerifyOtpModal} handleClose={closeModal} loginSuccess={loginSuccess} />}
    </div>
  )
}

export default Home