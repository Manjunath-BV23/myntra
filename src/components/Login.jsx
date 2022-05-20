import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {addUser } from "../redux/User/action";

export const Login = () => {

    const [data, setData] = useState({
        email:"",
        password:"",
    })
    const users = useSelector(store => store.users.users);
    console.log(" users ", users);
    useEffect(()=>{
        getData()
    }, [])

    const dispatch = useDispatch();

    const getData = () => {
        axios.get("https://my-myntra-api.herokuapp.com/users").then((res) => dispatch(addUser(res.data)))
    }
    const postData = () => {
        axios.post("https://my-myntra-api.herokuapp.com/users",data)
        .then(() => getData())
    }


    const {email,password} = data;


    const handleChange = e => {
        setData({...data,[e.target.name]:e.target.value});
    }

    let result = users.filter((user) => user.email === email && user.password === password);
    console.log("Result "+result);
  

    const handleSubmit = e =>{
        e.preventDefault()
        if(result.length>0){
            window.location.href = "./";
            // getData();
        }else{
            // window.location.href = "./";
            alert("wrong credintials");
        }
    }
    


    return (
        <div id="main">
            <div id="img">
                <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2022/1/14/d63fc446-4087-4e07-b2dd-1d060368d2661642184399341-Banner_Login-page-400.png" />
                <form onSubmit={handleSubmit} autoComplete="off">
                    <h3>login</h3>
                    <input type="email" placeholder="enter your email" name="email" value={email} onChange={handleChange} style={{height:"30px",width:"80%"}} />
                    <br />
                    <br />
                    <input type="password" placeholder="enter your password" name="password" value={password} onChange={handleChange} style={{height:"30px",width:"80%"}} />
                    <br />
                    <br />
                    <input type="submit" style={{height:"30px",width:"80%"}}  />
                </form>
                <p>If your new user then click here <Link style={{textDecoration:"none", color:"blue"}} to="/signup">Signup</Link></p>
            </div>
        </div>
    )
}