import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenres, createVideogame, getAllVideogames } from "../../redux/actions";

const CreateGame = () => {
    
    /// -------------------- CONSTANTES --------------------------

    const platforms = ["PC","PlayStation 5","Xbox One","PlayStation 4","Xbox Series S/X","Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo"]
    
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const genres = useSelector(state => state.genres)
    const allGames = useSelector(state => state.videogames)  
    
    const [input, setInput] = useState({
        name: '',
        description: '',
        releaseDate: '',
        rating: '',
        platforms: [],
        genres: [],
        created: true,
    })
    

    // ---------------- FUNCIONES --------------------

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getAllVideogames())
    }, [dispatch]); 
    
    const handleInputChange = function(e) {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleSelect = function(e) {
        e.preventDefault()

        if(input[e.target.name].indexOf(e.target.value) == -1){
            setInput({
                ...input,
                [e.target.name]: [...input[e.target.name], e.target.value]
            });
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
    }
    
    const removeItem = function(e) {
        
        setInput({
            ...input,
            platforms: input.platforms.filter(plat => plat != e),
            genres: input.genres.filter(gen => gen != e)
        })
        setErrors(validate({
            ...input,
            platforms: input.platforms,
            genres: input.genres
        }))
        
    }

    //------------- SUBMIT -----------------------------

    const handleSubmit = function(e) {
        e.preventDefault()

        console.log(allGames)
        if(allGames.filter(n => n.name === input.name).length > 0){
            alert('Ya existe un videojuego con ese nombre.')
        } else {
            if(Object.keys(errors).length !== 0   ||   input.genres.length < 1    ||    input.platforms.length < 1){
                alert('Complete todos los campos correctamente')
            } else {
                dispatch(createVideogame(input))
                alert('El juego fue creado con éxito')
            }
        }
    }

    console.log('errores', errors)

    //----------- VALIDAR ERRORES ----------------------

    const validate = (input) => {
        let errors = {};
        let RegExpression = /^[a-zA-Z0-9_¿?¡! .-]*$/
    
        if(!input.name) {
            errors.name = 'Nombre requerido.'
        } else if(!RegExpression.test(input.nombre)){
            errors.name = 'Este nombre es inválido'
        } else if(input.name.length > 20){
            errors.name = 'El nombre solo puede tener un máximo de 20 caracteres'
        }
    
        if(!input.description){
            errors.description = 'Se requiere una descripción.'
        } else if(input.description.length > 500){
            errors.description = 'La descripción es demasiado larga.'
        }

        if(input.genres < 1){
            errors.genres = 'Seleccione por lo menos un género'
        }

        if(input.platforms < 1){
            errors.platforms = 'Seleccione por lo menos una plataforma'
        }

        if(!input.releaseDate){
            errors.releaseDate = 'Seleccione la fecha de lanzamiento'
        }
    
        return errors
    }
    
    // -------------- FORMULARIO -----------------

    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input 
                        type="text" 
                        name='name' 
                        value={input.name} 
                        onChange={handleInputChange} 
                    />
                    { errors.name && (<p>{errors.name}</p>) }
                </div>

                <div>
                    <label>Descripción: </label>
                    <textarea 
                        name='description' 
                        value={input.description} 
                        onChange={handleInputChange} 
                    />
                    { errors.description && <p>{errors.description}</p> }
                </div>

                <div>
                    <label>Fecha de Lanzamiento:</label>
                    <input 
                        type="date" 
                        name='releaseDate' 
                        value={input.releaseDate} 
                        onChange={handleInputChange} 
                        placeholder='dd-mm-yyyy'
                    />
                    { errors.releaseDate && <p>{errors.releaseDate}</p> }
                </div>

                <div>
                    <label>Plataformas: </label>
                    <select name='platforms' onChange={(selection) => handleSelect(selection)}>
                        <option disabled selected>Seleccione los géneros</option>
                        {
                            platforms.map( p => (
                                <option value={p}>
                                    {p}
                                </option>
                            ))}
                    </select>
                    { input.platforms.map(p => {
                        return (
                            <div>
                                {p}
                                <button type="button" onClick={() => removeItem(p)}>X</button>
                            </div>)
                    }   )}
                    { errors.platforms && <p>{errors.platforms}</p> }
                </div>

                <div>
                    <label>Géneros: </label>
                    <select name="genres" onChange={(selection) => handleSelect(selection)}>
                        <option disabled selected>Seleccione los géneros</option>
                        {
                            genres.map(g => (
                                <option value={g.name} key={g.id}>
                                    {g.name}
                                </option>
                            ))
                        }
                    </select>
                    {input.genres.map(g => {
                        return(
                            <div>
                                {g}
                                <button type="button" onClick={() => removeItem(g)}>X</button>
                            </div>
                        )
                    })}
                    {errors.genres && <p>{errors.genres}</p>}
                </div>

                <div>
                    <label>Rating: </label>
                    <input 
                        type="number"
                        step="0.01"
                        max='5' 
                        min='1'
                        name="rating"
                        value={input.rating}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <button type="submit">CREAR</button>
                    <Link to='/home'><button>Volver</button></Link>
                </div>
            </form>
        </div>
    )

}

export default CreateGame;
