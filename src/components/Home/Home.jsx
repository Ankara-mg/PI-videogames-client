import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllVideogames } from '../../redux/actions.js';

//Components
import Loading from '../Loading/Loading.jsx';
import Cards from '../Cards/Cards.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Home = () => {

    const dispatch = useDispatch();

    const { videogames } = useSelector(state => state)
    const [games, setGames] = useState([]);
    
    useEffect(() => {
        dispatch(getAllVideogames())
    }, []);
 
    
    useEffect(() => {
        setGames(videogames)
    }, [videogames])
    

    return(
        <div>
            <div>
                <SearchBar />
                {
                    videogames.length > 0 ? 
                    <Cards videogames={videogames} />
                    : <Loading />
                }
            </div>
        </div>
    )
}

export default Home;