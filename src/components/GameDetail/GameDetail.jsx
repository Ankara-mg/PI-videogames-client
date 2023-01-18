import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneVideogame } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from './GameDetail.module.css'

import Loading from "../Loading/Loading";

const GameDetail = (props) => {

    const videogame = useSelector(state => state.videogame)
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state)
    
    console.log(videogame)
    
    useEffect(() => {
        dispatch(getOneVideogame(props.match.params.id))
    }, [])

    return (
        <div className={styles.container}>
            {
                loading ?
                <Loading /> :
                <div className={styles.dataContainer}>
                        <div className={styles.titleContainer}>
                            <div className={styles.gameTitle}>{videogame.name}</div>
                            
                            <div className={styles.genresContainer}>
                                { Array.isArray(videogame.genres) &&
                                    videogame.genres?.map(g => {
                                        return(
                                            <div className={styles.genres}>{g.name}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className={styles.detailCenter}>
                            <div className={styles.detailLeft}>
                                <img src={videogame.img} alt={videogame.name} className={styles.image} />
                            </div>

                            <div className={styles.detailRight}>
                                <div className={styles.descContainer}>
                                    <div dangerouslySetInnerHTML={{__html: videogame.description}} />
                                </div>
                                
                            </div>
                        </div>

                        <div className={styles.detailBottom}>
                            <div>Release Date: {videogame.release}</div>
                            <div>Rating - {videogame.rating} ⭐ </div>
                            <div><br/>Platforms:
                            <div className={styles.platContainer}>
                                    {
                                        Array.isArray(videogame.platforms) &&
                                        videogame.platforms?.map(p => (
                                            <p className={styles.platform}>{p}</p>
                                        ))
                                    }
                                </div>
                            </div>
                            <Link to='/home'><button className={styles.detailBtn}>HOME</button></Link>
                        </div>
                    </div>
            }
        </div>
    )

}

export default GameDetail;

/**
 * 

    [ ] Rating
    [ ] Plataformas
 */