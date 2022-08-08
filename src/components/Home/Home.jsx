import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllVideogames } from '../../redux/actions.js';

import GameCard from '../Game/GameCard.jsx';

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
            ESTOY EN EL HOME

            <div>
            {state.videogames.length > 0 && state.videogames[0] !== undefined ? (
                state.videogames.map((game, key) => 
                    <GameCard videogames={game} key={key} />
                ))
                    : <div>NO HAY JUEGOS</div>
            }
            </div>

        </div>
    )
}

export default Home;