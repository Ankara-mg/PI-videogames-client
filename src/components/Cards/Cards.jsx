import React from "react";
import { Link } from "react-router-dom";
import styles from './Cards.module.css';

import GameCard from "../Game/GameCard";

const Cards = (props) => {
    
    const { videogames, errors } = props

    return (
        <div className={styles.cardsContainer}>
            <div className={styles.cardsGrid}>
                {
                    errors ? 
                    <div>{errors}</div>
                    :
                    videogames.map((game, key) => 
                    <Link to={`/videogames/${game.id}`}>
                        <GameCard videogames={game} key={key} />
                    </Link>
                    )
                }
            </div>
        </div>
    )

}

export default Cards