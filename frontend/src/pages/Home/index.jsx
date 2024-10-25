import { useState } from 'react'
import Header from '~/components/Header/Header'
import HomeContent from '~/pages/Home/HomeContent/HomeContent'
import Footer from '~/components/Footer/Footer'
import LoginWindow from '~/pages/Home/LoginWindow/LoginWindow'

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
      {showLoginModal && <LoginWindow showModal={showLoginModal} handleClose={closeLoginModal} />}
    </div>
  )
}

export default Home