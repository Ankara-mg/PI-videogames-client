import { Route } from 'react-router-dom';
import './App.css';

//Components
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import CreateGame from './components/CreateGame/CreateGame.jsx';

function App() {
  return (
    <div>
      <Route exact path='/videogame/create' component={CreateGame} />
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/videogames/:id' component={GameDetail} />
    </div>
  );
}

export default App;
