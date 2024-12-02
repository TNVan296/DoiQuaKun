import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import GetOTP from '~/components/ShowModal/GetOTP'
import VerifyOTP from '~/components/ShowModal/VerifyOTP'
import SuccessLoginModal from '~/components/NotificationModal/SuccessLoginModal'
import Logout from '~/components/ShowModal/Logout'
import GiftContent from '~/pages/Gifts/GiftContent/GiftContent'
import GiftDetail from '~/pages/Gifts/GiftDetail/GiftDetail'

function Gifts() {
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
      <div className='content pt-[80px]'>
        <Routes>
          <Route path='/' element=
            {hasUser ?
              <GiftContent />
              :
              <>
                <div className='onboarding_3 py-[80px]'>
                  <div className='title-wrapper text-center'>
                    <p className='shadow-text font_iCiel_Crocante'>quà siêu kun</p>
                  </div>
                </div>
                <div id='item-list' className='flex mx-[100px] mb-[115px]'></div>
                <div className='text-center div-not-login px-[15px] mb-[100px]'>
                  <h4 className='text-2xl font-medium mb-2]'>Bạn chưa đăng nhập, hãy đăng nhập ngay để xem các phần quà nhé !</h4>
                  <button onClick={() => setShowGetOtpModal(true)} className='onboarding_button_2 text-white bg-[#00AAEC] p-[10px_50px]'>Đăng nhập</button>
                </div>
              </>
            }
          />
          <Route path='/:giftId' element={<GiftDetail />} />
        </Routes>
      </div>
      <Footer />
      {showGetOtpModal && <GetOTP showModal={showGetOtpModal} handleClose={() => setShowGetOtpModal(false)} showVerifyOtpModal={showVerifyOtpModal} />}
      {showVerifyModal && <VerifyOTP showModal={showVerifyModal} handleClose={() => setShowVerifyModal(false)} verifySuccess={verifySuccess} showSuccessLoginModal={showSuccessLoginModal} />}
      {showSuccessModal && <SuccessLoginModal showModal={showSuccessModal} handleClose={() => setShowSuccessModal(false)} />}
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={() => setShowLogOutModal(false)} logOutSuccess={logOutSuccess} />}
    </div>
  )
}

export default Gifts