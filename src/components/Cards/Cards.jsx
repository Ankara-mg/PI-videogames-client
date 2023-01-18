import React from "react";
import { Link } from "react-router-dom";
import styles from './Cards.module.css';
import noGames from '../../img/no-juegos-2.png'

import GameCard from "../Game/GameCard";

const Cards = (props) => {
    
    const { videogames, errors } = props

    return (
        <div className={styles.cardsContainer}>
            {
                errors ? 
                <div className={styles.errors}>
                    <div>
                        <div>
                            <img src={noGames} alt={errors}/>
                        </div>
                    </div>
                </div>
                    :
                <div className={styles.cardsGrid}>
                    {
                        videogames?.map((game, key) => 
                        <Link to={`/videogames/${game.id}`} key={key}>
                            <GameCard videogames={game} />
                        </Link>
                        )
                    }
                
                </div>
            }
        </div>
    )

}

export default Cards