
function Header() {
  return (
    <div className='navbar flex justify-between items-center px-0'>
      <div className='logo cursor-pointer'>
        <img src='../src/assets/logo.png' alt='Logo' />
      </div>
      <div className='items'>
        <ul className='flex mx-auto'>
          <li className='li-item text-lg font-medium hover:font-bold'><a href="">Chương trình chuyển đổi</a></li>
          <li className='li-item text-lg font-medium hover:font-bold'><a href="">Quà siêu Kun</a></li>
          <li className='li-item text-lg font-medium hover:font-bold'><a href="">Liên hệ</a></li>
        </ul>
      </div>
      <div className='user-items'>
        <ul className='flex mx-auto'>
          <li className="li-item text-lg font-medium">
            <a href="">
              <i className='far fa-user'></i>
            </a>
          </li>
          <li className="li-item text-lg font-medium">
            <a href="">
              <i className='fas fa-shopping-bag'></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header