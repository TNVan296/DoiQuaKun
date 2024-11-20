import { useState } from 'react'
import PropTypes from 'prop-types'
import { nextInput } from '~/utils/otpInput.js'

function VerifyOTP({ showModal, handleClose, logInSuccess }) {
  const [otpInputValues, setOtpInputValues] = useState(Array(6).fill(''))

  const handleButtonClick = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail')
      const otp = parseInt(otpInputValues.join(''), 10)
      const response = await fetch ('http://localhost:3000/api/users/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail, otp: otp })
      })
      if (response.ok) {
        const data = await response.json()
        logInSuccess(data)
      } else {
        alert('Mã OTP đã sai, vui lòng nhập sai !')
      }
    } catch (error) {
      console.error('Error logging in:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <div className={`login-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </span>
        <div className="modal-form text-center px-3">
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-2">Nhập mật khẩu</h1>
          <p className='text-[#6c757d] font-medium text-lg mb-3'>Mật khẩu đã gửi cho bạn từ lần đăng nhập trước qua tổng đài DoiQuaKun</p>
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
          <button onClick={handleButtonClick} type="submit" className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0">Xác nhận</button>
        </div>
      </div>
    </div>
  )
}

VerifyOTP.propTypes = {
  showModal: PropTypes.func,
  handleClose: PropTypes.func,
  logInSuccess: PropTypes.func
}

export default VerifyOTP