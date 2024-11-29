import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function Coupons() {
  const [cardHistory, setCardHistory] = useState([])
  const [currentLength, setCurrentLength] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [couponData, setCouponData] = useState([])
  const navigate = useNavigate()

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(cardHistory.length / currentLength)) {
      setCurrentLength(currentPage + 1)
    }
  }

  useEffect(() => {
    const fetchCardHistory = async () => {
      try {
        const response = await fetchWithAuthToken('http://localhost:3000/api/users/cardHistory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setCardHistory(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCardHistory()
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * currentLength
    const endIndex = startIndex + parseInt(currentLength, 10)
    setCouponData(cardHistory.slice(startIndex, endIndex))
  }, [cardHistory, currentPage, currentLength])

  return (
    <>
      <div className="info_col w-3/5 flex flex-col pl-8">
        <button className='back_button' onClick={() => navigate('/profile/account')}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="info_content">
          {cardHistory.length === 0 &&
            <>
              <div className="info_title">
                <h1 className='text-[#dc3545] font_iCiel_Crocante'>Bạn chưa có thẻ nào,<br />
                hãy nhanh chóng thu thập thật nhiều thẻ KUN nhé!</h1>
              </div>
            </>
          }
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
            <div className='table_container'>
              <table className='coupon_table'>
                <thead>
                  <tr>
                    <th className='coupon_table_item w-[223.5px]'>Mã thẻ</th>
                    <th className='coupon_table_item w-[223.5px]'>Ngày nhập</th>
                    <th className='coupon_table_item'>Trạng thái</th>
                  </tr>
                </thead>
                <tbody className={`table_scroll_y ${couponData.length > 6 ? 'overflow-y-scroll' : ''}`}>
                  {couponData.length === 0 ?
                    (<tr className='no_cards'>
                      <td colSpan={6} className='text-center align-top p-[10px_10px]'>Không tìm thấy dòng nào phù hợp</td>
                    </tr>)
                    :
                    couponData.map((item) => (
                      <tr key={item.id} className='bg-[#f9f9f9] border-b-[1px] border-[#111]'>
                        <td colSpan={3} className='coupon_table_item font-normal'>{item.name}</td>
                        <td colSpan={3} className='coupon_table_item font-normal'>{item.updatedAt}</td>
                        <td colSpan={3} className='coupon_table_item font-normal'>{item.status}</td>
                      </tr>
                    ))
                  }
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
          <div className='btn_wrapper flex justify-end gap-4'>
            <button className='form_button bg-[#00AAEC] text-white'>Đổi quà</button>
            <button className='form_button '>Thêm thẻ</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Coupons