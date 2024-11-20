import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function Account() {
  const [userProfile, setUserProfile] = useState({})
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = fetchWithAuthToken('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userProfile)
      })
      const data = response.then(res => setUserProfile(res.data))
      setUserProfile({
        ...data
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = fetchWithAuthToken('http://localhost:3000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = response.then(res => setUserProfile(res.data))
        setUserProfile({
          ...data
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserProfile()
  }, [])

  return (
    <>
      <div className="info_col w-3/5 flex flex-col pl-8">
        <button className='back_button' onClick={() => navigate('/profile/account')}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="info_content">
          <div className="info_title">
            <h1 className='text-black font_iCiel_Crocante'>Tài khoản của tôi</h1>
            <p className='font_Quicksand'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <form className='info_form' onSubmit={handleSubmit}>
            <div className="form_group">
              <label htmlFor="name" className='w-1/5 p-2'>Tên</label>
              <input type="text" value={userProfile.name} onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })} id="name" className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]' />
            </div>
            <div className="form_group">
              <label htmlFor="email" className='w-1/5 p-2'>Email</label>
              <input type="text" value={userProfile.email} id="email" disabled className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]' />
            </div>
            <div className="form_group">
              <label htmlFor="phone" className='w-1/5 p-2'>Số điện thoại</label>
              <input type="tel" value={userProfile.phoneNumber} onChange={(e) => setUserProfile({ ...userProfile, phoneNumber: e.target.value })} id="phone" className='w-4/5 form_control' />
            </div>
            <div className="form_group">
              <label htmlFor="gender" className='w-1/5 p-2'>Giới tính</label>
              <div className="w-4/5 form_control_radio">
                <div className="form_check">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value={userProfile.gender === true}
                    checked={userProfile.gender === true}
                    onChange={(e) => setUserProfile({ ...userProfile, gender: true })}
                  />
                  <label htmlFor="male" className="pl-2">
                    Nam
                  </label>
                </div>
                <div className="form_check">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value={userProfile.gender === false}
                    checked={userProfile.gender === false}
                    onChange={(e) => setUserProfile({ ...userProfile, gender: false })}
                  />
                  <label htmlFor="female" className="pl-2">
                    Nữ
                  </label>
                </div>
                <div className="form_check">
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value={userProfile.gender === null}
                    checked={userProfile.gender === null}
                    onChange={(e) => setUserProfile({ ...userProfile, gender: null })}
                  />
                  <label htmlFor="other" className="pl-2">
                    Khác
                  </label>
                </div>
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="address" className='w-1/5 p-2'>Địa chỉ</label>
              <input type="text" value={userProfile.detailAddress} onChange={(e) => setUserProfile({ ...userProfile, detailAddress: e.target.value })} id="address" className='w-4/5 form_control' />
            </div>
            <div className="form_group">
              <label htmlFor="city" className='w-1/5 p-2'>Tỉnh/Thành phố</label>
              <select id="city" onChange={(e) => setUserProfile({ ...userProfile, cityId: e.target.value })} value={userProfile.cityId} className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'>
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
              <select id="district" onChange={(e) => setUserProfile({ ...userProfile, districtId: e.target.value })} value={userProfile.districtId} className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'>
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
              <select id="ward" onChange={(e) => setUserProfile({ ...userProfile, wardId: e.target.value })} value={userProfile.wardId} className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'>
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
    </>
  )
}

export default Account