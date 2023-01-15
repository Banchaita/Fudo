import Image from 'next/image'
import css from '../styles/Footer.module.css'
import Logo from '../assets/Logo.png'

import { UilFacebook } from '@iconscout/react-unicons'
import { UilGithub } from '@iconscout/react-unicons'
import { UilInstagramAlt } from '@iconscout/react-unicons'

export default function Footer () {
    return(
        <div className={css.contanier}>
            <span>ALL RIGHT RESERVED</span>
            <div className={css.social}>
                <UilFacebook size={45}/>
                <UilGithub size={45}/>
                <UilInstagramAlt size={45}/>
            </div>
            <div className={css.logo}>
                <Image src={Logo} alt='logo' width={50} height={50} />
                <span>Fudo</span>
            </div>
        </div>
    )
    
}
