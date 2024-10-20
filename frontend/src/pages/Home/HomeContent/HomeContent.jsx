
function HomeContent() {
  return (
    <div className='content pt-[80px]'>
      <div className='onboarding_1 flex'>
        <div className='w-3/5 px-[15px]'>
          <img src='../src/assets/onboarding_1_1.png' alt='Onboarding 1_1' />
        </div>
        <div className='w-2/5 px-[15px]'>
          <div className='text-center onboarding_text'>
            <p className='shadow-text'>Sưu tập Thẻ Siêu Quyền Năng</p>
            <p className='shadow-text'>Đổi quà siêu kun</p>
            <p className='shadow-text shadow-text-small'>Trong mỗi thùng KUN tươi vui 180ml</p>
            <p className='text-white mb-4'>Thời gian: 25/07 - 30/09/2021</p>
            <a href='#'>
              <button className='onboarding_button'>
                Sưu tập ngay
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeContent