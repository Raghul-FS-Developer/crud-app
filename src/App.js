import './App.css';
import Sidebar from './component/sidebar';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import All from './component/all';
import Add from './component/add';
import Edit from './component/edit';
function App() {
  return (
   <>
    <div style={{display:"flex",flexDirection:"row"}}>
      <Sidebar/>
    <div>
    <Router>
      <Routes>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/all' element={<All/>}/>
        <Route path='/' element={<Add/>}/>
     
      </Routes>
    </Router>
    </div>
     </div>
   </>
  );
}

export default App;
