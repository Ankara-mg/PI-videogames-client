import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { videogameReducer } from './reducer';

/* const rootReducer = combineReducers({
    videogames: videogameReducer
}) */

const store = createStore(
    videogameReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store