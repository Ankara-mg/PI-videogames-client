import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames, searchGames } from "../../redux/actions";

import styles from './SearchBar.module.css';

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
        <form onSubmit={handleSubmit} className={styles.container}>
            <input 
                className={styles.searchInput}
                type="text" 
                placeholder="Nombre del Videojuego..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className={styles.searchButtons} type="submit">Buscar</button>
            <button className={styles.searchButtons} type="button" onClick={resetSearch}>Reiniciar</button>
        </form>
    )
}

export default SearchBar;