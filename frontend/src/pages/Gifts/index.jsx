import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import GetOTP from '~/components/LoginModal/GetOTP'
import VerifyOTP from '~/components/LoginModal/VerifyOTP'
import Logout from '~/components/LoginModal/Logout'
import GiftContent from '~/pages/Gifts/GiftContent/GiftContent'
import GiftDetail from '~/pages/Gifts/GiftDetail/GiftDetail'

function Gifts() {
  const [showGetOtpModal, setShowGetOtpModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)
  const navigate = useNavigate()

  const showVerifyOtpModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(true)
  }

  const closeModal = () => {
    setShowGetOtpModal(false)
    setShowVerifyModal(false)
    setShowLogOutModal(false)
  }

  const logInSuccess = () => {
    setHasUser(true)
    localStorage.setItem('hasUser', 'true')
    closeModal()
    navigate('/profile/account')
  }

  const logOutSuccess = () => {
    setHasUser(false)
    localStorage.setItem('hasUser', 'false')
    setShowLogOutModal(false)
    navigate('/home')
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
      <div className='content pt-[80px]'>
        <Routes>
          <Route path='/' element=
            {
              hasUser ? <GiftContent /> :
                <>
                  <div className='onboarding_3 py-[80px]'>
                    <div className='title-wrapper text-center'>
                      <p className='shadow-text'>quà siêu kun</p>
                    </div>
                  </div>
                  <div id='item-list' className='flex mx-[100px] mb-[115px]'></div>
                  <div className='text-center div-not-login px-[15px] mb-[100px]'>
                    <h4 className='text-2xl font-medium mb-2]'>Bạn chưa đăng nhập, hãy đăng nhập ngay để xem các phần quà nhé !</h4>
                    <button className='onboarding_button_2 text-white bg-[#00AAEC] p-[10px_50px]'>Đăng nhập</button>
                  </div>
                </>
            }
          />
          <Route path='/:giftId' element={<GiftDetail />} />
        </Routes>
      </div>
      <Footer />
      {showGetOtpModal && <GetOTP showModal={showGetOtpModal} handleClose={closeModal} showVerifyOtpModal={showVerifyOtpModal} />}
      {showVerifyModal && <VerifyOTP showModal={showVerifyOtpModal} handleClose={closeModal} logInSuccess={logInSuccess} />}
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={closeModal} logOutSuccess={logOutSuccess} />}
    </div>
  )
}

export default Gifts