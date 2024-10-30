function GiftContent() {
  return (
    <div className='content pt-[80px]'>
      <div className='onboarding_3 pb-[80px]'>
        <div className='title-wrapper text-center'>
          <p className='shadow-text'>quà siêu kun</p>
        </div>
      </div>
      <div id='item-list' className='flex mx-[100px] mb-[115px]'></div>
      <div className='text-center div-not-login px-[15px]'>
        <h4 className='text-2xl font-medium mb-2]'>Bạn chưa đăng nhập, hãy đăng nhập ngay để xem các phần quà nhé !</h4>
        <button className='onboarding_button_2 text-white bg-[#00AAEC] p-[10px_50px]'>Đăng nhập</button>
      </div>
    </div>
  )
}

export default GiftContent