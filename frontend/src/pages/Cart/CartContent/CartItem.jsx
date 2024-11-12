import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CartItem() {
  const [items, setItems] = useState([
    { id: 1, quantity: 1 },
    { id: 2, quantity: 1 }
  ])
  const [products, setProducts] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 4
  const navigate = useNavigate()

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % products.length)
  }

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - itemsPerPage + products.length) % products.length
    )
  }

  const handleQuantityChange = (id, event) => {
    const newQuantity = parseInt(event.target.value) || 1
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    )
  }

  const increaseValue = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseValue = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div className="no_empty_cart">
        <div className="gift_cart_list">
          {items.map((item) => (
            <div key={item.id} className="gift_cart_container">
              <div className="gift_cart_img">
                <img src="../src/assets/tuirut_xanhla.png" alt="Product Image" />
              </div>
              <div className="gift_cart_info mr-[150px]">
                <p className="gift_cart_title font_iCiel_Crocante">balo kun dây rút</p>
                <p className="gift_cart_color">
                  <b>Màu sắc:</b> Xanh lá
                </p>
              </div>
              <div className="gift_cart_quantity mr-[100px]">
                <div className="gift_detail_quantity_counter">
                  <button
                    className="gift_detail_quantity_counter_button btn_decrease"
                    onClick={() => decreaseValue(item.id)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    onChange={(event) => handleQuantityChange(item.id, event)}
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
              <div className="gift_cart_price">
                <p className="font_Quicksand text-[lightseagreen] capitalize">
                  <b>1 thẻ siêu quyền năng</b>
                </p>
              </div>
            </div>
          ))}
          <div className="solid"></div>
        </div>
        <div className='transaction'>
          <div className='transaction_card'>
            <p className='price_total font_Baloo text-lg'>
              <b>Tổng cộng:</b> <b className='text-[lightseagreen]'>4 Thẻ Siêu Quyền Năng</b>
            </p>
            <p className='remain_total font_Baloo text-lg'>
              <b>Hiện có:</b> <b className='text-[peru]'>0 Thẻ Siêu Quyền Năng</b>
            </p>
          </div>
          <div className='add_card_button'>
            <p className='font_Quicksand text-[#dc3545] font-bold'>Bạn còn thiếu 4 thẻ
              <button className='ml-4 form_button font_Quicksand bg-[#0099d4] capitalize text-white'>thêm thẻ siêu quyền năng ngay !</button>
            </p>
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
                {products.map((item) => (
                  <div key={item.id} className="item_carousel_item">
                    <a href="" onClick={() => navigate(`/gifts/${item.id}`)}>
                      <img className="gift_card_img" src={`../src/assets/${item.picture.name}`} />
                    </a>
                    <div className="gift_card_body text-center">
                      <a href="" onClick={() => navigate(`/gifts/${item.id}`)}>
                        <p className="gift_title font_Quicksand capitalize">{item.name}</p>
                        <p className="gift_price font_Baloo">{item.exchangePoint}</p>
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
                <input type="text" value={'Nguyễn Gia Thưởng'} id="name" disabled className='w-full font_Quicksand form_control' />
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Số điện thoại</b>
                </p>
                <input type="tel" value={'0935542939'} id="phone" disabled className='w-full font_Quicksand form_control' />
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Email</b>
                </p>
                <input type="email" value={'thuong4g@gmail.com'} id="email" disabled className='w-full font_Quicksand form_control' />
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Họ và Tên bé</b>
                </p>
                <input type="text" value={'Tên bé'} id="baby_name" disabled className='w-full font_Quicksand form_control' />
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Giới tính của bé</b>
                </p>
                <select id="baby_gender" disabled className='w-full form_control font_Quicksand'>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Tuổi của bé</b>
                </p>
                <input type="number" value={''} id="baby_old" disabled className='w-full font_Quicksand form_control' />
              </div>
            </div>
            <div className='checkout_info_col w-1/2 flex flex-col gap-2 px-5'>
              <h3 className='text-2xl text-black font-bold mb-4'>Chọn điểm đổi quà</h3>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Thành Phố/Tỉnh</b>
                </p>
                <select id="city" disabled className='w-full form_control font_Quicksand'>
                  <option value="gia_lai">Tỉnh Gia Lai</option>
                </select>
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Quận/huyện</b>
                </p>
                <select id="district" disabled className='w-full form_control font_Quicksand'>
                  <option value="pleiku">Thành phố Pleiku</option>
                </select>
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Phường/Xã</b>
                </p>
                <select id="ward" disabled className='w-full form_control font_Quicksand'>
                  <option value="">Chọn phường/xã</option>
                </select>
              </div>
              <div className='checkout_info_item mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Điểm đổi quà</b>
                </p>
                <select id="baby_gender" disabled className='w-full form_control font_Quicksand'>
                  <option value="">Chọn điểm đổi quà</option>
                </select>
              </div>
              <div className='checkout_info_item mb-4mb-4'>
                <p className='font_Quicksand text-black'>
                  <b>Ghi chú</b>
                </p>
                <textarea type='text' className='w-full form_control font_Quicksand' disabled placeholder='Nội dung' rows={4}></textarea>
              </div>
            </div>
          </div>
          <div className="solid"></div>
          <div className='confirm_btn text-center'>
            <button className='form_button font_iCiel_Panton bg-[#0099d4] uppercase text-white'>xác nhận đổi quà</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem
