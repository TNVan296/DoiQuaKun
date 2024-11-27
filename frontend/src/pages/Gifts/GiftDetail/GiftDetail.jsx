import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ExchangedPoints from '~/components/BottomNav/ExchangedPoints'
import AddCartItemModal from '~/components/NotificationModal/AddCartItemModal'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function GiftDetail() {
  const [itemImage, setItemImage] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedDesign, setSelectedDesign] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [colors, setColors] = useState([])
  const [sizes, setSizes] = useState([])
  const [designs, setDesigns] = useState([])
  const [pictures, setPictures] = useState([])
  const [productItem, setProductItem] = useState({})
  const [filteredProducts, setFilteredProducts] = useState([])
  const [cartPoints, setCartPoints] = useState({})
  const [showSuccessAddCartItemModal, setShowSuccessAddCartItemModal] = useState(false)
  const { giftId } = useParams()
  const navigate = useNavigate()

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

  const handleSelectedChange = (type, id) => {
    if (type === 'color') {
      setSelectedColor((prev) => (prev === id ? '' : id))
    } else if (type === 'size') {
      setSelectedSize((prev) => (prev === id ? '' : id))
    } else if (type === 'design') {
      setSelectedDesign((prev) => (prev === id ? '' : id))
    }
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

  const addToCart = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const addProductToCart = await fetchWithAuthToken('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: filteredProducts.map((product) => product.id)[0],
          userId: localStorage.getItem('userId'),
          quantity: quantity
        })
      })
      await updateCartPoints()
      setShowSuccessAddCartItemModal(true)
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
        setProductItem(response.data)
        const fetchedProducts = response.data.products
        const colorArray = []
        const sizeArray = []
        const designArray = []
        const pictureArray = []

        fetchedProducts.forEach((product) => {
          if (product.color && !colorArray.find((color) => color.id === product.colorId)) {
            colorArray.push({
              id: product.color.id,
              name: product.color.name
            })
          }
          if (product.size && !sizeArray.find((size) => size.id === product.sizeId)) {
            sizeArray.push({
              id: product.size.id,
              name: product.size.sizeName
            })
          }
          if (product.design && !designArray.find((design) => design.id === product.designId)) {
            designArray.push({
              id: product.design.id,
              name: product.design.name
            })
          }
          if (product.picture && !pictureArray.find((picture) => picture.pictureId === product.picture.id)) {
            pictureArray.push({
              pictureId: product.picture.id,
              pictureName: product.picture.name
            })
          }
        })

        setColors(colorArray)
        setSizes(sizeArray)
        setDesigns(designArray)
        setPictures(pictureArray)

        let filteredProductItems = fetchedProducts

        if (selectedColor) {
          filteredProductItems = filteredProductItems.filter((product) => product.colorId === selectedColor)
        }
        if (selectedSize) {
          filteredProductItems = filteredProductItems.filter((product) => product.sizeId === selectedSize)
        }
        if (selectedDesign) {
          filteredProductItems = filteredProductItems.filter((product) => product.designId === selectedDesign)
        }
        setFilteredProducts(filteredProductItems)
      } catch (error) {
        console.error('Error fetching product item:', error)
      }
    }
    if (giftId) fetchProductItem()
  }, [giftId, selectedColor, selectedSize, selectedDesign])

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
                {pictures.map((picture) => (
                  <img
                    className="slick_track_item"
                    key={picture.pictureId}
                    src={`../src/assets/${picture.pictureName}`}
                    onClick={() => handleImageChange(picture.pictureName)}
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
              {sizes.length > 0 &&
                <div className="container size mb-[15px]">
                  <div className="gift_detail_size flex gap-4 items-center">
                    <div className="w-1/5">
                      <p>Kích thước<br />(Size)</p>
                    </div>
                    <div className="w-4/5">
                      <div id="gift_detail_size_list" className="flex flex-row">
                        {sizes.map((size) => {
                          const isAvailable = filteredProducts.some(
                            (product) => product.sizeId === size.id
                          )
                          if (!isAvailable) return null

                          return (
                            <>
                              <input
                                key={size.id}
                                type="radio"
                                hidden
                                id={`gift_detail_size_${size.id}`}
                                name="gift_detail_size"
                              />
                              <label
                                htmlFor={`gift_detail_size_${size.id}`}
                                className={`gift_detail_item ${
                                  selectedSize === size.id ? 'gift_detail_item_active' : ''
                                }`}
                                onClick={() => handleSelectedChange('size', size.id)}
                              >
                                <p>{size.name}</p>
                              </label>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              }
              {designs.length > 0 &&
                <div className='container design mb-[15px]'>
                  <div className="gift_detail_design flex gap-4 items-center">
                    <div className="w-1/5">
                      <p>Thiết kế</p>
                    </div>
                    <div className="w-4/5">
                      <div id="gift_detail_design_list" className="flex flex-row">
                        {designs.map((design) => {
                          const isAvailable = filteredProducts.some(
                            (product) => product.designId === design.id
                          )
                          if (!isAvailable) return ''

                          return (
                            <>
                              <input
                                type="radio"
                                key={design.id}
                                hidden
                                id={`gift_detail_design_${design.id}`}
                                name="gift_detail_design"
                              />
                              <label
                                htmlFor={`gift_detail_design_${design?.id}`}
                                className={`gift_detail_item ${
                                  selectedDesign === design?.id ? 'gift_detail_item_active' : ''
                                }`}
                                onClick={() => handleSelectedChange('design', design?.id)}
                              >
                                <p>{design?.name}</p>
                              </label>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              }
              {colors.length > 0 &&
                <div className='container color mb-[15px]'>
                  <div className="gift_detail_color flex gap-4 items-center">
                    <div className="w-1/5">
                      <p>Màu sắc</p>
                    </div>
                    <div className="w-4/5">
                      <div id="gift_detail_color_list" className="flex flex-row">
                        {colors.map((color) => {
                          const isAvailable = filteredProducts.some(
                            (product) => product.colorId === color.id
                          )
                          if (!isAvailable) return null
                          return (
                            <>
                              <input type="radio" key={color.id} hidden id={`gift_detail_color_${color.id}`} name="gift_detail_color" />
                              <label htmlFor={`gift_detail_color_${color.id}`}
                                className={`gift_detail_item ${selectedColor === color.id ? 'gift_detail_item_active' : ''}`}
                                onClick={() => handleSelectedChange('color', color.id)}
                              >
                                <p>{color.name}</p>
                              </label>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              }
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExchangedPoints addToCart={addToCart} />
      {showSuccessAddCartItemModal && <AddCartItemModal showModal={showSuccessAddCartItemModal} handleClose={() => setShowSuccessAddCartItemModal(false)} />}
    </>
  )
}

export default GiftDetail