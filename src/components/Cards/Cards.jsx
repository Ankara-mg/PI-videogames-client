import React from "react";

import GameCard from "../Game/GameCard";

const Cards = (props) => {
    
    const { videogames } = props

    return (
        <div>
            {
                videogames.map((game, key) => 
                    <GameCard 
                        videogames={game} 
                        key={key} 
                    />
                )
            }
        </div>
    )

}

export default Cards