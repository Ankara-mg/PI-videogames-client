import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogames, getFromDb, getAllVideogames, getGenres, resetErrors } from "../../redux/actions";

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
                dispatch(getAllVideogames())
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
        <div>

            <select name="db" onChange={(sel) => handleSelect(sel)}>
                <option disabled selected>Filtrar por ...</option>
                <option value='dbGames'>Juegos creados</option>
                <option value='apiGames'>Juegos de la API</option>
                <option value='allGames'>Todos los juegos</option>
            </select>


            <select name="filter" onChange={(sel) => handleSelectGen(sel)} >
                <option disabled selected>Géneros</option>
                {
                    genres.map(g => {
                        return <option value={g.name} key={g.id}>{g.name}</option>
                    })
                }
            </select>
            {
                genSelection.map(g => {
                    return(
                        <div>
                            {g}
                            <button type="button" onClick={() => removeItem(g)} >X</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Filters;