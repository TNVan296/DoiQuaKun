import { useState } from 'react'
import Header from '~/components/Header/Header'
import HomeContent from '~/pages/Home/HomeContent/HomeContent'
import Footer from '~/components/Footer/Footer'
import GetOTP from '~/components/LoginModal/GetOTP'
import VerifyOTP from '~/components/LoginModal/VerifyOTP'
// import Logout from '~/components/LoginModal/Logout'

function Home() {
  const [showGetOtpModal, setShowGetOtpModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
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

  return (
    <div className='container mx-auto'>
      <Header openModal={openModal}/>
      <HomeContent />
      <Footer />
      {showGetOtpModal && <GetOTP showModal={showGetOtpModal} handleClose={closeModal} showVerifyOtpModal={showVerifyOtpModal} />}
      {showVerifyModal && <VerifyOTP showModal={showVerifyOtpModal} handleClose={closeModal} />}
      {/* {showLoginModal && <Logout showModal={showLoginModal} handleClose={closeModal} />} */}
    </div>
  )
}

export default Home