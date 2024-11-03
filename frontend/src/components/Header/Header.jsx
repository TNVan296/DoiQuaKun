import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function Header({ openModal, hasUser, openLogOutModal, moveToContact }) {
  const navigate = useNavigate()

  const openProfile = () => {
    navigate('/profile')
  }

  const moveToHome = () => {
    navigate('/')
  }

  const moveToRedemption = () => {
    navigate('/redemption')
  }

  const moveToGifts = () => {
    navigate('/gifts')
  }

  return (
    <div className='navbar flex justify-between items-center px-0'>
      <div className='logo cursor-pointer'>
        <img src='../src/assets/logo.png' alt='Logo' onClick={ moveToHome } />
      </div>
      <div className='items'>
        <ul className='flex mx-auto'>
          <li className='li-item text-lg font-[Quicksand] font-medium hover:font-bold'><a href="" onClick={moveToRedemption}>Chương trình chuyển đổi</a></li>
          <li className='li-item text-lg font-[Quicksand] font-medium hover:font-bold'><a href="" onClick={moveToGifts}>Quà siêu Kun</a></li>
          <li className='li-item text-lg font-[Quicksand] font-medium hover:font-bold'><a href="" onClick={moveToContact}>Liên hệ</a></li>
        </ul>
      </div>
      <div className='user-items'>
        <ul className='flex mx-auto'>
          <li className="li-item text-lg font-medium">
            <button onClick={hasUser ? openProfile : openModal }>
              <i className='far fa-user'></i>
            </button>
          </li>
          <li className="li-item text-lg font-medium">
            <button id="cart">
              <i className='fas fa-shopping-bag'></i>
            </button>
          </li>
          {hasUser &&
            <li className="li-item text-lg font-medium">
              <button onClick={ openLogOutModal }>
                <i className='fas fa-sign-out-alt'></i>
              </button>
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

Header.propTypes = {
  openModal: PropTypes.func,
  hasUser: PropTypes.bool,
  openLogOutModal: PropTypes.func,
  move: PropTypes.func,
  moveToContact: PropTypes.func
}

export default Header