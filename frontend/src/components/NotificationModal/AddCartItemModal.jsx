import PropTypes from 'prop-types'

function AddCartItemModal({ showModal, handleClose }) {
  const successAddCartItem = () => {
    handleClose()
    window.location.reload()
  }

  return (
    <div className={`show-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content logout">
        <div className="modal-form text-center px-3">
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-2">Đã thêm sản phẩm vào giỏ hàng !</h1>
          <div className="form flex gap-4 p-0 justify-between my-5">
            <button onClick={successAddCartItem} type="submit" className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  )
}

AddCartItemModal.propTypes = {
  showModal: PropTypes.func,
  handleClose: PropTypes.func
}

export default AddCartItemModal