import React, {useEffect, useState} from "react";
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user'
import { Navigate, useNavigate } from "react-router-dom";

const SignIn = ({setSuccessLogin}) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setLogin] = useState(null);
  const setUser = useAtom(userAtom)[1];

  const navigate = useNavigate();

  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }

  const handleClickLogin = ()=>{
    const data = {
      user: {
        email: email, 
        password: password
      }
    };

    loginAccount(data).then(response=>{
      const token = response.headers.get("Authorization").split(" ")[1];

      if (response.ok){
        console.log(response);
        setUser({username: email, isLogged: true, token: token});
        setLogin(true);
        setSuccessLogin(true);
      } else {
        setLogin(false);
      }
    })
  }

  useEffect(()=>{
    if (isLogin){
      navigate('/');
    }
  },[isLogin])

  const loginAccount = async (data) =>{
    try{
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      return response;
    }catch(error){
      console.log("Erreur lors de la connection : "+error);
    }
  }

  return (
    <div className="flexcol mt30">
      <h1>Connexion</h1>
      {isLogin === false && <b className="red">Erreur de connexion</b>}
      <input className = "m5" type = "text" onChange={handleEmailChange}/>
      <input className = "m5" type = "password" onChange={handlePasswordChange}/>
      <button className = "m5" type = "submit" onClick={handleClickLogin}>Se connecter</button>
    </div>
  )
}

export default SignIn;