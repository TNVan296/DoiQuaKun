import PropTypes from 'prop-types'
import GiftContent from '~/pages/Gifts/GiftContent/GiftContent'

function HomeContent({ hasUser }) {
  return (
    <div className='content pt-[80px]'>
      <div className='onboarding_1'>
        <div className='w-1/2 px-[15px]'>
          <img src='../src/assets/onboarding_1_1.png' alt='Onboarding 1_1' />
        </div>
        <div className='w-1/2 px-[15px]'>
          <div className='text-center onboarding_text'>
            <p className='shadow-text font_iCiel_Crocante'>SƯU TẬP THẺ SIÊU QUYỀN NĂNG</p>
            <p className='shadow-text font_iCiel_Crocante'>ĐỔI QUÀ SIÊU KUN</p>
            <p className='shadow-text shadow-text-small font_iCiel_Crocante'>TRONG MỖI THÙNG KUN TƯƠI VUI 180ML</p>
            <p className='text-white mb-4'>Thời gian: 25/07 - 30/09/2021</p>
            <a href=''>
              <button className='onboarding_button_1 font_Quicksand'>
                Sưu tập ngay
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className='onboarding_2'>
        <div className='header_img'>
          <img src='../src/assets/onboarding_2_1.png' alt='Onboarding 2_1' />
          <img src='../src/assets/onboarding_2_2.png' alt='Onboarding 2_2' className='relative right-[105px] top-[-90px] float-right' />
        </div>
        <div className='pl-[80px] pr-[105px] mx-0 flex w-full relative top-[-60px]'>
          <div className='w-1/3'>
            <img src='../src/assets/onboarding_2_3.png' alt='Onboarding 2_3' />
          </div>
          <div className='w-2/3 pl-[85px] pr-[0px]'>
            <p className='text-title font_Roboto'>Thẻ Siêu Quyền Năng</p>
            <p>
              Tích Thẻ Siêu Quyền Năng để đổi quà yêu thích. Thời gian khuyến mãi từ 25/07 - 30/09/2021.
              Hạn chót đổi quà 10/10/2021. Thẻ trúng thưởng do IDP phát hành, phải còn nguyên vẹn, không rách nát,
              chắp vá, cạo sửa, bôi vẽ,...
            </p>
            <div className='row flex pl-[0px] mx-0'>
              <a href=''>
                <button className='onboarding_button_2 font_Quicksand'>
                  Xem Chi Tiết Và Đổi Quà
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className='footer_img flex justify-between'>
          <img src='../src/assets/onboarding_2_4.png' alt='Onboarding 2_4' className='pl-[45px]' />
          <img src='../src/assets/onboarding_2_5.png' alt='Onboarding 2_5' className='pr-[80px]'/>
        </div>
      </div>
      <div id='onboarding_4' className='onboarding_4'>
        <img src='../src/assets/onboarding_4_header_vector.svg' className='w-full' />
        <div className='title-wrapper text-center pt-[80px]'>
          <p className='shadow-text font_iCiel_Crocante'>BA BƯỚC ĐỔI QUÀ KUN</p>
        </div>
        <div className='content-wrapper pt-[50px] pl-[150px]'>
          <div className='steps-wrapper grid grid-cols-[60px_550px] items-center gap-5'>
            <img src='../src/assets/onboarding_4_step1.png' />
            <p className='step-title font_iCiel_Panton'>Đăng ký tài khoản bằng SĐT</p>
            <svg className='justify-self-center' width="2" height="65" viewBox="0 0 2 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="0.472321" x2="0.999997" y2="64.8339" stroke="#FDBD35" strokeWidth="2"></line>
            </svg>
            <p className='step-desc font_Quicksand'>Chỉ cần điền SĐT và nhập mật khẩu là bạn đã đăng ký tài khoản thành công</p>
            <img src='../src/assets/onboarding_4_step2.png' />
            <p className='step-title font_iCiel_Panton'>Chọn quà KUN mà bạn muốn đổi thưởng</p>
            <svg className='justify-self-center' width="2" height="65" viewBox="0 0 2 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="0.472321" x2="0.999997" y2="64.8339" stroke="#FDBD35" strokeWidth="2"></line>
            </svg>
            <p className='step-desc font_Quicksand'>Nhập mã số trên mặt thẻ mà bạn sưu tập được. Tích lũy đủ số lượng thẻ cần thiết và chọn phần quà bạn muốn đổi thưởng.</p>
            <img src='../src/assets/onboarding_4_step3.png' />
            <p className='step-title font_iCiel_Panton'>Điền thông tin và nhận quà</p>
            <svg className='justify-self-center' width="2" height="65" viewBox="0 0 2 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="0.472321" x2="0.999997" y2="64.8339" stroke="#FDBD35" strokeWidth="2"></line>
            </svg>
            <p className='step-desc font_Quicksand'>Sau khi bạn đã điền đầy đủ thông tin, chúng tôi sẽ xác nhận sự hợp lệ của những mã số và sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
          </div>
          <div className='btn-wrapper pt-[50px] pb-[50px]'>
            <a href=''>
              <button className='onboarding_button_1 font_Quicksand'>
                Đổi quà ngay
              </button>
            </a>
          </div>
        </div>
        <img src='../src/assets/onboarding_4_footer_vector.svg' className='w-full' />
      </div>
      {hasUser ?
        <GiftContent /> :
        <>
          <div className='onboarding_3 pb-[80px]'>
            <div className='title-wrapper text-center'>
              <p className='shadow-text font_iCiel_Crocante'>quà siêu kun</p>
            </div>
          </div>
          <div id='item-list' className='flex mx-[100px] mb-[115px]'></div>
          <div className='text-center div-not-login px-[15px]'>
            <h4 className='text-2xl font-medium mb-2]'>Bạn chưa đăng nhập, hãy đăng nhập ngay để xem các phần quà nhé !</h4>
            <button className='onboarding_button_2 font_Quicksand text-white bg-[#00AAEC] p-[10px_50px]'>Đăng nhập</button>
          </div>
        </>
      }
      <div className='onboarding_5 flex justify-end'>
        <img src='../src/assets/onboarding_5.png' />
      </div>
    </div>
  )
}

HomeContent.propTypes = {
  hasUser: PropTypes.bool
}

export default HomeContent