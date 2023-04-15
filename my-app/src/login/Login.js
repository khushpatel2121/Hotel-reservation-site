import React,{useContext, useState} from 'react';
import "./Login.css"
import { AuthContext } from '../SearchContext/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials,setCredentials] = useState({
      username:undefined,
      password:undefined,
    })

    const navigate = useNavigate();
      
  const {loading,error,dispatch} = useContext(AuthContext);

   const handleChange =(e)=>{
    setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}))
   }

   const handleClick = async(e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
        const res = await axios.post("/auth/login",credentials);
        dispatch({type:"LOGIN_SUCCESS",payload: res.data.details});
        navigate("/");
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
   }
  return (
    <div className='login'>

    <div className='loginForm'>
        <input type="text" placeholder='username' onChange={handleChange} id="username" className="lInput" />
        <input type="password" placeholder='password' onChange={handleChange} id="password" className="lInput" />
        <button className="lButton" disabled={loading} onClick={handleClick}>Login</button>
        {error&&<span>{error.message}</span>}
            </div>  
    </div>
  )
}

export default Login
