import Image from 'next/image'
import css from '../styles/Hero.module.css'
import Cherry from '../assets/Cherry.png'
import HeroImage from '../assets/HeroImage.png'
import Pizza from '../assets/p1.jpg'
import { UilPhoneAlt } from '@iconscout/react-unicons'

export default function Hero () {

    return(
        <div className={css.container}>
            {/* left side */}
            <div className={css.left}>
                <div className={css.cherryDiv}>
                    <span>More Then Faster</span>
                    <Image  src={Cherry} alt='cherry' width={40} height={25} />
                </div>
                <div className={css.heroText}>
                    <span>Be The Faster</span>
                    <span>In Delivering</span>
                    <span>
                        Your <span style={{color:"var(--themeRed)"}}>Pizza</span>   
                    </span>
                </div>
                <span className={css.miniText}>
                    Our Mission is to filling your tummy 
                    delicious food and with fast and free delviery
                </span>
                <bttoun className={`btn ${css.btn}`}>
                    Get Started
                </bttoun>
            </div>
            
            
            {/* right side */}
            <div className={css.right}>
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="heroImage" layout="intrinsic" />
                </div>

                <div className={css.ContactUs}>
                    <span>Conatct us</span>
                    <div>
                        <UilPhoneAlt color="white"/>
                    </div>
                </div>

                <div className={css.Pizza}>
                    <div>
                        <Image src={Pizza} alt="heroImage" objectFit='cover' layout="intrinsic"/>
                    </div>
                    <div className={css.details}>
                        <span>Italian Pizza</span>
                        <span> <span style={{color:"var(--themeRed)"}}> $</span> 7.49</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
