import PropTypes from 'prop-types'

function Logout({ showModal, handleClose, logOutSuccess }) {
  const logOutUser = () => {
    logOutSuccess()
  }
  return (
    <div className={`show-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content logout">
        <span className="close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </span>
        <div className="modal-form text-center px-3 mt-4">
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-2">Bạn muốn đăng xuất ?</h1>
          <div className="form flex gap-4 p-0 justify-between mt-5 mb-0">
            <button onClick={logOutUser} type="submit" className="onboarding_button_2 text-white bg-[#dc3545] w-[150px] mx-auto mt-0">Xác nhận</button>
            <button onClick={handleClose} type="submit" className="onboarding_button_2 text-black bg-[#fff] w-[150px] mx-auto mt-0">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  )
}

Logout.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  logOutSuccess: PropTypes.func
}

export default Logout