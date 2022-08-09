import { Route } from 'react-router-dom';
import './App.css';

//Components
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';

function App() {
  return (
    <div>
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} />
      <Route exact path='/videogames/:id' component={GameDetail} />
    </div>
  );
}

export default App;
