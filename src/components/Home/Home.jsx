import React , { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllVideogames } from '../../redux/actions.js';
import { Link } from 'react-router-dom';

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
    }, [filterGames])

    console.log('filtergames',filterGames)
    console.log('videogames', allVideogames)

    // --------------- PAGINATION

    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState(3)

    const indiceUltimaCard = currentPage * cardsPerPage
    const indicePrimerCard = indiceUltimaCard - cardsPerPage
    const currentCards = games.slice(indicePrimerCard, indiceUltimaCard)

    const cambiarPage = (pageNum) => {
        setCurrentPage(pageNum)
    }

    return(
        <div>
            <div>
                {
                    loading ? 
                    <Loading /> :
                    <div>
                        <Link to='/videogame/create'> <button>CREAR VIDEOJUEGO</button> </Link>
                        <SearchBar />
                        <Sorting games={filterGames} />
                        <Filters videogames={allVideogames}/>
                        <Cards videogames={currentCards} errors={errors} />
                        <Pagination cardsPerPage={cardsPerPage} totalCards={filterGames.length} cambiarPage={cambiarPage} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;