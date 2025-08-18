import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './Home.module.css';
import { getAllVideogames, getGenres } from '@redux/actions';
import type { AppDispatch, RootState } from '@redux/store';
import type { GameType } from 'src/types';

//Components
import Loading from '@components/Loading/Loading';
import Cards from '@components/Cards/Cards';
import SearchBar from '@components/SearchBar/SearchBar';
import Filters from '@components/Filters/Filters';
import Sorting from '@components/Sorting/Sorting';
import Pagination from '@components/Pagination/Pagination';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allVideogames, filterGames, errors, genres, loading } = useSelector((state: RootState) => state.videogames);
  const [games, setGames] = useState<GameType[]>([]);

  useEffect(() => {
    dispatch(getAllVideogames())
    dispatch(getGenres())
  }, []);

  useEffect(() => {
    setGames(filterGames)
    return setCurrentPage(1) //desmontar
  }, [filterGames])

  // --------------- PAGINATION ---------------------

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [cardsPerPage, setCardsPerPage] = useState<number>(15)

  const indiceUltimaCard: number = currentPage * cardsPerPage
  const indicePrimerCard: number = indiceUltimaCard - cardsPerPage
  const currentCards: GameType[] = games.slice(indicePrimerCard, indiceUltimaCard)

  const cambiarPage = (pageNum: number) => {
    setCurrentPage(pageNum)
  }

  return (
    <div className={style.container}>
      <div>
        {
          loading ?
            <Loading /> :
            <div>
              {
                (filterGames && filterGames.length > 0) ?
                  <>
                    <SearchBar />
                    <Link to='/videogame/create'> <button className={style.createBtn} >CREAR</button> </Link>
                    <Sorting games={filterGames} />
                    <Filters videogames={allVideogames} genres={genres} />
                    <Pagination cardsPerPage={cardsPerPage} totalCards={!errors && filterGames.length} cambiarPage={cambiarPage} />
                    <Cards videogames={currentCards} errors={errors} />
                  </>
                  :
                  <Loading />
              }
            </div>
        }
      </div>
    </div>
  )
}

export default Home;