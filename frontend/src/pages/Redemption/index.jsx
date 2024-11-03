import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import HomeContent from '../Home/HomeContent/HomeContent'
import GetOTP from '~/components/LoginModal/GetOTP'
import VerifyOTP from '~/components/LoginModal/VerifyOTP'
import Logout from '~/components/LoginModal/Logout'

function Redemption() {
  const [showGetOtpModal, setShowGetOtpModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showLogOut, setShowLogOut] = useState(false)
  const [hasUser, setHasUser] = useState(false)
  const navigate = useNavigate()

  const openModal = () => {
    setShowGetOtpModal(true)
  }

  const openLogOutModal = () => {
    setShowLogOut(true)
  }
  const closeModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(false)
    setShowLogOut(false)
  }

  const showVerifyOtpModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(true)
  }

  const logInSuccess = () => {
    setHasUser(true)
    localStorage.setItem('hasUser', 'true')
    closeModal()
    navigate('/profile')
  }

  const logOutSuccess = () => {
    setHasUser(false)
    localStorage.removeItem('hasUser')
    closeModal()
    navigate('/')
  }

  const moveToContact = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
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
      <Header moveToContact={moveToContact} hasUser={hasUser} openModal={openModal} openLogOutModal={openLogOutModal}/>
      <HomeContent hasUser={hasUser} />
      <Footer />
      {showGetOtpModal && <GetOTP showModal={showGetOtpModal} handleClose={closeModal} showVerifyOtpModal={showVerifyOtpModal} />}
      {showVerifyModal && <VerifyOTP showModal={showVerifyOtpModal} handleClose={closeModal} logInSuccess={logInSuccess} />}
      {showLogOut && <Logout showModal={showLogOut} handleClose={closeModal} logOutSuccess={logOutSuccess} />}
    </div>
  )
}

export default Redemption