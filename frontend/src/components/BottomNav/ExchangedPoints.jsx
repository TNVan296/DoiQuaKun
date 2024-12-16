import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken'

function ExchangedPoints({ increaseValue, decreaseValue, addToCart }) {
  const [exchangePoints, setExchangePoints] = useState({})

  useEffect(() => {
    const fetchExchangePoints = async () => {
      try {
        const response = await fetchWithAuthToken('http://localhost:3000/api/cart/points', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setExchangePoints(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchExchangePoints()
  }, [increaseValue, decreaseValue, addToCart])

  return (
    <nav className="bottom_nav">
      <div className="bottom_nav_container">
        <div className="bottom_nav_item">
          <p className="font_Quicksand text-[lightseagreen] font-bold text-base">
            Bạn cần&nbsp;
            {exchangePoints.exchangePoint ?
              <span className="font_Quicksand text-[#dc3545] font-bold text-base">
                {exchangePoints.exchangePoint}
              </span>
              :
              <span className="font_Quicksand text-[#dc3545] font-bold text-base">
                0
              </span>
            }
            &nbsp;thẻ để thực hiện đổi quà
          </p>
        </div>
        <div className="bottom_nav_item">
          <p className="font_Quicksand text-[peru] font-bold text-base">
            Hiện tại bạn đang có&nbsp;
            <span className="font_Quicksand text-[#dc3545] font-bold text-base">
              {exchangePoints.userPoints}
            </span>
            &nbsp;thẻ
          </p>
        </div>
      </div>
    </nav>
  )
}

ExchangedPoints.propTypes = {
  increaseValue: PropTypes.func,
  decreaseValue: PropTypes.func,
  addToCart: PropTypes.func
}

export default ExchangedPoints