import { Link } from "react-router-dom";

import styles from './Cards.module.css';
import noGames from '@images/no-juegos-2.png'
import GameCard from "../Game/GameCard";

import type { GameType } from "src/types";

const Cards = (props: { videogames: GameType[], errors: string }) => {

  const { videogames, errors } = props

  return (
    <div className={styles.cardsContainer}>
      {
        errors ?
          <div className={styles.errors}>
            <div>
              <div>
                <img src={noGames} alt={errors} />
              </div>
            </div>
          </div>
          :
          <div className={styles.cardsGrid}>
            {
              videogames?.map((game: GameType, key: number) =>
                <Link to={`/videogames/${game.id}`} key={key}>
                  <GameCard videogame={game} />
                </Link>
              )
            }

          </div>
      }
    </div>
  )

}

export default Cards