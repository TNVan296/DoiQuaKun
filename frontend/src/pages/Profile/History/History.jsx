import { useNavigate } from 'react-router-dom'

function History() {
  const navigate = useNavigate()
  return (
    <>
      <div className='content pt-[80px] pb-[200px] mx-[150px]'>
        <div className="header_title pt-[80px]">
          <h1>thông tin tài khoản</h1>
        </div>
        <div className="solid"></div>
        <div className='profile_row flex gap-4'>
          <div className="navigation_col w-2/5 flex flex-col gap-2 px-5">
            <div className='profile_info items-center'>
              <div className='w-1/2'>
                <img className="profile_img" src="../src/assets/personal_picture.jpg" />
              </div>
              <div className="w-1/2">
                <p className='profile_name font_iCiel_Crocante'>Nguyễn Gia Thưởng</p>
              </div>
            </div>
            <div className='navigation_menu pt-8'>
              <ul className="navigation_list">
                <li className='mb-4'>
                  <a href="" onClick={() => {navigate('/profile/account')}} className="navigation_item active">
                    <p>
                      <i className="pr-5 far fa-user"></i>
                      Tài khoản của tôi
                    </p>
                  </a>
                </li>
                <li className='mb-4'>
                  <a href="" onClick={() => {navigate('/profile/coupons')}} className="navigation_item">
                    <p>
                      <i className='pr-5 fas fa-barcode'></i>
                      Mã tích lũy
                    </p>
                  </a>
                </li>
                <li className='mb-4'>
                  <a href="" onClick={() => {navigate('/profile/history')}} className="navigation_item">
                    <p>
                      <i className='pr-5 fas fa-history'></i>
                      Lịch sử đổi quà
                    </p>
                  </a>
                </li>
                <li className='mb-4'>
                  <a href="" className="navigation_item">
                    <p>
                      <i className='pr-5 far fa-bell'></i>
                      Thông báo
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
        </div>
      </div>

    </>
  )
}

export default History