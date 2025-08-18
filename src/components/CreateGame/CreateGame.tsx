import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import formtitle from '@images/form2.png'
import styles from './CreateGame.module.css';

import { getGenres, createVideogame, getAllVideogames } from "@redux/actions";
import type { AppDispatch, RootState } from "@redux/store";
import type { DbGame, FormErrors, GameType, Genre } from "src/types";

const CreateGame = () => {

  /// -------------------- CONSTANTES --------------------------

  const platforms: string[] = ["PC", "PlayStation 5", "Xbox One", "PlayStation 4", "Xbox Series S/X", "Nintendo Switch", "iOS", "Android", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "macOS", "Linux", "Xbox 360", "Xbox", "PlayStation 3", "PlayStation 2", "PlayStation", "PS Vita", "PSP", "Wii U", "Wii", "GameCube", "Nintendo 64", "Game Boy Advance", "Game Boy Color", "Game Boy", "SNES", "NES", "Classic Macintosh", "Apple II", "Commodore / Amiga", "Atari 7800", "Atari 5200", "Atari 2600", "Atari Flashback", "Atari 8-bit", "Atari ST", "Atari Lynx", "Atari XEGS", "Genesis", "SEGA Saturn", "SEGA CD", "SEGA 32X", "SEGA Master System", "Dreamcast", "3DO", "Jaguar", "Game Gear", "Neo Geo"]

  const dispatch = useDispatch<AppDispatch>()
  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)
  const genres = useSelector((state: RootState) => state.videogames.genres)
  const allGames = useSelector((state: RootState) => state.videogames.allVideogames)

  const [input, setInput] = useState<DbGame>({
    name: '',
    description: '',
    release: '',
    rating: 1,
    img: '',
    platforms: [],
    genres: [],
    created: true,
  })


  // ---------------- FUNCIONES --------------------

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getAllVideogames())
  }, [dispatch]);

  const handleInputChange = function (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const name = e.target.name as keyof DbGame;
    const value = e.target.value;
    const saved = input[name];
    
    if (Array.isArray(saved) && name.indexOf(value) == -1) {
      setInput({
        ...input,
        [e.target.name]: [...saved, value]
      });
      setErrors(validate({
        ...input,
        [e.target.name]: value
      }))
    }
  }


  const removeItem = (itemToRemove: string) => {
    setInput({
      ...input,
      platforms: input.platforms.filter(plat => plat !== itemToRemove),
      genres: input.genres.filter(gen => gen !== itemToRemove),
    });

    setErrors(validate({
      ...input,
      platforms: input.platforms,
      genres: input.genres
    }))

  }

  //------------- SUBMIT -----------------------------

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (allGames.filter((n: GameType) => n.name === input.name).length > 0) {
      alert('Ya existe un videojuego con ese nombre.')
    } else {
      if (Object.keys(errors).length !== 0 || input.genres.length < 1 || input.platforms.length < 1) {
        alert('Complete todos los campos correctamente')
      } else {
        dispatch(createVideogame(input))
        setInput({
          name: '',
          description: '',
          release: '',
          rating: 1,
          img: '',
          platforms: [],
          genres: [],
          created: true,
        })
      }
    }
  }

  //----------- VALIDAR ERRORES ----------------------

  const validate = (input: DbGame) => {
    let errors: FormErrors = {} as FormErrors;
    let RegExpression = /^[a-zA-Z0-9_¿?¡! .-]*$/
    let RegExpressionImg = /https?:\/\/.*\.(?:png|jpg)/

    if (!input.name) {
      errors.name = 'Nombre requerido.'
    } else if (!RegExpression.test(input.name)) {
      errors.name = 'Este nombre es inválido'
    } else if (input.name.length > 20) {
      errors.name = 'El nombre solo puede tener un máximo de 20 caracteres'
    }

    if (!input.description) {
      errors.description = 'Se requiere una descripción.'
    } else if (input.description.length > 500) {
      errors.description = 'La descripción es demasiado larga.'
    }

    if (input.genres.length < 1) {
      errors.genres = 'Seleccione por lo menos un género'
    }

    if (input.platforms.length < 1) {
      errors.platforms = 'Seleccione por lo menos una plataforma'
    }

    if (input.img && !RegExpressionImg.test(input.img)) {
      errors.img = 'Link invalido'
    }


    if (input.rating > 0) {
      if (input.rating < 1 || input.rating > 5) {
        errors.rating = 'El rating debe tener un valor entre 1 y 5.'
      }
    }

    return errors
  }

  // -------------- FORMULARIO -----------------

  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}>
        <img src={formtitle} alt='CREA TU VIDEOJUEGO' />
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <label>Nombre: </label>
          <input
            type="text"
            name='name'
            value={input.name}
            onChange={handleInputChange}
            className={styles.input}
          />
          {errors.name && (<p className={styles.formErrors}>{errors.name}</p>)}
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
          {errors.img && <p className={styles.formErrors}>{errors.img}</p>}
        </div>

        <div className={styles.formSection}>
          <label>Descripción: </label>
          <textarea
            name='description'
            value={input.description}
            onChange={handleInputChange}
            className={styles.input}
          />
          {errors.description && <p className={styles.formErrors}>{errors.description}</p>}
        </div>

        <div className={styles.formSection}>
          <label>Fecha de Lanzamiento:</label>
          <input
            type="date"
            name='release'
            value={input.release}
            onChange={handleInputChange}
            placeholder='dd-mm-yyyy'
            className={styles.input}
          />
          {errors.release && <p className={styles.formErrors}>{errors.release}</p>}
        </div>

        <div className={styles.formSection}>
          <label>Plataformas: </label>
          <select
            name='platforms'
            onChange={handleSelect}
            className={styles.input}
          >
            <option disabled selected>Seleccione las plataformas</option>
            {
              platforms?.map(p => (
                <option value={p} key={p}>
                  {p}
                </option>
              ))}
          </select>
          {input.platforms?.map(p => {
            return (
              <div key={p} >
                {p}
                <button
                  className={styles.removeButton}
                  type="button" onClick={() => removeItem(p)
                  }>X</button>
              </div>)
          })}
          {errors.platforms && <p className={styles.formErrors}>{errors.platforms}</p>}
        </div>

        <div className={styles.formSection}>
          <label>Géneros: </label>
          <select
            name="genres"
            onChange={handleSelect}
            className={styles.input}
          >
            <option disabled selected>Seleccione los géneros</option>
            {
              genres?.map((g: Genre) => (
                <option value={g.name} key={g.id}
                  className={styles.tag}>
                  {g.name}
                </option>
              ))
            }
          </select>
          {input.genres?.map(g => {
            return (
              <div key={g}>
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
            name="rating"
            value={input.rating}
            onChange={handleInputChange}
            className={styles.input}
          />
          {errors.rating && <p className={styles.formErrors}>{errors.rating}</p>}
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

