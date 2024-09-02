import './App.css'
import { GetStarted } from './GetStarted';
import { Books } from './component/Books';
import { ForgotPwd } from './component/ForgotPwd';
import { Home } from './component/Home';
import { LikedProducts } from './component/LikedProducts';

import { Login } from './component/Login';
import { PrivateComponent } from './component/PrivateComponent';
import Signup from './component/Signup'
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<GetStarted/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgotPassword' element={<ForgotPwd/>}/>


        <Route element={<PrivateComponent/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/books' element={<Books/>}/>
          <Route path='/favoritebooks' element={<LikedProducts/>}/>


        </Route>
        

      </Routes>
    </Router>
      

  )
}

export default App
