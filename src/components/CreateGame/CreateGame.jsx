import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenres, createVideogame, getAllVideogames } from "../../redux/actions";
import styles from './CreateGame.module.css';
import formtitle from '../../img/form2.png'

const CreateGame = () => {
    
    /// -------------------- CONSTANTES --------------------------

    const platforms = ["PC","PlayStation 5","Xbox One","PlayStation 4","Xbox Series S/X","Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo"]
    
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const genres = useSelector(state => state.genres)
    const allGames = useSelector(state => state.allVideogames)  
    
    const [input, setInput] = useState({
        name: undefined,
        description: undefined,
        releaseDate: undefined,
        rating: undefined,
        img: undefined,
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

        if(allGames.filter(n => n.name === input.name).length > 0){
            alert('Ya existe un videojuego con ese nombre.')
        } else {
            if(Object.keys(errors).length !== 0   ||   input.genres.length < 1    ||    input.platforms.length < 1){
                alert('Complete todos los campos correctamente')
            } else {
                dispatch(createVideogame(input))
            }
        }
    }

    //----------- VALIDAR ERRORES ----------------------

    const validate = (input) => {
        let errors = {};
        let RegExpression = /^[a-zA-Z0-9_¿?¡! .-]*$/
        let RegExpressionImg = /https?:\/\/.*\.(?:png|jpg)/
    
        if(!input.name) {
            errors.name = 'Nombre requerido.'
        } else if(!RegExpression.test(input.name)){
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
    
        if( input.img && !RegExpressionImg.test(input.img)){
            errors.img = 'Link invalido'
        }
        return errors
    }
    
    // -------------- FORMULARIO -----------------

    return(
        <div className={styles.container}>
            <h1 className={styles.formTitle}>
                <img src={formtitle} alt='CREA TU VIDEOJUEGO' />
            </h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={styles.formSection}>
                    <label>Nombre: </label>
                    <input 
                        type="text" 
                        name='name' 
                        value={input.name} 
                        onChange={handleInputChange} 
                        className={styles.input}
                    />
                    { errors.name && (<p className={styles.formErrors}>{errors.name}</p>) }
                </div>

                <div className={styles.formSection}>
                    <label>Imagen</label>
                    <input 
                        type="text" 
                        value={input.img} 
                        name='img' 
                        onChange={handleInputChange} 
                        className={styles.input}
                    />
                    {!errors.img && <img src={input.img} className={input.img && styles.formImage} />}
                    { errors.img && <p className={styles.formErrors}>{errors.img}</p> }
                </div>

                <div className={styles.formSection}>
                    <label>Descripción: </label>
                    <textarea 
                        name='description'
                        value={input.description}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    { errors.description && <p className={styles.formErrors}>{errors.description}</p> }
                </div>

                <div className={styles.formSection}>
                    <label>Fecha de Lanzamiento:</label>
                    <input 
                        type="date" 
                        name='releaseDate' 
                        value={input.releaseDate} 
                        onChange={handleInputChange} 
                        placeholder='dd-mm-yyyy'
                        className={styles.input}
                    />
                    { errors.releaseDate && <p className={styles.formErrors}>{errors.releaseDate}</p> }
                </div>

                <div className={styles.formSection}>
                    <label>Plataformas: </label>
                    <select 
                        name='platforms' 
                        onChange={(selection) => handleSelect(selection)}
                        className={styles.input}
                    >
                        <option disabled selected>Seleccione las plataformas</option>
                        {
                            platforms.map( p => (
                                <option value={p}>
                                    {p}
                                </option>
                            ))}
                    </select>
                    { input.platforms.map(p => {
                        return (
                            <div >
                                {p}
                                <button className={styles.removeButton} type="button" onClick={() => removeItem(p)}>X</button>
                            </div>)
                    }   )}
                    { errors.platforms && <p className={styles.formErrors}>{errors.platforms}</p> }
                </div>

                <div className={styles.formSection}>
                    <label>Géneros: </label>
                    <select 
                        name="genres" 
                        onChange={(selection) => handleSelect(selection)}
                        className={styles.input}    
                    >
                        <option disabled selected>Seleccione los géneros</option>
                        {
                            genres.map(g => (
                                <option value={g.name} key={g.id}
                                    className={styles.tag}>
                                    {g.name}
                                </option>
                            ))
                        }
                    </select>
                    {input.genres.map(g => {
                        return(
                            <div>
                                {g}
                                <button className={styles.removeButton} type="button" onClick={() => removeItem(g)}>X</button>
                            </div>
                        )
                    })}
                    {errors.genres && <p className={styles.formErrors}>{errors.genres}</p>}
                </div>

                <div className={styles.formSection}>
                    <label>Rating: </label>
                    <input 
                        type="number"
                        step="0.01"
                        max='5' 
                        min='1'
                        name="rating"
                        value={input.rating}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formButtons}>
                    <button type="submit" className={styles.submitBtn}>CREAR</button>
                    <Link to='/home'><button className={styles.submitBtn}>Volver</button></Link>
                </div>
            </form>
        </div>
    )

}

export default CreateGame;
