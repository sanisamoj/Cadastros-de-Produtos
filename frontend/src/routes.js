import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from "./pages/Home";
import List from './pages/List';

export default function RoutesApp() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path= '/' element= {<Home/>} />
        <Route path= '/product' element= {<List/>} />
      </Routes>
    </BrowserRouter>
  )
}
