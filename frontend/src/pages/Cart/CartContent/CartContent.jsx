import { useState, useEffect } from 'react'
import CartItem from '~/pages/Cart/CartContent/CartItem'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function CartContent() {
  const [hasCartItem, setHasCartItem] = useState({})

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const response = await fetchWithAuthToken('http://localhost:3000/api/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setHasCartItem(response.data)
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchCartItem()
  }, [])

  return (
    <>
      <div className="content pt-[80px] pb-[200px] mx-[150px]">
        <div className="header_title pt-[80px]">
          <button className="font_iCiel_Crocante form_button font-medium text-white bg-[#00AAEC] w-[230px] mt-0">thêm quà vào giỏ</button>
          <h1 className="m-[20px_0_10px]">giỏ quà</h1>
        </div>
        <div className="solid"></div>
        <div className="cart_list">
          { hasCartItem.totalItems && hasCartItem.totalItems > 0 ?
            <CartItem hasCartItem={hasCartItem} setHasCartItem={setHasCartItem} />
            :
            <div className="empty_cart">
              <img src="../src/assets/empty-cart.png" className="inline" alt="empty cart" />
              <p className="text-lg">Không có sản phẩm nào trong giỏ !</p>
              <button className="form_button font_iCiel_Panton text-white bg-[#00AAEC] hover:bg-[#007bff] w-[230px] mt-0 uppercase">chọn quà ngay</button>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default CartContent