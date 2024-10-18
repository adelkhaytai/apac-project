import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import NavBar from './components/layout/NavBar';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from './components/user/Profile';
import Events from './components/events/Events';
import EventUpdate from './components/user/EventUpdate';
import CreateEvent from './components/user/CreateEvent';
import ResultSearch from './components/layout/ResultSearch';
import UpdateEvent from './components/admin/UpdateEvent';

function App() {
  return (
      <Router>
    <div className="App">
      <header className="App-header">
        <NavBar/>
      </header>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/events' element={<Events/>}></Route>
          <Route path='/eventUpdate/:id' element={<EventUpdate/>}></Route>
          <Route path='/eventsNew' element={<CreateEvent/>}></Route>
          <Route path='/results' element={<ResultSearch/>}></Route>
          {/* admin  : */}
          <Route path='/updateEventAdmin/:id' element={<UpdateEvent/>}></Route>
        </Routes>
    </div>
      </Router>
  );
}

export default App;
