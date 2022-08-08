import React from 'react';

const GameCard = (props) => {
    
    const { videogames } = props

    return(
        <div>
            <div>NAMES: {videogames.name}</div>
            <div>RATING: {videogames.rating}</div>
            <div>ID: {videogames.id}</div>
            <div>GENRES: {videogames.genres.map(g => g)}</div>
            <div>PLATFORMS: {videogames.platforms.map(p => p)}</div>
        </div>
    )
}

export default GameCard;