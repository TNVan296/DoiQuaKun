import { useState } from 'react'
import PropTypes from 'prop-types'

const GetOTP = ({ showModal, handleClose, showVerifyOtpModal }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const handleInputValue = (e) => {
    setPhoneNumber(e.target.value)
  }
  const handleButtonClick = () => {
    const phoneRegex = /^[0-9]{10}$/
    if (phoneRegex.test(phoneNumber)) {
      showVerifyOtpModal()
    }
    else {
      alert('Vui lòng nhập số điện thoại của bạn vào !')
    }
  }
  return (
    <div className={`login-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </span>
        <div className='modal-form text-center px-3 pt-5 pb-4'>
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-3">Nhập số điện thoại</h1>
          <div className="form">
            <input value={phoneNumber} onChange={handleInputValue} type="tel" placeholder="Số điện thoại" className="onboarding_input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
          </div>
        </div>
        <button onClick={handleButtonClick} type="submit" className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0">Xác nhận</button>
      </div>
    </div>
  )
}

GetOTP.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  showVerifyOtpModal: PropTypes.func
}

export default GetOTP