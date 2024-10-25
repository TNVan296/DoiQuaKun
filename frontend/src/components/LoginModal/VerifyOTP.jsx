import PropTypes from 'prop-types'
import { nextInput } from '~/utils/otpInput'

function VerifyOTP({ showModal, handleClose }) {
  return (
    <div className={`login-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </span>
        <div className="modal-form text-center px-3">
          <h1 className="text-[#00AAEC] font-bold text-2xl mb-2">Nhập mật khẩu</h1>
          <p className='text-[#6c757d] font-medium text-xl mb-4'>Mật khẩu đã gửi cho bạn từ lần đăng nhập trước qua tổng đài DoiQuaKun</p>
          <div className="form flex justify-center gap-4 p-0">
            <input id="otp-1" type="tel" maxLength={1} onInput={nextInput} className="otp-input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
            <input id="otp-2" type="tel" maxLength={1} onInput={nextInput} className="otp-input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
            <input id="otp-3" type="tel" maxLength={1} onInput={nextInput} className="otp-input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
            <input id="otp-4" type="tel" maxLength={1} onInput={nextInput} className="otp-input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
            <input id="otp-5" type="tel" maxLength={1} onInput={nextInput} className="otp-input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
            <input id="otp-6" type="tel" maxLength={1} onInput={nextInput} className="otp-input focus:outline-none focus:border-[#00AAEC] focus:border-[3px]" />
          </div>
          <button type="submit" className="onboarding_button_2 text-white bg-[#00AAEC] w-[150px] mx-auto mt-0">Xác nhận</button>
        </div>
      </div>
    </div>
  )
}

VerifyOTP.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func
}

export default VerifyOTP