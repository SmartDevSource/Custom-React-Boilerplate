import React, {useEffect, useState} from "react";
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user'
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = ({setSuccessRegister}) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setRegister] = useState(null);
  const setUser = useAtom(userAtom)[1];

  const navigate = useNavigate();

  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }

  const handleClickRegister = ()=>{
    const data = {
      user:{
        email: email, 
        password: password
      }
    };

    registerAccount(data).then(response=>{
      const token = response.headers.get("Authorization").split(" ")[1];

      if (response.ok){
        console.log(response);
        setUser({username: email, isLogged: true, token: token});
        setRegister(true);
        setSuccessRegister(true);
      } else {
        setRegister(false);
      }
    })
  }

  useEffect(()=>{
    if (isRegister){
      navigate('/');
    }
  },[isRegister])

  const registerAccount = async (data) =>{
    try{
      const response = await fetch('http://localhost:3000/users', {
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      return response;
    }catch(error){
      console.log("Erreur lors de la création du compte : "+error);
    }
  }

  return (
    <div className="flexcol mt30">
      <h1>Inscription</h1>
      {isRegister === false && <b className="red">Erreur lors de la création du compte</b>}
      <input className = "m5" type = "text" onChange={handleEmailChange}/>
      <input className = "m5" type = "password" onChange={handlePasswordChange}/>
      <button className = "m5" type = "submit" onClick={handleClickRegister}>S'inscrire</button>
    </div>
  )
}

export default SignUp;