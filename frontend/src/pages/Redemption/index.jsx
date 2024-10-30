import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import GiftContent from '~/pages/Redemption/GiftContent/GiftContent'
import Logout from '~/components/LoginModal/Logout'

function Redemption() {
  const [showLogOut, setShowLogOut] = useState(false)
  const [hasUser, setHasUser] = useState(true)
  const navigate = useNavigate()

  const openLogOutModal = () => {
    setShowLogOut(true)
  }
  const closeModal = () => {
    setShowLogOut(false)
  }

  const logOutSuccess = () => {
    setHasUser(false)
    closeModal()
    navigate('/')
  }

  return (
    <div className='container mx-auto'>
      <Header hasUser={hasUser} openLogOutModal={openLogOutModal}/>
      <GiftContent />
      <Footer />
      {showLogOut && <Logout showModal={showLogOut} handleClose={closeModal} logOutSuccess={logOutSuccess} />}
    </div>
  )
}

export default Redemption