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

    return(
        <div>
            <div>
                {
                    loading ? 
                    <Loading /> :
                    <div>
                        <SearchBar />
                        <Sorting games={filterGames} />
                        <Link to='/videogame/create'> <button>CREAR VIDEOJUEGO</button> </Link>
                        <Filters videogames={allVideogames}/>
                        <Cards videogames={games} errors={errors} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;