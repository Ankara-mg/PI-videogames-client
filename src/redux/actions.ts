import type { ApiGame, DbGame, GameType, Genre } from 'src/types'
import type { AppDispatch } from './store'
import axios from 'axios'

export const TOGGLE_LOADING = 'TOGGLE_LOADING'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GET_VIDEOGAMES_OK = 'GET_VIDEOGAMES_OK'
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

const url = import.meta.env.VITE_API_URL;

export const getAllVideogames = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: TOGGLE_LOADING })
    const res = await axios.get(url + '/videogames')
    dispatch({
      type: GET_VIDEOGAMES_OK,
      payload: res.data
    })
    dispatch({ type: TOGGLE_LOADING })
  } catch (error) {
    dispatch({ type: TOGGLE_LOADING })
    dispatch({
      type: GET_VIDEOGAMES_ERROR,
      payload: 'No se encontraron juegos.'
    })
  }
}

export const getOneVideogame = (gameId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: TOGGLE_LOADING })
    const res = await axios.get(`${url}/videogames/${gameId}`)
    dispatch({
      type: GET_GAME,
      payload: res.data
    })
    dispatch({ type: TOGGLE_LOADING })
  } catch (error) {
    dispatch({ type: TOGGLE_LOADING })
    dispatch({
      type: GET_VIDEOGAMES_ERROR,
    })
  }
}

export const createVideogame = (gameData: DbGame) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.post(url + '/videogame/create', gameData)
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

export const getGenres = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get(url + '/genres')
    dispatch({
      type: GET_GENRES,
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const searchGames = (gameName: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: TOGGLE_LOADING })
    const res = await axios.get(url + `/videogames?name=${gameName}`)
    dispatch({
      type: SEARCH_GAME,
      payload: res.data
    })
    dispatch({ type: TOGGLE_LOADING })
  } catch (error) {
    dispatch({ type: TOGGLE_LOADING })
    dispatch({
      type: FILTER_GAMES_ERROR,
    })
  }
}

export const filterVideogames = (allGames: GameType[], genres: string[], db: string) => (dispatch: AppDispatch) => {

  const filtered = []

  for (const game of allGames) {
    let comparar = game.genres.filter((genre: Genre) => genres.includes(genre.name));

    if (comparar.length > 0) {
      if (db === 'allGames') {
        filtered.push(game);
      } else if (db === 'dbGames' && game.created) {
        filtered.push(game);
      } else if (db === 'apiGames' && !game.created) {
        filtered.push(game);
      }
    }
  }

  if (filtered.length > 0) {
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

export const getFromDb = (allGames: GameType[], type: string) => (dispatch: AppDispatch) => {
  const filtered = []

  dispatch({
    type: RESET_ERRORS,
  })

  for (const game of allGames) {
    if (game.created && type === 'dbGames') {
      filtered.push(game);
    } else if (!game.created && type === 'apiGames') {
      filtered.push(game);
    } else if (type === 'allGames') {
      dispatch({
        type: GET_VIDEOGAMES_OK,
        payload: allGames
      });
    }
  }

  if (filtered.length > 0) {
    dispatch({
      type: FILTER_GAMES_OK,
      payload: filtered
    })
  } else if (type !== 'allGames') {
    dispatch({
      type: FILTER_GAMES_ERROR,
      payload: 'No se encontraron videojuegos'
    })
  }
}

export const sortGames = (allGames: GameType[], sortBy: string, type: string) => (dispatch: AppDispatch) => {

  const sortedGames = allGames.map((obj: GameType) => ({ ...obj }))

  switch (sortBy) {
    case 'name':
      sortedGames.sort((a: GameType, b: GameType) => {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
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
      sortedGames.sort((a, b) => a.rating - b.rating);

      if (type === 'descending') {
        sortedGames.reverse();
      }

      dispatch({
        type: SORT_GAMES,
        payload: sortedGames
      });
      break;

    default:
      dispatch({
        type: SORT_GAMES_DEFAULT,
      })
  }

}

export const resetErrors = () => (dispatch: AppDispatch) => {
  dispatch({
    type: RESET_ERRORS,
  })
}
