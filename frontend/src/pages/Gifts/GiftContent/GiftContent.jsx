// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function GiftContent() {
  const listItems = Array.from({ length: 8 }, (_, i) => i + 1)
  const navigate = useNavigate()
  return (
    <>
      <div className='onboarding_3 py-[80px]'>
        <div className='title-wrapper text-center'>
          <p className='shadow-text font_iCiel_Crocante'>quà siêu kun</p>
        </div>
      </div>
      <div id='item-list' className='grid grid-cols-4 gap-8 mx-[100px] mb-[115px]'>
        {listItems.map((item) => (
          <div id={`item-${item}`} key={item} className='gift_card shadow'>
            <a href="" onClick={() => navigate(`/gifts/${item}`) }>
              <img className="gift_card_img" src="../src/assets/tuirut_tonghop.jpg" />
            </a>
            <div className='gift_card_body'>
              <a href="" onClick={() => navigate(`/gifts/${item}`) }>
                <p className='gift_title font_Quicksand'>Balo KUN dây rút</p>
                <p className='gift_price font_Baloo'>1 Thẻ Siêu Quyền Năng</p>
                <p className='gift_rating'>
                  <span className='fa fa-star'></span>
                  <span className='fa fa-star'></span>
                  <span className='fa fa-star'></span>
                  <span className='fa fa-star'></span>
                  <span className='fa fa-star'></span>
                </p>
                <button className='gift_detail_button font_Quicksand'>xem chi tiết</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default GiftContent