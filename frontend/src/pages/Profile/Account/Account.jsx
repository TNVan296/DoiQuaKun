import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UpdateProfileModal from '~/components/NotificationModal/UpdateProfileModal'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function Account() {
  const [userProfile, setUserProfile] = useState({})
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [showSuccessUpdateModal, setShowSuccessUpdateModal] = useState(false)
  const navigate = useNavigate()

  const getCities = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/address/cities', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setCities(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getDistricts = async (cityId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/address/districts/${cityId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setDistricts(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getWards = async (districtId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/address/wards/${districtId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setWards(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetchWithAuthToken('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userProfile)
      })
      setUserProfile(response.data)
      setShowSuccessUpdateModal(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchWithAuthToken('http://localhost:3000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setUserProfile(response.data)
        await getCities()
        if (response.data.cityId) await getDistricts(response.data.cityId)
        if (response.data.districtId) await getWards(response.data.districtId)
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
              <select
                id="city"
                name="city"
                onFocus={getCities}
                onChange={(e) => {
                  setUserProfile({ ...userProfile, cityId: e.target.value })
                  getDistricts(e.target.value)
                }}
                value={userProfile.cityId}
                className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'
              >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {cities.map((city) => (
                  <option
                    key={city.id}
                    value={city.id}
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_group">
              <label htmlFor="district" className='w-1/5 p-2'>Quận/Huyện</label>
              <select
                id="district"
                name="district"
                onChange={(e) => {
                  setUserProfile({ ...userProfile, districtId: e.target.value })
                  getWards(e.target.value)
                }}
                value={userProfile.districtId}
                className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option
                    key={district.id}
                    value={district.id}
                  >
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_group">
              <label htmlFor="ward" className='w-1/5 p-2'>Xã/Phường</label>
              <select
                id="ward"
                name="ward"
                onChange={(e) => setUserProfile({ ...userProfile, wardId: e.target.value })}
                value={userProfile.wardId}
                className='w-4/5 form_control focus:outline-none focus:border-[#00AAEC] focus:border-[3px]'
              >
                <option value="">Chọn Xã/Phường</option>
                {wards &&
                  wards.map((ward) => (
                    <option
                      key={ward.id}
                      value={ward.id}
                    >
                      {ward.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <button type="submit" className="form_button font_Quicksand text-white bg-[#00AAEC] w-[200px] mx-auto my-10">Lưu Thông Tin</button>
          </form>
        </div>
      </div>
      {showSuccessUpdateModal && <UpdateProfileModal showModal={showSuccessUpdateModal} handleClose={() => setShowSuccessUpdateModal(false)} />}
    </>
  )
}

export default Account