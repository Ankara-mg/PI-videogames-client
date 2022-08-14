import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogames, getAllVideogames, getGenres, resetErrors, sortGames } from "../../redux/actions";

const Sorting = (props) => {

    const { games } = props
    const dispatch = useDispatch()

    const [ordenarPor, setOrdenarPor] = useState('')
    const [tipoOrden, setTipoOrden] = useState('ascending')
    const [disabled, setDisabled] = useState(true)
    const [change, setChange] = useState(false)

    const handleSelectOrden = (orden) => {
        setOrdenarPor(orden.target.value)
        setChange(true)
    }

    const handleSelectTipo = (tipo) => {
        setTipoOrden(tipo.target.value)
    }

    useEffect(() => {
        if(change == true){
            dispatch(sortGames(games, ordenarPor, tipoOrden))
        }

        console.log(ordenarPor, tipoOrden)
        if(ordenarPor === 'rating' || ordenarPor === 'name') 
            setDisabled(false)
        else
            setDisabled(true)
    },[ordenarPor, tipoOrden])

    return(
        <div>
            <select id="sort" onChange={(sel) => handleSelectOrden(sel)} >
                <option disabled selected>Ordenar por</option>
                <option value='rating'>Rating</option>
                <option value='name'>Nombre</option>
                <option value='default'>Por defecto</option>
            </select>

            <select id='asc-desc' disabled={disabled} onChange={(sel) => handleSelectTipo(sel)}>
                <option value='ascending'>Ascendente</option>
                <option value='descending'>Descendente</option>
            </select>
        </div>
    )
}

export default Sorting;
