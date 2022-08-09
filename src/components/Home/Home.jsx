import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllVideogames } from '../../redux/actions.js';

//Components
import GameCard from '../Game/GameCard.jsx';
import Loading from '../Loading/Loading.jsx';

const Home = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state)
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
                {
                    state.videogames.length > 0 ? (
                        state.videogames.map((game, key) => 
                            <GameCard 
                                videogames={game} 
                                key={key} 
                            />
                    ))
                        : <Loading />
                }
            </div>
        </div>
    )
}

export default Home;