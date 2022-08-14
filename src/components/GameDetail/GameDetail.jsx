import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneVideogame } from "../../redux/actions";
import { Link } from "react-router-dom";

import Loading from "../Loading/Loading";

const GameDetail = (props) => {

    const videogame = useSelector(state => state.videogame)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneVideogame(props.match.params.id))
    }, [])


    return (
        <div>
            {
                videogame ?
                    <div>
                        <div>Name: {videogame.name}</div>
                        <div dangerouslySetInnerHTML={{__html: videogame.description}} />;
                        <img src={videogame.img} alt={videogame.name} />
                    </div>
                : 
                    <Loading />
            }
            <Link to='/home'>Regresar</Link>
        </div>
    )

}

export default GameDetail;

/**
 * 
 * [ ] Los campos mostrados en la ruta principal para cada videojuegos 
 * (imagen, nombre, y géneros)
    [ ] Descripción
    [ ] Fecha de lanzamiento
    [ ] Rating
    [ ] Plataformas
 */