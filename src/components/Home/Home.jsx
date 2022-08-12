import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllVideogames } from '../../redux/actions.js';

//Components
import Loading from '../Loading/Loading.jsx';
import Cards from '../Cards/Cards.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Filters from '../Filters/Filters.jsx';

const Home = () => {

    const dispatch = useDispatch();

    const { videogames, filterGames, errors } = useSelector(state => state)
    const [games, setGames] = useState([]);
    const { loading } = useSelector(state => state)
    
    useEffect(() => {
        dispatch(getAllVideogames())
    }, []);
 
    
    useEffect(() => {
        setGames(filterGames)
    }, [filterGames])

    console.log(filterGames.length)

    return(
        <div>
            <div>
                {
                    loading ? 
                    <Loading /> :
                    <div>
                        <SearchBar />
                        <Filters videogames={videogames}/>
                        <Cards videogames={games} errors={errors} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Home;