import axios from 'axios'

export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_GENRES = 'GET_GENRES'
export const GET_GAME = 'GET_GAME'
export const SEARCH_GAME = 'SEARCH_GAME'
export const FILTER_GAMES_OK = 'FILTER_GAMES_OK'
export const FILTER_GAMES_ERROR = 'FILTER_GAMES_ERROR'
export const RESET_ERRORS = 'RESET_ERRORS'
export const SORT_GAMES = 'SORT_GAMES'
export const SORT_GAMES_DEFAULT = 'SORT_GAMES_DEFAULT'

const url = 'http://localhost:3001/videogames'

export const getAllVideogames = () => async (dispatch) => {
    try {
        dispatch({type: TOGGLE_LOADING})
        const res = await axios.get(url)
        dispatch({
            type: GET_VIDEOGAMES,
            payload: res.data
        })
        dispatch({type: TOGGLE_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const getOneVideogame = (gameId) => async (dispatch) => {
    try {
        dispatch({type: TOGGLE_LOADING})
        const res = await axios.get(url + '/' + gameId)
        dispatch({
            type: GET_GAME,
            payload: res.data
        })
        dispatch({type: TOGGLE_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const createVideogame = (gameData) => async (dispatch) => {

    try {
        const res = await axios.post('http://localhost:3001/videogame/create', gameData)
        dispatch({
            type: CREATE_VIDEOGAME,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getGenres = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:3001/genres')
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
        console.log(error)
    }
}

export const filterVideogames = (allGames, genres) => dispatch => {

    const filtered = []
    
    for(let i = 0 ; i < allGames.length ; i++){
        if(allGames[i].genres.filter(element => genres.includes(element)).length > 0){
            filtered.push(allGames[i])
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

export const sortGames = (allGames, sortBy, type) => dispatch => {

    const sortedGames = allGames.map(obj => ({...obj}))

    switch(sortBy){
        case 'name':

        case 'rating':
            let menorMayor, posicion, cambios, aux
        
              for(let i = 0 ; i < sortedGames.length; i++){
                menorMayor = sortedGames[i]
                console.log(menorMayor)
                for(let j = i; j < sortedGames.length ; j++){
                    if(sortedGames[j].rating < menorMayor.rating && type === 'ascending'){
                        menorMayor = sortedGames[j]
                        posicion = j
                        cambios = true
                    }else if(sortedGames[j].rating > menorMayor.rating && type === 'descending'){
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
                payload: sortedGames
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