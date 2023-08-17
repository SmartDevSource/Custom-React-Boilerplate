import './App.css'
import Home from './pages/home'
import FirstPage from './pages/firstpage'
import SecondPage from './pages/secondpage'
import ThirdPage from './pages/thirdpage'
import NotFound from './pages/notfound'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flexrow navbar'>
          <Link className="navlink" to = "/">Accueil</Link>
          <Link className="navlink" to = "/firstpage">Première page</Link>
          <Link className="navlink" to = "/secondpage">Deuxième page</Link>
          <Link className="navlink" to = "/thirdpage">Troisième page</Link>
        </div>

        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/firstpage" element={<FirstPage/>}/>
          <Route path = "/secondpage" element={<SecondPage/>}/>
          <Route path = "/thirdpage" element={<ThirdPage/>}/>
          <Route path = "*" element = {<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      <div className='footer'>Footer</div>
    </>
  )
}

export default App
