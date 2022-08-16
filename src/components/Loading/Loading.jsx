import React from "react";
import style from './Loading.module.css';
import loadingGif from '../../img/loading.gif'

const Loading = () => {
    return(
        <div className={style.loading}>
            <img src={loadingGif} />
            <div>Cargando Videojuegos...</div>
        </div>
    )
}

export default Loading;