import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from './SearchBar.module.css';
import { getAllVideogames, searchGames } from "@redux/actions";
import type { AppDispatch } from "@redux/store";

const SearchBar = () => {

  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(searchGames(search))
  }

  const resetSearch = () => {
    dispatch(getAllVideogames())
    setSearch("")
  }

  return (
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