import './App.css'
import Home from './pages/home'
import FirstPage from './pages/firstpage'
import SecondPage from './pages/secondpage'
import ThirdPage from './pages/thirdpage'
import NotFound from './pages/notfound'
import Toggler from './components/toggler'
import { useState, useEffect } from 'react'


import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [clicked, isClicked] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
    isClicked(true);
  }

  useEffect(() => {
    if (clicked === true) {
      localStorage.setItem("darkmode", isDarkTheme);
    }
  }, [isDarkTheme, clicked]);

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : '';
  }, [isDarkTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkmode");
    if (savedTheme === "true") {
      setDarkTheme(true);
    } else if (savedTheme === "false") {
      setDarkTheme(false);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className='flexrow navbar'>
          <Link className="navlink" to = "/">Accueil</Link>
          <Link className="navlink" to = "/firstpage">Première page</Link>
          <Link className="navlink" to = "/secondpage">Deuxième page</Link>
          <Link className="navlink" to = "/thirdpage">Troisième page</Link>
          <Toggler isDarkTheme={isDarkTheme} toggleTheme = {toggleTheme}/>

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
