import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function SuccessCheckoutModal({ showModal, handleClose }) {
  const navigate = useNavigate()

  const successCheckout = () => {
    handleClose()
    navigate('/profile/history')
  }

  return (
    <div className={`show-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content logout">
        <div className="modal-form text-center px-3">
          <i className='far fa-check-circle fa-4x text-[#7AEF78] mb-2'></i>
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-4">Bạn đã thanh toán thành công !</h1>
          <div className="form flex gap-4 p-0 justify-between mt-5 mb-0">
            <button onClick={successCheckout} type="submit" className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  )
}

SuccessCheckoutModal.propTypes = {
  showModal: PropTypes.func,
  handleClose: PropTypes.func
}

export default SuccessCheckoutModal