import React from 'react';
import styles from './GameCard.module.css';

const GameCard = (props) => {
    
    const { videogames } = props

    return(
        <div className={styles.cardContainer}>
            <div>{videogames.name}</div>
            <img src={videogames.img} alt={videogames.name} className={styles.gameImg} />
            <div>GENRES: {videogames.genres.map(g => {
                return <div className={styles.genre}>{g}</div>
            })}</div>
        </div>
    )
}

export default GameCard;

/*
    Imagen
    Nombre
    Géneros
*/