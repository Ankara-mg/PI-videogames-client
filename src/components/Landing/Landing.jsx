import React from "react";
import style from './Landing.module.css'
import { Link } from 'react-router-dom'

const LandingPage = () => {

    return(
        <div className={style.container}>
            <Link to='/home'>
                <button className={style.landing_btn}>INGRESAR</button>
            </Link>
        </div>
    )

}

export default LandingPage