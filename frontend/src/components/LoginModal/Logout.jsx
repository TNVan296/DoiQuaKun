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
        <div className="modal-form text-center px-3">
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-2">Bạn muốn đăng xuất ?</h1>
          <div className="form flex gap-4 p-0 justify-between my-5">
            <button onClick={logOutUser} type="submit" className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0">Xác nhận</button>
            <button onClick={handleClose} type="submit" className="onboarding_button_2 text-[#00AAEC] bg-[#fff] w-[150px] mx-auto mt-0">Không</button>
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