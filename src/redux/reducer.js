import { 
    GET_GAME, 
    GET_GENRES, 
    GET_VIDEOGAMES, 
    CREATE_VIDEOGAME, 
    SEARCH_GAME, 
    FILTER_GAMES_OK, 
    FILTER_GAMES_ERROR, 
    TOGGLE_LOADING,
    RESET_ERRORS,
} from "./actions"

const initialState = {
    allVideogames: [],
    filterGames: [],
    videogame: {},
    genres: [],
    loading: false,
    errors: '',
}

export const videogameReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            }

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                filterGames: action.payload
            }
        
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        
        case CREATE_VIDEOGAME:
            return {
                ...state,
                videogame: action.payload
            }
        
        case GET_GAME:
            return {
                ...state,
                videogame: action.payload
            }
        
        case SEARCH_GAME:
            return {
                ...state,
                filterGames: action.payload
            }
        
        case FILTER_GAMES_OK:
            return {
                ...state,
                filterGames: action.payload
            }
        
        case FILTER_GAMES_ERROR:
            return{
                ...state,
                errors: action.payload
            }
        
        case RESET_ERRORS:
            return{
                ...state,
                errors: ''
            }
        
        default:
            return state
    }
}