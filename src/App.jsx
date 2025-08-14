import { Routes, Route } from 'react-router-dom';
import './App.css';

//Components
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import CreateGame from './components/CreateGame/CreateGame.jsx';

function App() {
  return (
    <Routes>
      <Route path='/videogame/create' element={<CreateGame />} />
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/videogames/:id' element={<GameDetail />} />
    </Routes>
  );
}

export default App;
