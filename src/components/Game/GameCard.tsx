import type { GameType } from 'src/types';
import styles from './GameCard.module.css';

const GameCard = (props: { videogame: GameType }) => {

  const { videogame } = props

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImgContainer}>
        <img src={videogame.img} alt={videogame.name} className={styles.gameImg} />
      </div>

      <div className={styles.titleContain}>
        <div className={styles.title}>{videogame.name}</div>
      </div>

      <div className={styles.genresContainer}>
        <div>{videogame.genres?.map((g) => {
          return (
            <div className={styles.genre}>
              {typeof g === 'string' ? g : g.name}
            </div>
          )
        })}</div>
      </div>
      <div className={styles.rating}>Rating: {videogame.rating}</div>
    </div>
  )
}

export default GameCard;
