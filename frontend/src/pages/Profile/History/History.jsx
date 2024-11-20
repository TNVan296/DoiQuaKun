import { useNavigate } from 'react-router-dom'

function History() {
  const navigate = useNavigate()
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
                  <th className='coupon_table_item w-[80px]'>Mã đơn</th>
                  <th className='coupon_table_item w-[100px]'>Ngày xác nhận</th>
                  <th className='coupon_table_item w-[100px]'>Trạng thái</th>
                  <th className='coupon_table_item w-[100px]'>Chi tiết</th>
                  <th className='coupon_table_item w-[80px]'>#</th>
                </tr>
              </thead>
              <tbody>
                <tr className=''>
                  <td valign='top' colSpan={5} className='text-center align-top p-[10px_10px]'>Không tìm thấy dòng nào phù hợp</td>
                </tr>
              </tbody>
            </table>
            <div className='coupon_footer flex flex-row justify-between py-[20px] overflow-x-scroll overflow-y-scroll'>
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
        </div>
      </div>
    </>
  )
}

export default History