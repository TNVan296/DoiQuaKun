import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import ExchangedPoints from '~/components/BottomNav/ExchangedPoints'
import SuccessCheckoutModal from '~/components/NotificationModal/SuccessCheckoutModal'
import CardRecharge from '~/components/ShowModal/CardRecharge'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken'

function CartItem({ hasCartItem, setHasCartItem, cartPoints, setCartPoints }) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [userProfile, setUserProfile] = useState({})
  const [userOrder, setUserOrder] = useState({})
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [showCardRechargeModal, setShowCardRechargeModal] = useState(false)
  const [showSuccessCheckoutModal, setShowSuccessCheckoutModal] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 4

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

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % products.length)
  }

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - itemsPerPage + products.length) % products.length
    )
  }

  const updateCartPoints = async () => {
    try {
      const response = await fetchWithAuthToken('http://localhost:3000/api/cart/points', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setCartPoints(response)
    } catch (error) {
      console.error(error)
    }
  }

  const increaseValue = async (id) => {
    try {
      setHasCartItem((prev) => ({
        ...prev,
        cartItems: prev.cartItems?.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }))
      const product = hasCartItem.cartItems.find((item) => item.id === id)
      if (product) {
        await fetchWithAuthToken('http://localhost:3000/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: product.productId,
            userId: hasCartItem.userId,
            quantity: 1
          })
        })
      }
      await updateCartPoints()
    } catch (error) {
      console.log(error)
    }
  }

  const decreaseValue = async (id) => {
    try {
      setHasCartItem((prev) => {
        const updateCartItems = prev.cartItems?.map((item) =>
          item.id === id ?
            { ...item, quantity: item.quantity - 1 } : item
        ).filter((item) => item.quantity > 0)
        return { ...prev, cartItems: updateCartItems }
      })
      const product = hasCartItem.cartItems.find((item) => item.id === id)
      if (product) {
        await fetchWithAuthToken('http://localhost:3000/api/cart/remove', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: product.productId,
            userId: hasCartItem.userId,
            quantity: 1
          })
        })
      }
      await updateCartPoints()
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckOut = async () => {
    try {
      const response = await fetchWithAuthToken('http://localhost:3000/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: hasCartItem.userId,
          babyName: userOrder.babyName,
          babyAge: userOrder.babyAge,
          babyGender: userOrder.babyGender,
          detailAddress: userOrder.detailAddress,
          note: userOrder.note
        })
      })
      setUserOrder(response.data)
      setShowSuccessCheckoutModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/products', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json()
          setProducts(data.data)
        }
        catch (error) {
          console.log(error)
        }
      }
      fetchProducts()
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
          console.log(error)
        }
      }
      fetchUserProfile()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <div className="no_empty_cart">
        <div className="gift_cart_list">
          {hasCartItem.cartItems?.map((item) => (
            <>
              <div key={item.id} className="gift_cart_container">
                <div className="gift_cart_img">
                  <img src={`../src/assets/${item.product.picture.name}`} alt="Product Image" />
                </div>
                <div className="gift_cart_info mr-[150px] w-1/4">
                  <p className="gift_cart_title font_iCiel_Crocante">{item.product.name}</p>
                  {item.product?.size &&
                    <p className="gift_cart_props">
                      <b>Kích thước (Size):</b> {item.product.size.sizeName}
                    </p>
                  }
                  {item.product?.design &&
                    <p className="gift_cart_props">
                      <b>Thiết kế:</b> {item.product.design.name}
                    </p>
                  }
                  {item.product?.color &&
                    <p className="gift_cart_props">
                      <b>Màu sắc:</b> {item.product.color.name}
                    </p>
                  }
                </div>
                <div className="gift_cart_quantity mr-[100px] w-1/4">
                  <div className="gift_detail_quantity_counter">
                    <button
                      className="gift_detail_quantity_counter_button btn_decrease"
                      onClick={() => decreaseValue(item.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="gift_detail_quantity_counter_input"
                    />
                    <button
                      className="gift_detail_quantity_counter_button btn_increase"
                      onClick={() => increaseValue(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="gift_cart_price w-1/4">
                  <p className="font_Quicksand text-[lightseagreen] capitalize">
                    <b>{item.product.exchangePoint} thẻ siêu quyền năng</b>
                  </p>
                </div>
              </div>
              <div className="gift_cart_line"></div>
            </>
          ))}
        </div>

        <div className='transaction'>
          <div className='transaction_card'>
            <p className='price_total font_Baloo text-lg'>
              <b>Tổng cộng:</b> <b className='text-[lightseagreen]'>{cartPoints.exchangePoint} Thẻ Siêu Quyền Năng</b>
            </p>
            <p className='remain_total font_Baloo text-lg'>
              <b>Hiện có:</b> <b className='text-[peru]'>{cartPoints.userPoints} Thẻ Siêu Quyền Năng</b>
            </p>
          </div>
          <div className='add_card_button'>
            {cartPoints.userPoints >= cartPoints.exchangePoint ?
              <button onClick={() => setShowCardRechargeModal(true)} className='ml-4 form_button font_Quicksand bg-[#0099d4] capitalize text-white'>thêm thẻ siêu quyền năng ngay !</button>
              :
              <p className='font_Quicksand text-[#dc3545] font-bold'>Bạn còn thiếu {cartPoints.exchangePoint - cartPoints.userPoints} thẻ
                <button onClick={() => setShowCardRechargeModal(true)} className='ml-4 form_button font_Quicksand bg-[#0099d4] capitalize text-white'>thêm thẻ siêu quyền năng ngay !</button>
              </p>
            }
          </div>
          <p className='font_Quicksand text-[#dc3545] font-bold mt-4  '>Bạn phải nhập thông tin để hoàn tất việc đổi quà</p>
        </div>

        <div className="item_list_carousel">
          <div className="header_title">
            <h1 className="m-[20px_0_10px]">Các sản phẩm khác</h1>
          </div>
          <div className="items_carousel">
            <button className="item_carousel_prev" onClick={handlePrev}>
              <i className="fas fa-angle-left"></i>
            </button>
            <div className="carousel_track_wrapper">
              <div
                className="carousel_track"
                style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }}
              >
                {products.length > 0 &&
                  products.map((item) => (
                    <div key={item.id} className="item_carousel_item">
                      <a href="" onClick={() => navigate(`/gifts/${item.id}`)}>
                        <img className="gift_card_img" src={`../src/assets/${item.image}`} />
                      </a>
                      <div className="gift_card_body text-center">
                        <a href="" onClick={() => navigate(`/gifts/${item.id}`)}>
                          <p className="gift_title font_Quicksand capitalize">{item.name}</p>
                          <p className="gift_price font_Baloo">{item.exchangePoint} Thẻ Siêu Quyền Năng</p>
                          <p className="gift_rating">
                            {[...Array(5)].map((_, index) => (
                              <span key={index} className="fa fa-star"></span>
                            ))}
                          </p>
                          <button className="gift_detail_button font_Quicksand">Xem chi tiết</button>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <button className="item_carousel_next" onClick={handleNext}>
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>

        <div className='checkout_info mt-[100px] mb-[80px] w-[100%] font_Quicksand text-[#666] '>
          <div className="header_title">
            <h1 className="m-[20px_0_10px]">đổi quà ngay</h1>
          </div>
          <div className="solid"></div>
          <div className='checkout_info_row flex flex-row gap-4 mt-4 '>
            <div className='checkout_info_col w-1/2 flex flex-col gap-2 px-5 border_right'>
              <h3 className='text-[lightseagreen] text-3xl font-bold mb-4'>Thông tin người nhận</h3>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Họ và Tên</b>
                </p>
                <input
                  id="name"
                  type="text"
                  value={userProfile.name}
                  className='w-full font_Quicksand form_control'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                />
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Số điện thoại</b>
                </p>
                <input
                  id="phone"
                  type="tel"
                  value={userProfile.phoneNumber}
                  className='w-full font_Quicksand form_control'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                />
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Email</b>
                </p>
                <input type="email" value={userProfile.email} id="email" disabled className='w-full font_Quicksand form_control' />
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Họ và Tên bé</b>
                </p>
                <input
                  type="text"
                  id="baby_name"
                  onChange={(e) => setUserOrder({ ...userOrder, babyName: e.target.value })}
                  className='w-full font_Quicksand form_control'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                />
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Giới tính của bé</b>
                </p>
                <select
                  id="baby_gender"
                  onChange={(e) => setUserOrder({ ...userOrder, babyGender: e.target.value })}
                  value={String(userOrder.babyGender)}
                  className='w-full form_control font_Quicksand'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                >
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                  <option value="null">Khác</option>
                </select>
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Tuổi của bé</b>
                </p>
                <input
                  type="number"
                  id="baby_old"
                  onChange={(e) => setUserOrder({ ...userOrder, babyAge: e.target.value })}
                  className='w-full font_Quicksand form_control'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                />
              </div>
            </div>
            <div className='checkout_info_col w-1/2 flex flex-col gap-2 px-5'>
              <h3 className='text-2xl text-black font-bold mb-4'>Chọn điểm đổi quà</h3>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Thành Phố/Tỉnh</b>
                </p>
                <select
                  id="city"
                  onFocus={getCities}
                  onChange={(e) => {
                    setUserProfile({ ...userProfile, cityId: e.target.value })
                    getDistricts(e.target.value)
                  }}
                  value={userProfile.cityId}
                  className='w-full form_control font_Quicksand'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                >
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
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Quận/huyện</b>
                </p>
                <select
                  id="district"
                  onChange={(e) => {
                    setUserProfile({ ...userProfile, districtId: e.target.value })
                    getWards(e.target.value)
                  }}
                  value={userProfile.districtId}
                  className='w-full form_control font_Quicksand'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
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
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Phường/Xã</b>
                </p>
                <select
                  id="ward"
                  onChange={(e) => setUserProfile({ ...userProfile, wardId: e.target.value })}
                  value={userProfile.wardId}
                  className='w-full form_control font_Quicksand'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                >
                  <option value="">Chọn Phường/Xã</option>
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
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Địa điểm chi tiết</b>
                </p>
                <input
                  id="address"
                  type="text"
                  value={userOrder.detailAddress}
                  onChange={(e) => setUserOrder({ ...userOrder, detailAddress: e.target.value })}
                  className='w-4/5 form_control'
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                />
              </div>
              <div className='checkout_info_item mb-4mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Ghi chú</b>
                </p>
                <textarea
                  type='text'
                  value={userOrder.note}
                  onChange={(e) => setUserOrder({ ...userOrder, note: e.target.value })}
                  className='w-full form_control font_Quicksand'
                  placeholder='Nội dung'
                  rows={4}
                  disabled={cartPoints.userPoints < cartPoints.exchangePoint}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="solid"></div>
          <div className='confirm_btn text-center'>
            <button onClick={handleCheckOut} className='form_button font_iCiel_Panton bg-[#0099d4] uppercase text-white'>xác nhận đổi quà</button>
          </div>
        </div>
      </div>
      <ExchangedPoints increaseValue={increaseValue} decreaseValue={decreaseValue} />
      {showCardRechargeModal && <CardRecharge showModal={showCardRechargeModal} handleClose={() => setShowCardRechargeModal(false)} cartPoints={cartPoints} setCartPoints={setCartPoints} />}
      {showSuccessCheckoutModal && <SuccessCheckoutModal showModal={showSuccessCheckoutModal} handleClose={() => setShowSuccessCheckoutModal(false)} />}
    </>
  )
}

CartItem.propTypes = {
  hasCartItem: PropTypes.object,
  setHasCartItem: PropTypes.func,
  cartPoints: PropTypes.object,
  setCartPoints: PropTypes.func
}

export default CartItem