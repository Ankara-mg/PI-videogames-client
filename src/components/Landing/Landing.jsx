import React from "react";
import style from './Landing.module.css'
import { Link } from 'react-router-dom'
import piTitle from '../../img/pi-title.png'

const LandingPage = () => {

    return(
        <div className={style.container}>
            <img src={piTitle} alt='PI VIDEOGAMES' className={style.title}/>
            <Link to='/home'>
                <button className={style.glowOnHover}>INGRESAR</button>
            </Link>
        </div>
    )

}

export default LandingPage