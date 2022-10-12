import React from 'react';
import styles from './GameCard.module.css';

const GameCard = (props) => {
    
    const { videogames } = props

    return(
        <div className={styles.cardContainer}>
            <div className={styles.cardImgContainer}>
               <img src={videogames.img} alt={videogames.name} className={styles.gameImg} />
            </div>

            <div className={styles.titleContain}>
                <div className={styles.title}>{videogames.name}</div>
            </div>

            <div className={styles.genresContainer}>
                <div>{videogames.genres.map(g => {
                    return <div className={styles.genre}>{g.name}</div>
                })}</div>
            </div>
            <div className={styles.rating}>Rating: {videogames.rating}</div>
        </div>
    )
}

export default GameCard;

/*
    Imagen
    Nombre
    Géneros
*/