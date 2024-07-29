import Image from 'next/image'
import style from './splashImg.module.css'
import firstImage from './png/firstImage.png'
import secondImage from './png/secondImage.png'
import thirdImage from './png/thirdImage.png'
import firstDot from './png/firstDot.png'
import secondDot from './png/secondDot.png'
import thirdDot from './png/thirdDot.png'

export default function SplashPage() {
  return (
    <div className={`${style.slide}`}>
      <div className={`${style.wrapper}`}>
        <Image src={firstDot} alt="firstDot" className={`${style.dot}`}></Image>
        <h2 className={`${style.text}`}>
          실제 사례를 학습하여 <br></br>
          <b>피싱 피해를 방지해요</b>
        </h2>
        <Image
          src={firstImage}
          alt="first"
          className={`${style.image}`}
        ></Image>
      </div>
      <div className={`${style.wrapper}`}>
        <Image
          src={secondDot}
          alt="secondDot"
          className={`${style.dot}`}
        ></Image>
        <h2 className={`${style.text}`}>
          AI로 실전 피싱 대응을 <br></br>
          <b>연습할 수 있어요</b>
        </h2>
        <Image
          src={secondImage}
          alt="second"
          className={`${style.image}`}
        ></Image>
      </div>
      <div className={`${style.wrapper}`}>
        <Image src={thirdDot} alt="thirdDot" className={`${style.dot}`}></Image>
        <h2 className={`${style.text}`}>
          AI 피드백으로 피싱<br></br> <b>대응 능력을 향상시켜요</b>
        </h2>
        <Image
          src={thirdImage}
          alt="third"
          className={`${style.image}`}
        ></Image>
      </div>
    </div>
  )
}
