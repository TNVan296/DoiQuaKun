import { useState } from 'react'
import PropTypes from 'prop-types'

const GetOTP = ({ showModal, handleClose, showVerifyOtpModal }) => {
  const apiURL = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState('')
  const [wrongEmail, setWrongEmail] = useState(false)

  const handleInputValue = (e) => {
    setEmail(e.target.value)
  }
  const handleButtonClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(email)) {
      try {
        const response = await fetch(`${apiURL}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        })

        if (response.ok) {
          localStorage.setItem('userEmail', email)
          showVerifyOtpModal()
        } else {
          setWrongEmail(true)
        }
      } catch (error) {
        console.error('Error logging in:', error)
        alert('An error occurred. Please try again later !')
      }
    } else {
      setWrongEmail(true)
    }
  }

  return (
    <div className={`show-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content">
        <span className="close transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </span>
        <div className='modal-form text-center px-3 pt-3 mb-2'>
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-5">Nhập email của bạn</h1>
          <div className="form">
            <input value={email} onChange={handleInputValue} type="email" placeholder="Email của bạn" className="onboarding_input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
          </div>
          {wrongEmail && <h4 className='text-[#dc3545] text-base font-medium'>Email không hợp lệ</h4>}
        </div>
        <button
          type="submit"
          onClick={handleButtonClick}
          className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          Xác nhận
        </button>
      </div>
    </div>
  )
}

GetOTP.propTypes = {
  showModal: PropTypes.func,
  handleClose: PropTypes.func,
  showVerifyOtpModal: PropTypes.func
}

export default GetOTP