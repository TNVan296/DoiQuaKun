import { useState } from 'react'
import Header from '~/components/Header/Header'
import HomeContent from '~/pages/Home/HomeContent/HomeContent'
import Footer from '~/components/Footer/Footer'
// import GetOTP from '~/components/LoginModal/GetOTP'
// import VerifyOTP from '~/components/LoginModal/VerifyOTP'
import Logout from '~/components/LoginModal/Logout'

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const openLoginModal = () => {
    setShowLoginModal(true)
  }

  const closeLoginModal = () => {
    setShowLoginModal(false)
  }

  return (
    <div className='container mx-auto'>
      <Header openLoginModal={openLoginModal}/>
      <HomeContent />
      <Footer />
      {/* {showLoginModal && <GetOTP showModal={showLoginModal} handleClose={closeLoginModal} />} */}
      {/* {showLoginModal && <VerifyOTP showModal={showLoginModal} handleClose={closeLoginModal} />} */}
      {showLoginModal && <Logout showModal={showLoginModal} handleClose={closeLoginModal} />}
    </div>
  )
}

export default Home