import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Account() {
  const [userProfile, setUserProfile] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await response.json()
        setUserProfile(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserProfile()
  }, [])

  return (
    <>
      <div className='content pt-[80px] pb-[200px] mx-[150px]'>
        <div className="header_title pt-[80px]">
          <h1>thông tin tài khoản</h1>
        </div>
        <div className="solid"></div>
        <div className='profile_row flex gap-4'>
          <div className="navigation_col w-2/5 flex flex-col gap-2 px-5">
            <div className='profile_info items-center'>
              <div className='w-1/2'>
                <img className="profile_img" src="../src/assets/personal_picture.jpg" />
              </div>
              <div className="w-1/2">
                <p className='profile_name font_iCiel_Crocante'>{userProfile.name}</p>
              </div>
            </div>
            <div className='navigation_menu pt-8'>
              <ul className="navigation_list">
                <li className='mb-4'>
                  <a href="" onClick={() => {navigate('/profile/account')}} className="navigation_item active">
                    <p>
                      <i className="pr-5 far fa-user"></i>
                      Tài khoản của tôi
                    </p>
                  </a>
                </li>
                <li className='mb-4'>
                  <a href="" onClick={() => {navigate('/profile/coupons')}} className="navigation_item">
                    <p>
                      <i className='pr-5 fas fa-barcode'></i>
                      Mã tích lũy
                    </p>
                  </a>
                </li>
                <li className='mb-4'>
                  <a href="" onClick={() => {navigate('/profile/history')}} className="navigation_item">
                    <p>
                      <i className='pr-5 fas fa-history'></i>
                      Lịch sử đổi quà
                    </p>
                  </a>
                </li>
                <li className='mb-4'>
                  <a href="" className="navigation_item">
                    <p>
                      <i className='pr-5 far fa-bell'></i>
                      Thông báo
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="info_col w-3/5 flex flex-col pl-8">
            <button className='back_button' onClick={() => navigate('/profile/account')}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="info_content">
              <div className="info_title">
                <h1 className='text-black font_iCiel_Crocante'>Tài khoản của tôi</h1>
                <p className='font_Quicksand'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              </div>
              <form className='info_form'>
                <div className="form_group">
                  <label htmlFor="name" className='w-1/5 p-2'>Tên</label>
                  <input type="text" value={userProfile.name} id="name" className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]' />
                </div>
                <div className="form_group">
                  <label htmlFor="email" className='w-1/5 p-2'>Email</label>
                  <input type="text" value={userProfile.email} id="email" className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]' />
                </div>
                <div className="form_group">
                  <label htmlFor="phone" className='w-1/5 p-2'>Số điện thoại</label>
                  <input type="tel" value={userProfile.phoneNumber} id="phone" disabled className='w-4/5 form_control' />
                </div>
                <div className="form_group">
                  <label htmlFor="gender" className='w-1/5 p-2'>Giới tính</label>
                  <div className="w-4/5 form_control_radio">
                    <div className="form_check">
                      <input type="radio" id="male" name="gender" value={'male'} className='' />
                      <label htmlFor="male" className="pl-2">Nam</label>
                    </div>
                    <div className="form_check">
                      <input type="radio" id="female" name="gender" value={'female'} className='' />
                      <label htmlFor="female" className="pl-2">Nữ</label>
                    </div>
                    <div className="form_check">
                      <input type="radio" id="other" name="gender" value={'other'} className='' />
                      <label htmlFor="other" className="pl-2">Khác</label>
                    </div>
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="address" className='w-1/5 p-2'>Địa chỉ</label>
                  <input type="text" value={userProfile.detailAddress} id="address" className='w-4/5 form_control' />
                </div>
                <div className="form_group">
                  <label htmlFor="city" className='w-1/5 p-2'>Tỉnh/Thành phố</label>
                  <select id="city" value={userProfile.city} className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'>
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    <option value="gia_lai">Tỉnh Gia Lai</option>
                    <option value="cao_bang">Tỉnh Cao Bằng</option>
                    <option value="thai_binh">Tỉnh Thái Bình</option>
                    <option value="tp_can_tho">Thành phố Cần Thơ</option>
                    <option value="tp_hcm">Thành phố Hồ Chí Minh</option>
                    <option value="tp_hanoi">Thành phố Hà Nội</option>
                  </select>
                </div>
                <div className="form_group">
                  <label htmlFor="district" className='w-1/5 p-2'>Quận/Huyện</label>
                  <select id="district" value={userProfile.district} className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'>
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="pleiku">Thành phố Pleiku</option>
                    <option value="chu_pah">Huyện Chư Păh</option>
                    <option value="chu_puh">Huyện Chư Pưh</option>
                    <option value="chu_prong">Huyện Chư Prông</option>
                    <option value="ia_grai">Huyện Ia Grai</option>
                  </select>
                </div>
                <div className="form_group">
                  <label htmlFor="ward" className='w-1/5 p-2'>Xã/Phường</label>
                  <select id="ward" value={userProfile.ward} className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'>
                    <option value="">Chọn Xã/Phường</option>
                    <option value="dong_da">Phường Đống Đa</option>
                    <option value="yen_the">Phường Yên Thế</option>
                    <option value="bien_ho">Xã Biển Hồ</option>
                    <option value="hoa_lu">Phường Hoa Lư</option>
                    <option value="chi_lang">Phường Chi Lăng</option>
                  </select>
                </div>
                <button type="submit" className="form_button font_Quicksand text-white bg-[#00AAEC] w-[200px] mx-auto my-10">Lưu Thông Tin</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account