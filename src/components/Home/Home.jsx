import React , { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllVideogames } from '../../redux/actions.js';
import { Link } from 'react-router-dom';
import style from './Home.module.css';

//Components
import Loading from '../Loading/Loading.jsx';
import Cards from '../Cards/Cards.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Filters from '../Filters/Filters.jsx';
import Sorting from '../Sorting/Sorting.jsx';
import Pagination from '../Pagination/Pagination.jsx';

const Home = () => {

    const dispatch = useDispatch();

    const { allVideogames, filterGames, errors } = useSelector(state => state)
    const [games, setGames] = useState([]);
    const { loading } = useSelector(state => state)
    
    useEffect(() => {
        dispatch(getAllVideogames())
    }, []);
 
    
    useEffect(() => {
        setGames(filterGames)
        setCurrentPage(1)
    }, [filterGames])

    console.log('filtergames',filterGames)
    console.log('videogames', allVideogames)

    // --------------- PAGINATION

    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState(15)

    const indiceUltimaCard = currentPage * cardsPerPage
    const indicePrimerCard = indiceUltimaCard - cardsPerPage
    const currentCards = games.slice(indicePrimerCard, indiceUltimaCard)

    const cambiarPage = (pageNum) => {
        setCurrentPage(pageNum)
    }

    return(
        <div className={style.container}>
            <div>
                {
                    loading ? 
                    <Loading /> :
                    <div>
                        <SearchBar />
                        <Link to='/videogame/create'> <button className={style.createBtn} >CREAR</button> </Link>
                        <Sorting games={filterGames} />
                        <Filters videogames={allVideogames}/>
                        <Pagination cardsPerPage={cardsPerPage} totalCards={!errors && filterGames.length} cambiarPage={cambiarPage} />
                        <Cards videogames={currentCards} errors={errors} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;