
import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import Listing from './Listing';
import EditEmployee from './EditEmployee';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Listing/>}></Route>
      <Route path='/add' element={<AddEmployee/>}></Route>
      <Route path='/edit/:id' element={<EditEmployee/>}></Route>
      </Routes>
      </BrowserRouter>
      
  
    </div>
  );
}

export default App;
