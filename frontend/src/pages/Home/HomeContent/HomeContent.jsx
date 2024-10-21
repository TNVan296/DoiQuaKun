
function HomeContent() {
  return (
    <div className='content pt-[80px]'>
      <div className='onboarding_1 flex'>
        <div className='w-1/2 px-[15px]'>
          <img src='../src/assets/onboarding_1_1.png' alt='Onboarding 1_1' />
        </div>
        <div className='w-1/2 px-[15px]'>
          <div className='text-center onboarding_text'>
            <p className='shadow-text'>Sưu tập Thẻ Siêu Quyền Năng</p>
            <p className='shadow-text'>Đổi quà siêu kun</p>
            <p className='shadow-text shadow-text-small'>Trong mỗi thùng KUN tươi vui 180ml</p>
            <p className='text-white mb-4'>Thời gian: 25/07 - 30/09/2021</p>
            <a href='#'>
              <button className='onboarding_button_1'>
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
            <p className='text-title'>Thẻ Siêu Quyền Năng</p>
            <p>
              Tích Thẻ Siêu Quyền Năng để đổi quà yêu thích. Thời gian khuyến mãi từ 25/07 - 30/09/2021.
              Hạn chót đổi quà 10/10/2021. Thẻ trúng thưởng do IDP phát hành, phải còn nguyên vẹn, không rách nát,
              chắp vá, cạo sửa, bôi vẽ,...
            </p>
            <div className='row flex pl-[0px] mx-0'>
              <a href='#'>
                <button className='onboarding_button_2'>
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
      <div className='onboarding_3'></div>
    </div>
  )
}

export default HomeContent