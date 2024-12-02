import { useEffect, useState } from 'react'
import { Navigate, useNavigate, Routes, Route } from 'react-router-dom'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import Account from '~/pages/Profile/Account/Account'
import Coupons from '~/pages/Profile/Coupons/Coupons'
import History from '~/pages/Profile/History/History'
import ExchangedPoints from '~/components/BottomNav/ExchangedPoints'
import Logout from '~/components/ShowModal/Logout'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function User() {
  const [showLogOutModal, setShowLogOutModal] = useState(false)
  const [hasUser, setHasUser] = useState(false)
  const [userProfile, setUserProfile] = useState({})
  const navigate = useNavigate()

  const logOutSuccess = () => {
    setHasUser(false)
    localStorage.setItem('hasUser', 'false')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userId')
    setShowLogOutModal(false)
    window.location.reload()
    navigate('/home')
  }

  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ children }) => {
    const isUserLoggedIn = localStorage.getItem('accessToken')
    if (!isUserLoggedIn) {
      alert('Vui lòng đăng nhập để truy cập nội dung này !')
      return <Navigate to='/home' />
    }
    return children
  }

  useEffect(() => {
    const isAccessToken = localStorage.getItem('accessToken')
    if (isAccessToken) {
      setHasUser(true)
    } else {
      setHasUser(false)
      return <Navigate to='/home' />
    }
    const fetchUserProfile = async () => {
      try {
        const response = await fetchWithAuthToken('http://localhost:3000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.data
        localStorage.setItem('userId', data.id)
        setUserProfile(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserProfile()
  }, [hasUser])

  return (
    <div className='container mx-auto'>
      <Header hasUser={hasUser} openLogOutModal={() => setShowLogOutModal(true)}/>
      <>
        <div className='content pt-[80px] pb-[200px] mx-[140px]'>
          <div className="header_title pt-[80px]">
            <h1>thông tin tài khoản</h1>
          </div>
          <div className="solid"></div>
          <div className='profile_row flex gap-4'>
            <div className="navigation_col w-2/5 flex flex-col gap-2 px-5">
              <div className='profile_info items-center'>
                <div className='w-1/2'>
                  <img className="profile_img" src="../src/assets/user.png" />
                </div>
                <div className="w-1/2">
                  <p className='profile_name font_iCiel_Crocante'>{userProfile.name ? userProfile.name : ''}</p>
                </div>
              </div>
              <div className='navigation_menu pt-8'>
                <ul className="navigation_list">
                  <li className='mb-4'>
                    <a href="" onClick={() => {navigate('/profile/account')}} className="navigation_item">
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
            <Routes>
              <Route path='/account' element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>}
              />
              <Route path='/coupons' element={
                <PrivateRoute>
                  <Coupons />
                </PrivateRoute>}
              />
              <Route path='/history' element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>}
              />
            </Routes>
          </div>
        </div>
      </>
      <Footer />
      {showLogOutModal && <Logout showModal={showLogOutModal} handleClose={() => setShowLogOutModal(false)} logOutSuccess={logOutSuccess} />}
      {hasUser && <ExchangedPoints />}
    </div>
  )
}

export default User