import { useState } from 'react'
import PropTypes from 'prop-types'

const GetOTP = ({ showModal, handleClose, showVerifyOtpModal }) => {
  const [email, setEmail] = useState('')
  const handleInputValue = (e) => {
    setEmail(e.target.value)
  }
  const handleButtonClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(email)) {
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        })

        if (response.ok) {
          const data = await response.json()
          localStorage.setItem('userEmail', email)
          showVerifyOtpModal()
        } else {
          alert('Login failed. Please check your email and try again.')
        }
      } catch (error) {
        console.error('Error logging in:', error)
        alert('An error occurred. Please try again later.')
      }
    } else {
      alert('Please enter a valid email address.')
    }
  }

  return (
    <div className={`show-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </span>
        <div className='modal-form text-center px-3 pt-5 pb-4 mb-2'>
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-5">Nhập email của bạn</h1>
          <div className="form">
            <input value={email} onChange={handleInputValue} type="email" placeholder="Email của bạn" className="onboarding_input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
          </div>
        </div>
        <button onClick={handleButtonClick} type="submit" className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0">Xác nhận</button>
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