import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames, searchGames } from "../../redux/actions";

const SearchBar = () => {

    const [search, setSearch] = useState("");
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(searchGames(search))
    }

    const resetSearch = () => {
        dispatch(getAllVideogames())
        setSearch("")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre del Videojuego..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
            <button onClick={resetSearch}>Reiniciar</button>
        </div>
    )
}

export default SearchBar;