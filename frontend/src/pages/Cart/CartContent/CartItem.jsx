import { useState } from 'react'

function CartItem() {
  const [items, setItems] = useState([
    { id: 1, quantity: 1 },
    { id: 2, quantity: 1 }
  ])

  const handleQuantityChange = (id, event) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: event.target.value } : item
    ))
  }


  const increaseValue = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const decreaseValue = (id) => {
    setItems(items.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }

  return (
    <div className="no_empty_cart">
      <div className="gift_cart_list">
        {items.map((item) => (
          <div key={item.id} className="gift_cart_container">
            <div className="gift_cart_img">
              <img src="../src/assets/tuirut_xanhla.png" />
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
    </div>
  );
}

export default CartItem