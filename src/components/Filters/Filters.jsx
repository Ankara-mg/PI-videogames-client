import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogames, getAllVideogames, getGenres, resetErrors } from "../../redux/actions";

const Filters = (props) => {

    const { videogames } = props
    const { genres } = useSelector(state => state)
    const dispatch = useDispatch()

    const [selection, setSelection] = useState([])
    const [change, setChange] = useState(false)

    useEffect(() => {
        dispatch(getGenres())
    }, []);

    const handleSelect = (filter) => {
        setSelection([...selection, filter.target.value])
        setChange(true)
    }

    useEffect(() => {
        if(change == true){
            dispatch(filterVideogames(videogames, selection))
            if(selection.length == 0){
                dispatch(getAllVideogames())
                dispatch(resetErrors())
            }
        }
    },[selection])

    const removeItem = (gen) => {
        setSelection(
            selection.filter(g => g != gen)
        )
    }

    return(
        <div>
            <select name="filter" onChange={(sel) => handleSelect(sel)} >
                <option disabled selected>Filtrar por géneros</option>
                {
                    genres.map(g => {
                        return <option value={g.name} key={g.id}>{g.name}</option>
                    })
                }
            </select>
            {
                selection.map(g => {
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