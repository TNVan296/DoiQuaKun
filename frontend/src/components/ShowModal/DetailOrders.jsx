import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken'

function DetailOrders({ showModal, handleClose, cartId }) {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (!cartId) return
    const fetchOrderProducts = async () => {
      try {
        const response = await fetchWithAuthToken(`http://localhost:3000/api/order/completed/${cartId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setCartItems(response.data.cart.cartItems)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOrderProducts()
  }, [cartId])

  return (
    <div className={`show-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal_wrapper max-w-[1000px] text-center">
        <div className='modal_header'>
          <h3 className='text-xl text-[#00AAEC] w-full text-center font-medium'>Chi tiết đơn đổi quà</h3>
          <span className="close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className='modal_body p-4'>
          <div className='container'>
            <div className="gift_cart_list max-h-[400px] overflow-y-scroll">
              {cartItems.map((item) => (
                <>
                  <div key={item.id} className="gift_cart_container h-[110px]">
                    <div className="gift_cart_img">
                      <img src={`../src/assets/${item.product.picture.name}`} alt="Product Image" />
                    </div>
                    <div className="gift_cart_info mr-[10px] w-1/3">
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
                    <div className="gift_cart_quantity mr-[50px] w-1/3">
                      <input type="number" min="1" disabled value={item.quantity} className="gift_detail_quantity_counter_input bg-white" />
                    </div>
                    <div className="gift_cart_price w-1/3">
                      <p className="font_Quicksand text-[lightseagreen] capitalize">
                        <b>{item.product.exchangePoint} thẻ siêu quyền năng</b>
                      </p>
                    </div>
                  </div>
                  <div className="gift_cart_line"></div>
                </>
              ))}
            </div>
            <div className='button_row justify-center'>
              <button onClick={handleClose} className='detail_button bg-[#6c757d]'>Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DetailOrders.propTypes = {
  showModal: PropTypes.func,
  handleClose: PropTypes.func,
  cartId: PropTypes.object
}

export default DetailOrders