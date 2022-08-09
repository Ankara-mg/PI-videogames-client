import axios from 'axios'

export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_GENRES = 'GET_GENRES'
export const GET_GAME = 'GET_GAME'
export const SEARCH_GAME = 'SEARCH_GAME'

const url = 'http://localhost:3001/videogames'

export const getAllVideogames = () => async (dispatch) => {
    try {
        const res = await axios.get(url)
        dispatch({
            type: GET_VIDEOGAMES,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getOneVideogame = (gameId) => async (dispatch) => {
    try {
        const res = await axios.get(url + '/' + gameId)
        dispatch({
            type: GET_GAME,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const createVideogame = (gameData) => {
    return {
        type: CREATE_VIDEOGAME,
        payload: gameData
    }
}

export const getGenres = () => {
    return {
        type: GET_GENRES
    }
}

export const searchGames = (gameName) => async (dispatch )=> {
    try {
        const res = await axios.get(url + `?name=${gameName}`)
        dispatch({
            type: SEARCH_GAME,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}