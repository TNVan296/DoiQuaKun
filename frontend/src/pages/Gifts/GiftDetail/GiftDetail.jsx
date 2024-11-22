import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function GiftDetail() {
  const [itemImage, setItemImage] = useState('')
  const [selectColor, setSelectColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [productItem, setProductItem] = useState({})
  const { giftId } = useParams()

  const navigate = useNavigate()

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

  const addToCart = async () => {
    try {
      const addProductToCart = await fetchWithAuthToken('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.log('Error adding product item to cart !', error)
    }
  }

  useEffect(() => {
    const fetchProductItem = async () => {
      try {
        const response = await fetchWithAuthToken(`http://localhost:3000/api/products/${giftId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(response)
        setProductItem(response.data)
      } catch (error) {
        console.error('Error fetching product item:', error)
      }
    }
    if (giftId) fetchProductItem()
  }, [giftId])

  return (
    <>
      <div className="py-[80px] mx-[100px] mb-[115px]">
        <div className="gift_detail flex flex-row gap-10">
          <div className="w-1/2 px-5">
            <div className='gift_detail_img_wrapper mb-5'>
              <img className="gift_detail_img" src={`../src/assets/${itemImage ? itemImage : productItem.image}`} />
              <button onClick={() => navigate('/cart')} className='form_button font_iCiel_Crocante w-[230px] mt-0 absolute top-[510px] left-[485px]'>đổi quà ngay</button>
            </div>
            <div className='gift_detail_side_img_wrapper'>
              <div className='slick_track'>
                {productItem.products?.map((product) => (
                  <img
                    className="slick_track_item"
                    key={product.pictureId}
                    src={`../src/assets/${product.picture?.name}`}
                    onClick={() => handleImageChange(product?.picture?.name)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/2 px-5">
            <div className="gift_detail_wrapper">
              <div className="container mb-[15px]">
                <p className='gift_title font_iCiel_Crocante mb-[20px] mt-0'>{productItem.name}</p>
                <p className='gift_price font_Baloo text-xl mb-[20px]'>{productItem.exchangePoint} Thẻ Siêu Quyền Năng</p>
                <p className='gift_rating mb-[20px]'>
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className='fa fa-star fa-2x mr-[20px]'></span>
                  ))}
                </p>
              </div>
              <div className='container color mb-[15px]'>
                <div className="gift_detail_color flex gap-4 items-center">
                  <div className="w-1/5">
                    <p>Màu sắc</p>
                  </div>
                  <div className="w-2/5">
                    <div id="gift_detail_color_list" className="flex flex-row">
                      {productItem.products?.map((product) => (
                        <>
                          <input type="radio" key={product.colorId} hidden id={`gift_detail_color_${product.colorId}`} name="gift_detail_color" />
                          <label htmlFor={`gift_detail_color_${product.colorId}`}
                            className={`gift_detail_color_item ${selectColor === product.color?.name ? 'gift_detail_color_item_active' : ''}`}
                            onClick={() => handleColorChange(product.color?.name)}
                          >
                            <p>{product.color?.name}</p>
                          </label>
                        </>
                      ))}
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
                <button onClick={addToCart} className='gift_detail_button font_iCiel_Panton'>Thêm vào giỏ quà</button>
                <button onClick={() => navigate('/cart')}className='gift_detail_button font_iCiel_Panton'>Đổi quà ngay</button>
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