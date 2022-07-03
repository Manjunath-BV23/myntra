import React from "react";
import "./Cart.css";
import { Signup } from "./Signup";
import { useState } from 'react'
import { useNavigate } from 'react-router'
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
// import {removeCart} from '../redux/Cart/action';
import {useDispatch} from 'react-redux';
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { addCart, getCartData } from "../redux/Cart/action";

export const Cart = () => {
    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart.cart);
    console.log("Cart DATA : ", cart)
    const [showMenu,setShowMenu] = useState(false)
    let totalOffPrice = 0;
    let presentPrice = 0;
    for(var i = 0; i<cart.length; i++){
        totalOffPrice += cart[i].off_price
        presentPrice += cart[i].price
        // disPrice += cart[i].off_price*(Number(cart[i].discount)/100)
    }
    let disPrice = totalOffPrice-presentPrice

    console.log(totalOffPrice, presentPrice, disPrice, )
    // let totalAmount = totalPrice-disPrice;

    useEffect(() => {
        // dispatch(getCartData());
        postData()
    },[])

    const postData = () => {
        dispatch(getCartData());
    }

    // const dataMatter = useSelector((state) => state.cart.cart);
    // console.log(" data "+dataMatter);

    const removeCart = (id) => {
        axios.delete(`https://myntra-updated.herokuapp.com/cart/${id}`)
        .then((res) => postData());
    }

	const done = () => {
		alert("Congratulation your order is placed")
	}

    const navigate = useNavigate();

    function handleClickCart() {
		navigate('/products')
	}

    function handleClickSignUp() {
		navigate('/signup')
	}
    const Payment = () => {
        <Navigate to = {"/payment"}></Navigate>
    }


    // const data = useSelector((state) => state.Cart.cart)

    return (
        // <div className="main">
        <div >
            {cart.length < 1 ? <div><img className="emptyImg" src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png" alt="" /></div>:
                                <div className="maincart">
                                    <div className="carts">
                                        {cart.map((e) => (
                                            <div className="mainBox" key={e._id}>
                                                <img className="prodImg" src={e.images} alt="" />
                                                <p style={{fontSize:"15px",fontWeight:"700"}}>{e.brand}</p>
                                                <p style={{lineHeight: "1%",color:"#323136",fontSize:"15px"}}>{e.category}</p>
                                                <div style={{ display: 'flex' }}><p style={{ fontSize: "15px", fontWeight: "700" }}>{"Rs. " + e.price}</p><p style={{ marginLeft: "2%", textDecoration: "line-through", fontSize: "13px" }}>{"Rs." + e.off_price}</p><p style={{ marginLeft: "4%", fontSize: "13px", color: "#FF905A" }}>({e.discount} %OFF)</p></div>
                                                <button className="cartBtn " onClick={() => removeCart(e._id)}>Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cost">
                                        <h3>PRICE DETAILS ({cart.length} Items)</h3>
                                        <div style={{
                                            border: "1px solid gray"
                                        }}>
                                            <div className="price">
                                                <p>Total MRP</p>
                                                <p>{totalOffPrice}/-</p>
                                            </div>
                                            <div className="price">
                                                <p>Discount on MRP</p>
                                                <p>{disPrice}/-</p>
                                            </div>
                                            <div className="price">
                                                <p>Coupon Discount</p>
                                                <p className="coupon">Apply Coupon</p>
                                            </div>
                                            <div className="price">
                                                <p>Early Access Fee</p>
                                                <p>99/-</p>
                                            </div>
                                            <div className="price">
                                                <p>Convenience Fee <strong>Know more</strong></p>
                                                <p><strike>99/-</strike> FREE</p>
                                            </div>
                                            <hr />
                                            <div className="price">
                                                <p>Total Amount</p>
                                                <p>{presentPrice}/-</p>
                                            </div>
                                            {/* <button className="place" onClick={Payment}>Make Payment</button> */}
                                        </div>    
                                            <div className="total">
                                                <Link to={"/payment"}><button className="log-in" onClick={Payment}>PROCEED TO PAYMENT</button></Link>
                                            </div>
                                        </div>
                                        </div>
             }
                            
        </div>
        /* <div className="paymentDiv">
            <h3>PRICE DETAILS ({cart.length} Items)</h3>
            <div>
                <div className="price">
                    <p>Total MRP</p>
                    <p>{totalPrice}/-</p>
                </div>
                <div className="price">
                    <p>Discount on MRP</p>
                    <p>{disPrice}/-</p>
                </div>
                <div className="price">
                    <p>Coupon Discount</p>
                    <p className="coupon">Apply Coupon</p>
                </div>
                <div className="price">
                    <p>Early Access Fee</p>
                    <p>99/-</p>
                </div>
                <div className="price">
                    <p>Convenience Fee <strong>Know more</strong></p>
                    <p><strike>99/-</strike> FREE</p>
                </div>
                <hr />
                <div className="price">
                    <p>Total Amount</p>
                    <p>{totalAmount}/-</p>
                </div>
                <button className="place" onClick={Payment}>Make Payment</button>
            </div>
        </div> */
        
        

        // </div>
    )
}