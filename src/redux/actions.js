import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GET_VIDEOGAMES_OK = 'GET_VIDEOGAMES'
export const GET_VIDEOGAMES_ERROR = 'GET_VIDEOGAMES_ERROR'
export const GET_GENRES = 'GET_GENRES'
export const GET_GAME = 'GET_GAME'
export const SEARCH_GAME = 'SEARCH_GAME'
export const FILTER_GAMES_OK = 'FILTER_GAMES_OK'
export const FILTER_GAMES_ERROR = 'FILTER_GAMES_ERROR'
export const RESET_ERRORS = 'RESET_ERRORS'
export const SORT_GAMES = 'SORT_GAMES'
export const SORT_GAMES_DEFAULT = 'SORT_GAMES_DEFAULT'
export const FILTER_GAMES_RESET = 'FILTER_GAMES_RESET'

console.log(process.env)
const { BACK_URL } = process.env
const url = 'https://videogames-back-4zi8.onrender.com'

export const getAllVideogames = () => async (dispatch) => {
    try {
        dispatch({type: TOGGLE_LOADING})
        const res = await axios.get(url + 'videogames')
        dispatch({
            type: GET_VIDEOGAMES_OK,
            payload: res.data
        })
        dispatch({type: TOGGLE_LOADING})
    } catch (error) {
        dispatch({type: TOGGLE_LOADING})
        dispatch({
            type: GET_VIDEOGAMES_ERROR,
            payload: 'No se encontraron juegos.'
        })
    }
}

export const getOneVideogame = (gameId) => async (dispatch) => {
    try {
        dispatch({type: TOGGLE_LOADING})
        const res = await axios.get(`${url}videogames/${gameId}`)
        dispatch({
            type: GET_GAME,
            payload: res.data
        })
        dispatch({type: TOGGLE_LOADING})
    } catch (error) {
        dispatch({type: TOGGLE_LOADING})
        dispatch({
            type: GET_VIDEOGAMES_ERROR,
        })
    }
}

export const createVideogame = (gameData) => async (dispatch) => {

    try {
        const res = await axios.post(url + 'videogame/create', gameData)
        dispatch({
            type: CREATE_VIDEOGAME,
            payload: res.data
        })
        alert('Videojuego creado con éxito!')
    } catch (error) {
        alert('Error')
        console.log(error)
    }
}

export const getGenres = () => async (dispatch) => {
    try {
        const res = await axios.get(url + 'genres')
        dispatch({
            type: GET_GENRES,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const searchGames = (gameName) => async (dispatch )=> {
    try {
        dispatch({type: TOGGLE_LOADING})
        const res = await axios.get(url + `?name=${gameName}`)
        dispatch({
            type: SEARCH_GAME,
            payload: res.data
        })
        dispatch({type: TOGGLE_LOADING})
    } catch (error) {
        dispatch({type: TOGGLE_LOADING})
        dispatch({
            type: FILTER_GAMES_ERROR,
        })
    }
}

export const filterVideogames = (allGames, genres, db) => dispatch => {

    const filtered = []
    
    for(let i = 0 ; i < allGames.length ; i++){

        let comparar = allGames[i].genres.filter(element => genres.includes(element.name))

        if(comparar.length > 0){
            if(db === 'allGames'){
                filtered.push(allGames[i])
            } else if (db === 'dbGames' && allGames[i].created){
                filtered.push(allGames[i])
            } else if(db === 'apiGames' && !allGames[i].created) {
                filtered.push(allGames[i])
            }
        }
    }
    
    if(filtered.length > 0){
        dispatch({
            type: FILTER_GAMES_OK,
            payload: filtered,
        })
    } else {
        dispatch({
            type: FILTER_GAMES_ERROR,
            payload: 'No se encontraron juegos.'
        })
    }
}

export const getFromDb = (allGames, type) => dispatch => {
    const filtered = []
    
    dispatch({
        type: RESET_ERRORS,
    })

    for(let i = 0 ; i < allGames.length ; i++){
        if(allGames[i].created && type === 'dbGames'){
            filtered.push(allGames[i])
        } else if(!allGames[i].created && type === 'apiGames'){
            filtered.push(allGames[i])
        } else if (type === 'allGames'){
            dispatch({
                type: GET_VIDEOGAMES_OK,
                payload: allGames
            })
        }
    }

    if(filtered.length > 0){
        dispatch({
            type: FILTER_GAMES_OK,
            payload: filtered
        })
    } else if(type !== 'allGames'){
        dispatch({
            type: FILTER_GAMES_ERROR,
            payload: 'No se encontraron videojuegos'
        })
    }
}

export const sortGames = (allGames, sortBy, type) => dispatch => {

    const sortedGames = allGames.map(obj => ({...obj}))

    switch(sortBy){
        case 'name':
            sortedGames.sort( (a, b) => {
                if(a.name < b.name){
                    return -1
                } else if(a.name > b.name){
                    return 1
                } else {
                    return 0
                }
            })
            dispatch({
                type: SORT_GAMES,
                payload: type === 'ascending' ? sortedGames : sortedGames.reverse()
            })
            break;
        
        case 'rating':
            let menorMayor, posicion, cambios, aux
        
              for(let i = 0 ; i < sortedGames.length; i++){
                menorMayor = sortedGames[i]
                for(let j = i; j < sortedGames.length ; j++){
                    if(sortedGames[j].rating < menorMayor.rating){
                        menorMayor = sortedGames[j]
                        posicion = j
                        cambios = true
                    }
                }
        
                if(cambios){
                    cambios = false
                    aux = sortedGames[i]
                    sortedGames[i] = menorMayor
                    sortedGames[posicion] = aux  
                }
            }

            dispatch({
                type: SORT_GAMES,
                payload: type === 'descending' ? sortedGames.reverse() : sortedGames
            })
            break;
            
        default:
            dispatch({
                type: SORT_GAMES_DEFAULT,
            })
    }

}

export const resetErrors = () => dispatch => {
    dispatch({
        type: RESET_ERRORS,
    })
}
