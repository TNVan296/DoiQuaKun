import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CartContent from '~/pages/Cart/CartContent/CartContent'

function GiftDetail() {
  const [itemImage, setItemImage] = useState('')
  const [selectColor, setSelectColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { addItemToCart } = useContext(CartContent)
  const navigate = useNavigate()

  const handleAddToCart = () => {
    addItemToCart({
      image: itemImage,
      color: selectColor,
      quantity: quantity
    })
  }

  const handleColorChange = (color) => {
    setSelectColor(color)
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value)
  }

  const increaseValue = () => {
    setQuantity(quantity + 1)
  }

  const decreaseValue = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    } else {
      setQuantity(1)
    }
  }

  const handleImageChange = (index) => {
    setItemImage(index)
  }

  return (
    <>
      <div className="py-[80px] mx-[100px] mb-[115px]">
        <div className="gift_detail flex flex-row gap-10">
          <div className="w-1/2 px-5">
            <div className='gift_detail_img_wrapper mb-5'>
              <img className="gift_detail_img" src={`../src/assets/${itemImage ? itemImage : 'tuirut_tonghop.jpg'}`} />
              <button onClick={() => navigate('/cart')} className='form_button font_iCiel_Crocante w-[230px] mt-0 absolute top-[510px] left-[485px]'>đổi quà ngay</button>
            </div>
            <div className='gift_detail_side_img_wrapper'>
              <div className='slick_track'>
                <img
                  className="slick_track_item"
                  src="../src/assets/tuirut_tonghop.jpg"
                  onClick={() => handleImageChange('tuirut_tonghop.jpg')}
                />
                <img
                  className="slick_track_item"
                  src="../src/assets/tuirut_do.png"
                  onClick={() => handleImageChange('tuirut_do.png')}
                />
                <img
                  className="slick_track_item"
                  src="../src/assets/tuirut_xanhla.png"
                  onClick={() => handleImageChange('tuirut_xanhla.png')}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 px-5">
            <div className="gift_detail_wrapper">
              <div className="container mb-[15px]">
                <p className='gift_title font_iCiel_Crocante mb-[20px] mt-0'>Balo KUN dây rút</p>
                <p className='gift_price font_Baloo text-xl mb-[20px]'>1 Thẻ Siêu Quyền Năng</p>
                <p className='gift_rating mb-[20px]'>
                  <span className='fa fa-star fa-2x mr-[20px]'></span>
                  <span className='fa fa-star fa-2x mr-[20px]'></span>
                  <span className='fa fa-star fa-2x mr-[20px]'></span>
                  <span className='fa fa-star fa-2x mr-[20px]'></span>
                  <span className='fa fa-star fa-2x mr-[20px]'></span>
                </p>
              </div>
              <div className='container color mb-[15px]'>
                <div className="gift_detail_color flex gap-4 items-center">
                  <div className="w-1/5">
                    <p>Màu sắc</p>
                  </div>
                  <div className="w-2/5">
                    <div id="gift_detail_color_list" className="flex flex-row">
                      <input type="radio" hidden id="gift_detail_color_1" name="gift_detail_color" />
                      <label htmlFor="gift_detail_color_1"
                        className={`gift_detail_color_item ${selectColor === 'green' ? 'gift_detail_color_item_active' : ''}`}
                        onClick={() => handleColorChange('green')}
                      >
                        <p>Xanh lá</p>
                      </label>
                      <input type="radio" hidden id="gift_detail_color_2" name="gift_detail_color" />
                      <label htmlFor="gift_detail_color_2"
                        className={`gift_detail_color_item ${selectColor === 'red' ? 'gift_detail_color_item_active' : ''}`}
                        onClick={() => handleColorChange('red')}
                      >
                        <p>Đỏ</p>
                      </label>
                      <input type="radio" hidden id="gift_detail_color_3" name="gift_detail_color" />
                      <label htmlFor="gift_detail_color_3"
                        className={`gift_detail_color_item ${selectColor === 'black' ? 'gift_detail_color_item_active' : ''}`}
                        onClick={() => handleColorChange('black')}
                      >
                        <p>Đen</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='container quantity mb-[15px]'>
                <div className="gift_detail_quantity flex gap-4 items-center">
                  <div className="w-1/5">
                    <p>Số lượng</p>
                  </div>
                  <div className="w-2/5">
                    <div className='gift_detail_quantity_counter'>
                      <button className='gift_detail_quantity_counter_button btn_decrease'
                        onClick={decreaseValue}
                      >-</button>
                      <input type="number" onChange={handleQuantityChange} step="1" min="1" value={quantity} pattern='[0-9]' className='gift_detail_quantity_counter_input' />
                      <button className='gift_detail_quantity_counter_button btn_increase'
                        onClick={increaseValue}
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='container button mb-[15px] flex justify-between'>
                <button onClick={handleAddToCart} className='gift_detail_button font_iCiel_Panton'>Thêm vào giỏ quà</button>
                <button className='gift_detail_button font_iCiel_Panton'>Đổi quà ngay</button>
              </div>
              <div className='container description mb-[15px]'>
                <p className='gift_notes_title'>
                  <b>Lưu ý</b>
                  :
                </p>
                <p className='gift_notes'>Hình ảnh được giao ngẫu nhiên, màu sắc có thể khác biệt một chút so với thực tế bạn nhé.</p>
                <p className='gift_notes_title'>
                  <b>Chất liệu</b>
                  :
                </p>
                <p className='gift_notes'>420D</p>
                <p className='gift_notes_title'>
                  <b>Công dụng</b>
                  :
                </p>
                <p className='gift_notes'>Túi rút thời trang dùng để đựng các vật dụng cá nhân với trọng lượng không quá 10kg.</p>
                <p className='gift_notes_title'>
                  <b>Xuất xứ</b>
                  :
                </p>
                <p className='gift_notes'>Việt Nam</p>
                <p className='gift_notes_title'>
                  <b>Mô tả</b>
                  :
                </p>
                <p className='gift_notes'>Túi rút Kun, màu sắc bắt mắt, bé mang đi học thêm, chơi thể thao rất tiện.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GiftDetail