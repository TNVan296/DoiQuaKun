import { useState } from 'react'
import PropTypes from 'prop-types'
import { nextInput } from '~/utils/otpInput.js'

function VerifyOTP({ showModal, handleClose, verifySuccess, showSuccessLoginModal }) {
  const apiURL = import.meta.env.VITE_API_URL
  const [otpInputValues, setOtpInputValues] = useState(Array(6).fill(''))
  const [wrongOtp, setWrongOtp] = useState(false)
  const [getNewOTP, setGetNewOTP] = useState(false)

  const handleButtonClick = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail')
      const otp = parseInt(otpInputValues.join(''), 10)
      const response = await fetch(`${apiURL}/users/verifyOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail, otp: otp })
      })
      if (response.ok) {
        const data = await response.json()
        verifySuccess(data)
        showSuccessLoginModal()
      } else {
        setWrongOtp(true)
      }
    } catch (error) {
      console.error('Error logging in:', error)
      alert('An error occurred. Please try again later !')
    }
  }

  const handleGetNewOTP = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail')
      const response = await fetch('http://localhost:3000/api/users/getNewOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      })
      if (response.oke) {
        setGetNewOTP(true)
      } else {
        setGetNewOTP(false)
      }
    } catch (error) {
      console.error('Error logging in:', error)
      alert('An error occurred. Please try again later !')
    }
  }

  return (
    <div className={`show-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content h-[330px]">
        <span className="close transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </span>
        <div className="modal-form text-center px-3">
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-1">Nhập mật khẩu</h1>
          {getNewOTP ?
            <p className='text-[#6c757d] font-medium text-lg mb-3'>Nhập mật khẩu mới đã được gửi vào Email của bạn</p>
            :
            <p className='text-[#6c757d] font-medium text-lg mb-3'>Mật khẩu đã gửi cho bạn từ lần đăng nhập trước qua tổng đài DoiQuaKun</p>
          }
          <div className="form flex justify-center gap-4 p-0 mb-3">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="tel"
                maxLength={1}
                onInput={(e) => nextInput(e, i, setOtpInputValues)}
                className="otp-input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]"
              />
            ))}
          </div>
          <h4 className='text-base font-medium my-2'>
            {wrongOtp && <span className='text-[#dc3545] mr-4'>Mật khẩu không chính xác</span>}
            <a className='text-[#007bff] hover:underline cursor-pointer' onClick={handleGetNewOTP}>Lấy lại mật khẩu</a>
          </h4>
          <button
            type="submit"
            onClick={handleButtonClick}
            className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}

VerifyOTP.propTypes = {
  showModal: PropTypes.func,
  handleClose: PropTypes.func,
  verifySuccess: PropTypes.func,
  showSuccessLoginModal: PropTypes.func
}

export default VerifyOTP