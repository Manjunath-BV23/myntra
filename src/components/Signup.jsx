import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import {useState} from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { Register_Request } from "../redux/singup/action"
import "./Signup.css";

export const Signup = () => {
    const dispatch=useDispatch();
    const navigate =useNavigate()
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange =(e)=>{
        const{name,value} =e.target;
        

      
       
        setUser({...user,[name]:value,})
    }

    console.log("user",user);
    const register   =()=>{
        const {name,email,password} = user
        
        if(name && email  && password ){
           
          dispatch(Register_Request(user,navigate))
            
        }
           

        else{
            alert ("Please fill all the spaces")
        }
       
    }

    return (
        <div id="main">
            <div id="img">
                <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2022/1/14/d63fc446-4087-4e07-b2dd-1d060368d2661642184399341-Banner_Login-page-400.png" />
                    <h3>Signup</h3>
                    <br />
                    <input className="r3" type="text" name="name" value={user.name} placeholder="Enter Your Name" onChange={handleChange} style={{height:"30px",width:"80%"}}/>
                    <br />
                    <br />
                    <input className="r3" type="text" name="email" value={user.email} placeholder="Enter Your E-mail"  onChange={handleChange} style={{height:"30px",width:"80%"}}/>
                    <br /><br />
                    <input className="r3" type="password" name="password" value={user.password} placeholder="Enter Your Password" onChange={handleChange} style={{height:"30px",width:"80%"}}/>
                    <br />
                    <br />
                    <button className="r4" onClick={register} style={{height:"30px",width:"80%"}}>Create Account</button>
                    <br />
                    <label className="label" htmlFor="">Already have account ?</label>
                    <Link style={{textDecoration:"none", color:"blue"}} to="/login">Login</Link>
                {/* <form onSubmit={handleSubmit} autoComplete="off">
                    <input type="text" name="firstname" value={firstname} placeholder="enter your first name" onChange={handleChange} style={{height:"30px",width:"80%"}} />
                    <br />
                    <br />
                    <input type="text" name="lastname" value={lastname} placeholder="enter your last name" onChange={handleChange} style={{height:"30px",width:"80%"}} />
                    <br />
                    <br />
                    <input type="email" name="email" value={email} placeholder="enter your email" onChange={handleChange} style={{height:"30px",width:"80%"}} />
                    <br />
                    <br />
                    <input type="number" name="number" value={number} placeholder="enter your number" onChange={handleChange} style={{height:"30px",width:"80%"}} />
                    <br />
                    <br />
                    <input type="password" name="password" value={password} placeholder="enter your password" onChange={handleChange} style={{height:"30px",width:"80%"}} />
                    <br />
                    <br />
                    <input type="password" name="confirmPassword" value={confirmPassword} placeholder="enter the confirmed password" onChange={handleChange} style={{height:"30px",width:"80%"}} />
                    <br />
                    <br />
                    <input type="submit" style={{height:"30px",width:"80%", backgroundColor:"black",color:"white"}}/>
                </form> */}
            </div>
        </div>
    )
}