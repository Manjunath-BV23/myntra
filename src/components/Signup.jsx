import axios from "axios";
import React from "react";
import { useEffect } from "react";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser } from "../redux/User/action";
import "./Signup.css";

export const Signup = () => {
    
    const [data, setData] = useState({
        firstname:"",
        lastname:"",
        email:"",
        number:"",
        password:"",
        confirmPassword:"",
        status:false,
    })

    const dispatch = useDispatch();
    const users = useSelector(store => store.users.users);
    console.log(" users ", users);

    useEffect(() => {
        // console.log("Last", manju)
        getData();
    },[])
  

    const {firstname,lastname,email,number,password,confirmPassword} = data;


    const handleChange = e => {
        setData({...data,[e.target.name]:e.target.value});
    }
// dispatch(addUser(res.data))
    const getData = () => {
        axios.get("https://my-myntra-api.herokuapp.com/users").then((res) => dispatch(addUser(res.data)))
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("password doesn't match");
        }else{
            postData();
            window.location.href="/login";
        }
    }

    const postData = () => {
        axios.post("https://my-myntra-api.herokuapp.com/users",data)
        .then(() => getData())
    }

    return (
        <div id="main">
            <div id="img">
                <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2022/1/14/d63fc446-4087-4e07-b2dd-1d060368d2661642184399341-Banner_Login-page-400.png" />
                <form onSubmit={handleSubmit} autoComplete="off">
                    <h3>Signup</h3>
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
                </form>
            </div>
        </div>
    )
}