import React from "react";
import { Link } from "react-router-dom";

import GameCard from "../Game/GameCard";

const Cards = (props) => {
    
    const { videogames, errors } = props

    return (
        <div>
            {
                errors ? 
                <div>{errors}</div>
                :
                videogames.map((game, key) => 
                    <Link to={`/videogames/${game.id}`}>
                        <GameCard 
                            videogames={game} 
                            key={key} 
                        />
                    </Link>
                )
            }
        </div>
    )

}

export default Cards