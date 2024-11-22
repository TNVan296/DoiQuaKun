import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function GiftContent() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
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
        setProducts([])
      }
    }
    fetchProducts()
  }, [])

  return (
    <>
      <div className='onboarding_3 py-[80px]'>
        <div className='title-wrapper text-center'>
          <p className='shadow-text font_iCiel_Crocante'>quà siêu kun</p>
        </div>
      </div>
      <div id='item-list' className='grid grid-cols-4 gap-8 mx-[100px] mb-[115px]'>
        {products.map((product) => (
          <div
            id={`item-${product.id}`}
            key={product.id}
            onClick={() => navigate(`/gifts/${product.id}`) }
            className='gift_card shadow'>
            <a href="">
              <img className="gift_card_img" src={`../src/assets/${product.image}`} />
            </a>
            <div className='gift_card_body'>
              <a href="">
                <p className='gift_title font_Quicksand'>{product.name}</p>
                <p className='gift_price font_Baloo'>{product.exchangePoint} Thẻ Siêu Quyền Năng</p>
                <p className='gift_rating'>
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className="fa fa-star"></span>
                  ))}
                </p>
                <button className='gift_detail_button font_Quicksand'>xem chi tiết</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default GiftContent