import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchWithAuthToken } from '~/utils/fetchWithAuthToken'

function CardRecharge({ showModal, handleClose, cartPoints }) {
  const [cardHistory, setCardHistory] = useState([])
  const [currentLength, setCurrentLength] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [couponData, setCouponData] = useState([])
  const [cardValue, setCardValue] = useState('')
  const [successAddCard, setSuccessAddCard] = useState(false)
  const [wrongCard, setWrongCard] = useState(false)

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

  const fetchCardHistory = useCallback(async () => {
    try {
      const response = await fetchWithAuthToken('http://localhost:3000/api/users/cardHistory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      setCardHistory(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleAddCard = useCallback(async () => {
    try {
      const response = await fetchWithAuthToken('http://localhost:3000/api/cards/recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardName: cardValue, userId: localStorage.getItem('userId') })
      })

      if (response) {
        await fetchCardHistory()
        setWrongCard(false)
        setSuccessAddCard(true)
      } else {
        setSuccessAddCard(false)
        setWrongCard(true)
      }
    } catch (error) {
      console.error(error)
    }
  }, [cardValue, fetchCardHistory])

  useEffect(() => {
    fetchCardHistory()
  }, [fetchCardHistory])

  useEffect(() => {
    const startIndex = (currentPage - 1) * currentLength
    const endIndex = startIndex + parseInt(currentLength, 10)
    setCouponData(cardHistory.slice(startIndex, endIndex))
  }, [cardHistory, currentPage, currentLength])

  return (
    <div className={`show-modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal_wrapper">
        <div className='modal_header'>
          <h3 className='text-xl text-[#00AAEC] w-full text-center font-medium'>Thêm Thẻ Siêu Quyền Năng</h3>
          <span className="close transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className='modal_body p-4'>
          <div className='container'>
            <div className='remain_card mb-3'>
              Số thẻ cần có:&nbsp;
              <span className='text-[lightseagreen] font-bold'>{cartPoints.exchangePoint} Thẻ Siêu Quyền Năng</span>
            </div>
            <div className='remain_card mb-3'>
              Số thẻ hiện có:&nbsp;
              <span className='text-lg text-[peru] font-bolder'>{cartPoints.userPoints} Thẻ Siêu Quyền Năng</span>
            </div>
            <div className='coupon_wrapper flex flex-col justify-between'>
              <div className='coupon_header flex flex-row justify-between py-[15px]'>
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
                      <th colSpan={1} className='coupon_table_item w-[235.5px]'>Mã thẻ</th>
                      <th colSpan={1} className='coupon_table_item w-[235.7px]'>Ngày nhập</th>
                      <th colSpan={1} className='coupon_table_item'>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className='table_scroll_y overflow-y-scroll max-h-[125px]'>
                    {couponData.length === 0 ?
                      (<tr className='no_cards'>
                        <td colSpan={6} className='text-center align-top p-[10px_10px]'>Không tìm thấy dòng nào phù hợp</td>
                      </tr>)
                      :
                      couponData.map((item) => (
                        <tr key={item.id} className='bg-[#f9f9f9] border-b-[1px] border-[#111]'>
                          <td colSpan={1} className='coupon_table_item font-normal'>{item.name}</td>
                          <td colSpan={1} className='coupon_table_item font-normal'>{item.updatedAt}</td>
                          <td colSpan={1} className='coupon_table_item font-normal'>{item.status}</td>
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
                      <button
                        onClick={handlePrevPage}
                      >
                        Trang trước
                      </button>
                    </li>
                    <li className='coupon_pagination_item'>
                      <button
                        onClick={handleNextPage}
                      >
                        Trang sau
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='input_card'>
              {successAddCard && <div className='text-left text-[green] font-bold'>Thêm thẻ thành công</div>}
              {wrongCard && <div className='text-left text-[red] font-bold'>Mã thẻ không hợp lệ</div>}
              <input
                id='card_code'
                value={cardValue}
                onChange={(e) => setCardValue(e.target.value)}
                placeholder='Nhập mã mới'
                className='w-[250px] border border-[#ced4da] border-solid rounded-lg p-[.5rem_.5rem] font-medium text-[#495057]'
              />
              <button
                onClick={handleAddCard}
                className='w-[70px] h-[41.6px] bg-[#00AAEC] rounded-lg text-white ml-2'
              >
                Thêm
              </button>
            </div>
            <div className='button_row'>
              <button onClick={() => window.location.reload()} className='detail_button transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95'>Đổi quà ngay</button>
              <button onClick={handleClose} className='detail_button bg-[#6c757d] transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95'>Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CardRecharge.propTypes = {
  showModal: PropTypes.func,
  handleClose: PropTypes.func,
  cartPoints: PropTypes.object
}

export default CardRecharge