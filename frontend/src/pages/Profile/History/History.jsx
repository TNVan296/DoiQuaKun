import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function History() {
  const [giftHistory, setGiftHistory] = useState([])
  const [currentLength, setCurrentLength] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [cartHistoryData, setCartHistoryData] = useState([])
  const navigate = useNavigate()

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(cartHistoryData.length / currentLength)) {
      setCurrentLength(currentPage + 1)
    }
  }

  useEffect(() => {
    const fetchCartHistory = async () => {
      try {
        const response = await fetchWithAuthToken('http://localhost:3000/api/users/cartHistory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setCartHistoryData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCartHistory()
  }, [])

  return (
    <>
      <div className="info_col w-3/5 flex flex-col pl-8">
        <button className='back_button mb-0' onClick={() => navigate('/profile/account')}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="info_content">
          <div className='coupon_wrapper flex flex-col justify-between py-[15px]'>
            <div className='coupon_header flex flex-row justify-between py-[20px]'>
              <div className='datatable_length'>
                <label>
                  Xem
                  <select
                    name='coupon_length'
                    onChange={(e) => {
                      setCurrentLength(e.target.value)
                      setCurrentPage(1)
                    }}
                    className='coupon_wrapper_item focus:outline-none'
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  mục
                </label>
              </div>
              <div className='search_coupon'>
                <label>
                  Tìm:
                  <input type="text" className='coupon_wrapper_item focus:outline-none focus:border-[#000] focus:border-[1px]'/>
                </label>
              </div>
            </div>
            <div className="table_container">
              <table className="coupon_table">
                <thead>
                  <tr>
                    <th className="coupon_table_item">Mã đơn</th>
                    <th className="coupon_table_item">Ngày xác nhận</th>
                    <th className="coupon_table_item">Trạng thái</th>
                    <th className="coupon_table_item">Sản phẩm đổi</th>
                    <th className="coupon_table_item">Tổng điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {cartHistoryData.length === 0 ? (
                    <tr className="no_cards">
                      <td colSpan={5} className="text-center align-top p-[10px_10px]">
                        Không tìm thấy dòng nào phù hợp
                      </td>
                    </tr>
                  ) : (
                    cartHistoryData.map((item) => (
                      <tr key={item.id} className="bg-[#f9f9f9] border-b-[1px] border-[#111]">
                        <td className="coupon_table_item font-normal">{item.id}</td>
                        <td className="coupon_table_item font-normal">{item.updatedAt}</td>
                        <td className="coupon_table_item font-normal">{item.status}</td>
                        <td className="coupon_table_item font-normal">
                          {item.cartItems.map((item) => item.product.name).join(', ')}
                        </td>
                        <td className="coupon_table_item font-normal">{item.totalPoints}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className='coupon_footer flex flex-row justify-between py-[20px]'>
              <div className='coupon_number_page'>
                Đang xem ở trang {currentPage} trong tổng số {currentLength} mục
              </div>
              <div className='coupon_pagination'>
                <ul className='grid grid-cols-2 gap-3'>
                  <li className='coupon_pagination_item'>
                    <button onClick={handlePrevPage}>Trang trước</button>
                  </li>
                  <li className='coupon_pagination_item'>
                    <button onClick={handleNextPage}>Trang sau</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default History