import { useNavigate } from 'react-router-dom'

function Coupons() {
  const navigate = useNavigate()

  return (
    <>
      <div className="profile_detail_title pt-[80px]">
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
              <p className='profile_name'>Nguyễn Văn Thưởng</p>
            </div>
          </div>
          <div className='navigation_menu pt-8'>
            <ul className="navigation_list">
              <li className='mb-4'>
                <a href="" onClick={() => navigate('/profile/account')} className="navigation_item active">
                  <p>
                    <i className="pr-5 far fa-user"></i>
                    Tài khoản của tôi
                  </p>
                </a>
              </li>
              <li className='mb-4'>
                <a href="" onClick={() => navigate('/profile/coupons')} className="navigation_item">
                  <p>
                    <i className='pr-5 fas fa-barcode'></i>
                    Mã tích lũy
                  </p>
                </a>
              </li>
              <li className='mb-4'>
                <a href="" onClick={() => navigate('/profile/history')} className="navigation_item">
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
        <div className="info_col w-3/5 flex flex-col">
          <button className='back_button' onClick={() => navigate('/profile/account')}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="info_content">
            <div className="info_title">
              <h1 className='text-[#dc3545]'>Bạn chưa có thẻ nào,<br />
              hãy nhanh chóng thu thập thật nhiều thẻ KUN nhé!</h1>
            </div>
            <div className='coupon_wrapper flex flex-col justify-between py-[15px]'>
              <div className='coupon_head flex flex-row justify-between py-[20px]'>
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
                <tbody>
                  <tr className=''>
                    <td className='text-center p-[10px_10px]'>Không tìm thấy dòng nào phù hợp</td>
                  </tr>
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
      </div>
    </>
  )
}

export default Coupons