
function Footer() {
  const apiURL = import.meta.env.VITE_API_URL
  return (
    <div className='footer'>
      <div className='wrapper'>
        <img src={`${apiURL}/idp_logo.png`} alt='IDP Logo' />
        <div className='wrapper-info grid grid-cols-6 gap-8'>
          <div className='info text-[20px] leading-6 col-span-2'>
            <p>CÔNG TY CỔ PHẦN SỮA QUỐC TẾ (IDP)</p>
            <p>Giấy CN ĐKDN số: 0500463609</p>
            <p>Cấp lần đầu ngày: 24/11/2014</p>
            <p>Nơi cấp: Sở KH và ĐT Thành phố Hà Nội</p>
          </div>
          <div className='info text-[20px] leading-6 col-span-2'>
            <p>Chương trình đổi thưởng</p>
          </div>
          <div className='info text-[20px] leading-6'>
            <p>Chính sách</p>
            <p>
              <a href="" className="hover:font-bold">
                Cách đổi quà
              </a>
            </p>
            <p>
              <a href="" className="hover:font-bold">
                Chính sách bảo mật
              </a>
            </p>
          </div>
          <div className='info text-[20px] leading-6'>
            <p>Liên hệ</p>
            <p>
              <a href="" className="hover:font-bold">
                Hotline: 1900 633 571
              </a>
            </p>
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22.5" cy="22.5" r="22" stroke="white"></circle>
              <g clipPath="url(#clip0)">
                <path d="M19.9822 35V23.7385H17.0045V19.6838H19.9822V16.2206C19.9822 13.4992 21.7412 11 25.7943 11C27.4353 11 28.6488 11.1573 28.6488 11.1573L28.5532 14.9437C28.5532 14.9437 27.3156 14.9317 25.9652 14.9317C24.5036 14.9317 24.2694 15.6052 24.2694 16.7232V19.6838H28.6693L28.4779 23.7385H24.2694V35H19.9822Z" fill="#E5E5E5"></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="11.672" height="24" fill="white" transform="translate(17 11)"></rect>
                </clipPath>
              </defs>
            </svg>
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22.5" cy="22.5" r="22" stroke="white"></circle>
              <path d="M34.9912 17.0038C34.8489 16.4755 34.5706 15.9938 34.1842 15.6065C33.7978 15.2192 33.3167 14.9398 32.7887 14.7963C30.8312 14.2588 23 14.25 23 14.25C23 14.25 15.17 14.2413 13.2112 14.755C12.6836 14.9052 12.2035 15.1885 11.8169 15.5777C11.4304 15.9669 11.1503 16.4489 11.0037 16.9775C10.4875 18.935 10.4825 22.995 10.4825 22.995C10.4825 22.995 10.4775 27.075 10.99 29.0125C11.2775 30.0838 12.1212 30.93 13.1937 31.2188C15.1712 31.7563 22.9812 31.765 22.9812 31.765C22.9812 31.765 30.8125 31.7738 32.77 31.2613C33.2981 31.1179 33.7797 30.8392 34.167 30.4527C34.5544 30.0662 34.8342 29.5853 34.9787 29.0575C35.4962 27.1013 35.5 23.0425 35.5 23.0425C35.5 23.0425 35.525 18.9613 34.9912 17.0038ZM20.495 26.7563L20.5012 19.2563L27.01 23.0125L20.495 26.7563Z" fill="#E5E5E5"></path>
            </svg>
          </div>
          <div className='info text-[20px] leading-6 col-span-4'>
            <p>Địa chỉ</p>
            <p>HCM: 217 Nguyễn Văn Thủ, Phường ĐaKao, Quận 1, Hồ Chí Minh</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer