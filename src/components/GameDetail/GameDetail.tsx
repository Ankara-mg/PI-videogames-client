import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import type { Genre } from "src/types";
import type { AppDispatch, RootState } from "@redux/store";
import { getOneVideogame } from "@redux/actions";

import styles from './GameDetail.module.css'
import Loading from "../Loading/Loading";

const GameDetail = () => {
  const { id: game_id } = useParams<{ id: string }>();
  const { videogame, loading } = useSelector((state: RootState) => state.videogames)
  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector(state => state)

  useEffect(() => {
    dispatch(getOneVideogame(game_id!));
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
                {Array.isArray(videogame.genres) &&
                  videogame.genres?.map((g: Genre, key: number) => (
                    <div className={styles.genres} key={key}>{g.name}</div>
                  )
                )}
              </div>
            </div>

            <div className={styles.detailCenter}>
              <div className={styles.detailLeft}>
                <img src={videogame.img} alt={videogame.name} className={styles.image} />
              </div>

              <div className={styles.detailRight}>
                <div className={styles.descContainer}>
                  <div dangerouslySetInnerHTML={{ __html: videogame.description }} />
                </div>
              </div>
            </div>

            <div className={styles.detailBottom}>
              <div>Release Date: {videogame.release}</div>
              <div>Rating - {videogame.rating} ⭐ </div>
              <div><br />Platforms:
                <div className={styles.platContainer}>
                  {
                    Array.isArray(videogame.platforms) &&
                    videogame.platforms?.map((p: string) => (
                      <p className={styles.platform} key={p}>{p}</p>
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
