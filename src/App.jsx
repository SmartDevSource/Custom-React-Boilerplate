import './App.css'
import Home from './pages/home'
import SignUp from './pages/signup'
import SignIn from './pages/signin'
import ThirdPage from './pages/thirdpage'
import NotFound from './pages/notfound'
import Toggler from './components/toggler'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { userAtom } from './atoms/user'

import { BrowserRouter, Routes, Route, Link, useAsyncError } from 'react-router-dom'

function App() {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [clicked, isClicked] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [popMessage, setPopMessage] = useState("");
  const [user, setUser] = useAtom(userAtom);

  const setCookie = (name, value, days) =>{
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  }

  const getCookie = (name) =>{
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  }

  // const userdata = {
  //   username: user.username,
  //   isLogged: false
  // }

  // setCookie("userdata", JSON.stringify(userdata), 15);

  const handleDisconnectClick = ()=>{
    console.log(user.token);
    fetch('http://localhost:3000/users/sign_out', {
      method:'delete',
      headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
    }
    }).then(resp=>{
      console.log(resp);

      const data = {
        user: {
          username: "", 
          isLogged: false,
          token: null
        }
      };

      setCookie("userdata", JSON.stringify(data), 0);
      setSuccessLogin(false);
      setSuccessRegister(false);
      setIsLogged(false);
      setUser("");
    })
  }
    

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

  useEffect(()=>{
    if (successLogin === true){
      setPopMessage("Salut à toi "+user.username);
      const userdata = {
        username: user.username,
        isLogged: true,
        token: user.token
      }
      setIsLogged(true);
      setCookie("userdata", JSON.stringify(userdata), 15);
      setTimeout(() => { setPopMessage(""); }, 5000);
    }
  }, [successLogin, user.username])

  useEffect(()=>{
    if (successRegister === true){
      setPopMessage("Bienvenue, "+user.username+ ", votre compte vient d'être crée !");
      const userdata = {
        username: user.username,
        isLogged: true,
        token: user.token
      }
      setIsLogged(true);
      setCookie("userdata", JSON.stringify(userdata), 15);
      setTimeout(() => { setPopMessage(""); }, 5000);
    }
  }, [successRegister, user.username])

  useEffect(()=>{
    const userCookie = getCookie("userdata");
    const userData = JSON.parse(userCookie);

    if (userData!=null){
      setIsLogged(userData.isLogged);
      console.log(isLogged);
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <div className='navbar'>
          <div className='flexrow'>
            <Link className="navlink" to = "/">Accueil</Link>
            {!isLogged ? ( 
            <>
              <Link className="navlink" to = "/signup">Créer un compte</Link>
              <Link className="navlink" to = "/signin">Se connecter</Link>
            </>
            ) : (
            <>
              <button type = "submit" onClick={handleDisconnectClick}>Se déconnecter</button>
            </>
            )
            }

          </div>
          <Toggler isDarkTheme={isDarkTheme} toggleTheme = {toggleTheme}/>
        </div>   
    
        {((successLogin||successRegister) && popMessage != "") && <div className='flexcol'><span className='pop'>{popMessage}</span></div>}   

        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/signup" element={<SignUp setSuccessRegister = {setSuccessRegister}/>}/>
          <Route path = "/signin" element={<SignIn setSuccessLogin = {setSuccessLogin}/>}/>
          <Route path = "*" element = {<NotFound/>}/>
        </Routes>
      </BrowserRouter>

      <div className='footer'>Footer</div>
    </>
  )
}

export default App
