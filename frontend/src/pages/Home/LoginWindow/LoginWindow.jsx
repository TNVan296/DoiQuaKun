import PropTypes from 'prop-types'

const LoginWindow = ({ showModal, handleClose }) => {
  return (
    <div className={`login-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </span>
        <div className='modal-form text-center px-3 pt-5 pb-4'>
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-4">Nhập số điện thoại</h1>
          <div className="form">
            <input id="phone-number" type="tel" placeholder="Số điện thoại" className="onboarding_input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
          </div>
        </div>
        <button type="submit" className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto">Xác nhận</button>
      </div>
    </div>
  )
}

LoginWindow.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func
}

export default LoginWindow