import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken.js'
import DetailOrders from '~/components/ShowModal/DetailOrders'

function History() {
  const apiURL = import.meta.env.VITE_API_URL
  const [currentLength, setCurrentLength] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [orderData, setOrderData] = useState([])
  const [selectedCartId, setSelectedCartId] = useState(null)
  const [showDetailOrdersModal, setShowDetailOrdersModal] = useState(false)
  const navigate = useNavigate()

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(orderData.length / currentLength)) {
      setCurrentLength(currentPage + 1)
    }
  }

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await fetchWithAuthToken(`${apiURL}/order/completed`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setOrderData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompletedOrders()
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
                    <th colSpan={1} className="coupon_table_item w-[136px]">Mã đơn</th>
                    <th colSpan={1} className="coupon_table_item w-[137px]">Ngày xác<br/>nhận</th>
                    <th colSpan={1} className="coupon_table_item w-[137px]">Trạng thái</th>
                    <th colSpan={1} className="coupon_table_item w-[136px]">Sản phẩm đổi</th>
                    <th colSpan={1} className="coupon_table_item">Tổng điểm</th>
                  </tr>
                </thead>
                <tbody className='table_scroll_y overflow-y-scroll'>
                  {orderData.length === 0 ? (
                    <tr className="no_cards">
                      <td colSpan={5} className="text-center align-top p-[10px_10px]">
                        Không tìm thấy dòng nào phù hợp
                      </td>
                    </tr>
                  ) : (
                    orderData.map((item) => (
                      <tr key={item.id} className="bg-[#f9f9f9] border-b-[1px] border-[#111]">
                        <td colSpan={1} className="coupon_table_item font-normal">{item.id}</td>
                        <td colSpan={1} className="coupon_table_item font-normal">{item.orderAt}</td>
                        <td colSpan={1} className="coupon_table_item font-normal">{item.status}</td>
                        <td colSpan={1} className="coupon_table_item font-normal">
                          <button
                            onClick={() => {
                              setShowDetailOrdersModal(true)
                              setSelectedCartId(item.cartId)
                            }}
                            className="detail_button font_Quicksand">Xem chi tiết</button>
                        </td>
                        <td colSpan={1} className="coupon_table_item font-normal">{item.cart.totalPoints}</td>
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
      {showDetailOrdersModal && <DetailOrders showModal={showDetailOrdersModal} handleClose={() => setShowDetailOrdersModal(false)} cartId={selectedCartId} />}
    </>
  )
}

export default History