import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterVideogames, getFromDb, resetErrors } from "@redux/actions";
import styles from './Filters.module.css';
import type { GameType, Genre } from "src/types";
import type { AppDispatch } from "@redux/store";

const Filters = (props: { videogames: GameType[], genres: Genre[] }) => {

  const { videogames, genres } = props
  const dispatch = useDispatch<AppDispatch>()

  const [genSelection, setGenSelection] = useState<string[]>([])
  const [dbSelection, setDbSelection] = useState<string>('allGames')
  const [change, setChange] = useState<boolean>(false)

  const handleSelectGen = (filter: React.ChangeEvent<HTMLSelectElement>) => {
    setGenSelection([...genSelection, filter.target.value])
    setChange(true)
  }

  const handleSelect = (filter: React.ChangeEvent<HTMLSelectElement>) => {
    setDbSelection(filter.target.value)
    setChange(true)
  }

  useEffect(() => {
    if (change == true) {
      dispatch(filterVideogames(videogames, genSelection, dbSelection))
      if (genSelection.length == 0) {
        dispatch(getFromDb(videogames, dbSelection))
        dispatch(resetErrors())
      }
    }
  }, [genSelection])

  useEffect(() => {
    if (change === true) {
      dispatch(getFromDb(videogames, dbSelection))
    }
  }, [dbSelection])

  const removeItem = (gen: string) => {
    setGenSelection(
      genSelection.filter(g => g != gen)
    )
  }

  return (
    <div className={styles.container}>

      <div className={styles.selectContainer}>
        <select name="db" onChange={handleSelect} className={styles.select}>
          <option disabled selected>Filtrar por ...</option>
          <option value='dbGames'>Juegos creados</option>
          <option value='apiGames'>Juegos de la API</option>
          <option value='allGames'>Todos los juegos</option>
        </select>


        <select name="filter" onChange={handleSelectGen} className={styles.select} >
          <option disabled selected>Géneros</option>
          {
            genres.map(g => {
              return <option value={g.name} key={g.id}>{g.name}</option>
            })
          }
        </select>
      </div>

      <div className={styles.genresContainer}>
        {
          genSelection.map(g => {
            return (
              <div className={styles.genreTag}>
                {g}
                <button type="button" onClick={() => removeItem(g)} className={styles.genButton} >X</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Filters;