import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'

function Coupons() {
  const [cardHistory, setCardHistory] = useState([1])
  const navigate = useNavigate()

  // useEffect(() => {
  //   const fetchCardHistory = async () => {
  //     try {
  //       const response = fetchWithAuthToken('http://localhost:3000/api/users/cardHistory', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       const data = await response.json()
  //       setCardHistory(data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchCardHistory()
  // })

  return (
    <>
      <div className="info_col w-3/5 flex flex-col pl-8">
        <button className='back_button' onClick={() => navigate('/profile/account')}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="info_content">
          {cardHistory.length === 0 ?
            <>
              <div className="info_title">
                <h1 className='text-[#dc3545] font_iCiel_Crocante'>Bạn chưa có thẻ nào,<br />
                hãy nhanh chóng thu thập thật nhiều thẻ KUN nhé!</h1>
              </div>
            </>
            :
            ''
          }
          <div className='coupon_wrapper flex flex-col justify-between py-[15px]'>
            <div className='coupon_header flex flex-row justify-between py-[20px]'>
              <div className='datatable_length'>
                <label>
                  Xem
                  <select name='coupon_length' className='coupon_wrapper_item focus:outline-none'>
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
            <table className='coupon_table'>
              <thead>
                <tr>
                  <th className='coupon_table_item w-2/5'>Mã thẻ</th>
                  <th className='coupon_table_item w-2/5'>Ngày nhập</th>
                  <th className='coupon_table_item w-1/5'>Trạng thái</th>
                </tr>
              </thead>
              <tbody className='overflow-y-scroll'>
                {cardHistory.length === 0 ?
                  <>
                    <tr className='no_cards'>
                      <td colSpan={5} className='text-center align-top p-[10px_10px]'>Không tìm thấy dòng nào phù hợp</td></tr>
                  </>
                  :
                  cardHistory.map((item) => {
                    <tr key={item.id}>
                      <td className='coupon_table_item w-2/5'>{item.name}</td>
                      <td className='coupon_table_item w-2/5'>{item.updatedAt}</td>
                      <td className='coupon_table_item w-1/5'>{item.status}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
            <div className='coupon_footer flex flex-row justify-between py-[20px]'>
              <div className='coupon_number_page'>
                Đang xem ở trang 0 đến 0 trong tổng số 0 mục
              </div>
              <div className='coupon_pagination'>
                <ul className='grid grid-cols-2 gap-3'>
                  <li className='coupon_pagination_item'>
                    <a href="#">Trang trước</a>
                  </li>
                  <li className='coupon_pagination_item'>
                    <a href="#">Trang sau</a>
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