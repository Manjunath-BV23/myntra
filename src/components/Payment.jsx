import "./Payment.css"
import styled from "styled-components";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/Cart/action";

const Main = styled.div`
width: 50%;
height: 350px;
border: 1px solid lightgrey;
padding: 1%;
display: flex;
flex-direction: column;
margin: 25px auto;
`

export const Payment = () => {
  const [card, setcard] = useState({
    cardNumber: "", 
    name : "", 
    cvv : "", 
    date: ""
  });
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.cart);
  console.log("CArt in cartpage: ", cart)
  const [showMenu,setShowMenu] = useState(false)
  let totalPrice = 0;
  let disPrice = 0;
  for(var i = 0; i<cart.length; i++){
      totalPrice += cart[i].id.price
      disPrice += cart[i].id.price*(Number(cart[i].id.discount)/100)
  }
  let totalAmount = totalPrice-disPrice;

  const [show, setshow] = useState(false);


  const handleChange = (e) => {
      const {id, value} = e.target.value;
      setcard({
          ...card,
          [id]: value
      });
  }

  const handleSubmit = () => {
    //   alert("Processing your payment")
      dispatch(addOrder(cart))
      setshow(true);
  }
    return  show ?  <Navigate to = {`/successful/`}></Navigate> : (
        <div className="main">
        <div className="left">
        {/* <h1>Debit-Card Payment</h1> */}
            {cart.map((e) => (
                    <div className="cartItem">
                        <img className="cartImg" src={e.id.images} alt="" />
                        <div>
                            <p>{e.id.title}</p>
                            <p>Price: {e.id.price}/-</p>
                        </div>
                    </div>
            ))}                       
        </div>
        <div className="paymentDiv">
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
            </div>
            <form onSubmit = {() => {handleSubmit()}} style ={{display: "flex", flexDirection: "column", width: "50%", gap: "4%", margin: "auto", height: "80%"}} >
                <input onChange = {handleChange} id = "cardNumber" type="number" placeholder = "Enter Debit card Number" required/>
                <input onChange = {handleChange} id = "name" type="text" placeholder = "Enter Name on Card" required/>
                <input onChange = {handleChange} id = "cvv" type="number" placeholder = "Enter CVV"  required/>
                <input onChange = {handleChange} id = "date" type="date" name="" placeholder = "Enter Card Expiry Date "  required/>
                <input  className="place" type="submit" value = "PLACE ORDER"/>
                </form> 
                {/* <button className="place" onClick={Payment}>PLACE ORDER</button> */}
        </div>
        </div>
    )
}