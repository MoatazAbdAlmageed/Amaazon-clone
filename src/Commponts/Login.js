import React, { useState } from 'react';
import {Link, Navigate} from "react-router-dom"
import Logo from "../images/logo.png"
import './Login.css'
import {createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase"
import {useNavigate} from "react-router-dom"
const Login = () => {
  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const signIn = (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then((auth)=>{
      if(auth){
        navigate("/")
      }
    })
  }
  const register = (e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth , email , password).then((auth) =>
  {
    if(auth){
      navigate("/")
    }
  } 
    ).catch((error)=>{
      alert(error.message)
    })
  }
    return (
        <div className='login'>
          <Link to="/">
        <img className="login-logo" src={Logo} alt="logo-img" />
      </Link>
        <div className='login-container' onClick={signIn}>
            <h1>Sign In </h1>
            <form>
                <h5>E-mail or mobile phone number</h5>
                <input type="email" value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h5>Password</h5>
                <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />
                <button className='login-signInBtn' type='submit'>
                        Sign In
                </button>
                <p>By signing in, you agree to Amazon's Conditions of Use
                 and Privacy Notice.</p>
                 <button className='login-registerBtn' onClick={register}>
                    Creat your Amazon Account
                 </button>
            </form>
        </div>
        </div>
    );
}

export default Login;
