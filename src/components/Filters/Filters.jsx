import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogames, getFromDb, getAllVideogames, getGenres, resetErrors } from "../../redux/actions";
import styles from './Filters.module.css';

const Filters = (props) => {

    const { videogames } = props
    const { genres } = useSelector(state => state)
    const dispatch = useDispatch()

    const [genSelection, setGenSelection] = useState([])
    const [dbSelection, setDbSelection] = useState('allGames')
    const [change, setChange] = useState(false)

    useEffect(() => {
        dispatch(getGenres())
    }, []);

    const handleSelectGen = (filter) => {
        setGenSelection([...genSelection, filter.target.value])
        setChange(true)
    }

    const handleSelect = (filter) => {
        setDbSelection(filter.target.value)
        setChange(true)
    }

    useEffect(() => {
        if(change == true){
            dispatch(filterVideogames(videogames, genSelection))
            if(genSelection.length == 0){
                dispatch(getFromDb(videogames, dbSelection))
                dispatch(resetErrors())
            }
        }
    },[genSelection])

    useEffect(() => {
        if(change === true){
            dispatch(getFromDb(videogames, dbSelection))
        }
    }, [dbSelection])

    const removeItem = (gen) => {
        setGenSelection(
            genSelection.filter(g => g != gen)
        )
    }

    console.log(dbSelection)

    return(
        <div className={styles.container}>

            <div className={styles.selectContainer}>
                <select name="db" onChange={(sel) => handleSelect(sel)} className={styles.select}>
                    <option disabled selected>Filtrar por ...</option>
                    <option value='dbGames'>Juegos creados</option>
                    <option value='apiGames'>Juegos de la API</option>
                    <option value='allGames'>Todos los juegos</option>
                </select>


                <select name="filter" onChange={(sel) => handleSelectGen(sel)} className={styles.select} >
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
                        return(
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