import "./Payment.css"
import styled from "styled-components";
import {createContext, useEffect, useReducer, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";
import Items from "./Items";
import ContextCart from "./ContextCart";
import reducer from "./reducer";
import axios from "axios";
import { deccreaseQty, getCartData, increaseQty } from "../redux/Cart/action";
import { Link } from "react-router-dom";


const Main = styled.div`
width: 50%;
height: 350px;
border: 1px solid lightgrey;
padding: 1%;
display: flex;
flex-direction: column;
margin: 25px auto;
`
export const CartContext = createContext();



export const Payment = () => {
  const [card, setCard] = useState({
    email: "", 
    pin : "",
    country : "India", 
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    cardNumber:"",
    name: "",
    cvv: "",
    date: ""
  });

  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate();

//   const dispatch = useDispatch();
    console.log("Payement Data: ", data)

  const cart = useSelector((store) => store.cart.cart);
  console.log("CArt in cartpage: ", cart)
  const isAuth = useSelector((store) => store.SignIn.isAuth)
  console.log("IsAuth", isAuth)

  const [showMenu,setShowMenu] = useState(false)
  const initialState = {
    item: cart
  };
  
    useEffect(() => {
        dispatch(getCartData())
    },[])



  let totalOffPrice = 0;
  let totalAmount = 0
  for(var i = 0; i<cart.length; i++){
    
    totalOffPrice+=cart[i].qty * cart[i].off_price
    totalAmount += cart[i].qty * cart[i].price
      
  }
//   let totalAmount = totalPrice-disPrice;


const incrementQuantity = (id) => {
    dispatch(increaseQty(id))
}
const decrementQuantity = (id) => {
    dispatch(deccreaseQty(id))
}

  const [show, setshow] = useState(false);
//   useEffect(() => {
//     qtyInc()
// },[]);


  const handleChange = (e) => {
      const {id, value} = e.target;
      setCard({
          ...card,
          [id]: value
      });
  }

  const Proceed = () => {
    const {email, pin, country, firstName, lastName, address, city, state, phone, cardNumber, name, cvv, date} = card;
    if(email && pin && country && firstName && lastName && address && city && state && phone && cardNumber && name && cvv && date){
        navigate("/successful")
    }else{
        alert("Please fill all the details")
    }
  }
  const ProceedToLogin = () => {
    const {email, pin, country, firstName, lastName, address, city, state, phone, cardNumber, name, cvv, date} = card;
    if(email && pin && country && firstName && lastName && address && city && state && phone && cardNumber && name && cvv && date){
        navigate("/signup")
    }else{
        alert("Please fill all the details")
    }
  }

  const handleSubmit = () => {
    //   alert("Processing your payment")
    //   dispatch(addOrder(card))
      setshow(true);
  }
  const deleteItem = (id) => {
    axios.delete(`https://myntra-updated.herokuapp.com/cart/${id}`)
    .then((res) => dispatch(getCartData()));
}
  const qtyInc = (id) => {
    let item = cart.findIndex((e) => e._id = id)
    cart[item].qty += 1 
      console.log("Dic Clicked ID", cart[item].qty)
    //   setQty(qty+1)
  }
  const qtyDec = (id) => {
    let item = cart.findIndex((e) => e._id = id)
    cart[item].qty -= 1 
      console.log("Dic Clicked ID", cart[item].qty)
}
    return  show ?  <Navigate to = {`/successful/`}></Navigate> : (
    <div id="container">
        <div id="content">
            <div id="paymentDiv">
                <header>
                    <span id="headSpan1"> Information</span> <span id="headSpan2"> &gt; Payment</span>
                </header>
                <div>
                    <h2>Contact information</h2>
                    <div id="userInfo" className="field">
                        <input id="email" className="inputs" onChange={handleChange} type="text" placeholder="Email ID"/>
                    </div>
                    {/* <div id="checkbox_input">
                        <input id="box" type="checkbox"/>
                        <label>Email me with news and offers</label>
                    </div> */}
                </div>
                <div id="mainContent">
                    <h2>Shipping address</h2>
                    <div id="pincode" className="field">
                        <h3></h3>
                        <input id="pin" className="inputs" type="number" onChange={handleChange} placeholder="PIN code"/>
                    </div>
                    <div id="regionDiv" className="field">
                        <p id="region">Country/region</p>
                        <select id="country" onChange={handleChange} className="inputs">
                            <option value="India">India</option>
                        </select>
                    </div>

                    <div className="field names">
                        <div id="first">
                            <input id="firstName" className="inputs" onChange={handleChange} type="text" placeholder="First name"/>
                        </div>
                        <div id="second">
                            <input id="lastName" className="inputs" onChange={handleChange} type="text" placeholder="Last name"/>
                        </div>

                    </div>
                    <div id="addressDiv" className="field">
                        <h3></h3>
                        <input id="address" className="inputs" type="text" onChange={handleChange} placeholder="Address"/>
                    </div>
                    <div id="cityState" className="field names">
                        <div id="cityDiv">
                            <input id="city" className="inputs" type="text" onChange={handleChange} placeholder="City name"/>
                        </div>
                        <div id="stateDiv">
                            <select id="state" className="inputs" onChange={handleChange} type="text" placeholder="State"> 
                                <option value="">State</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Ladakh">Ladakh</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                        
                            </select>
                        </div>

                    </div>
                    <div id="phoneDiv" className="field">
                        <h3></h3>
                        <input id="phone" className="inputs" type="text" onChange={handleChange} placeholder="Phone"/>
                    </div>

                </div>
                <div id="phoneDiv" className="field names">
                    <input onChange = {handleChange} className="inputs" id = "cardNumber" type="number" placeholder = "Enter Debit card Number" required/>
                    <input onChange = {handleChange} className="inputs" id = "name" type="text" placeholder = "Enter Name on Card" required/>
                    <input onChange = {handleChange} className="inputs" id = "cvv" type="number" placeholder = "Enter CVV"  required/>
                    <input onChange = {handleChange} className="inputs" id = "date" type="date" name="" placeholder = "Enter Card Expiry Date "  required/>
                </div>
                <div id="buttonDiv">
                    {/* <button id="proceed" onClick={handleSubmit}>Proceed to pay</button> */}
                    { isAuth == true ? <button onClick={() => Proceed()}id="payBtn">
                    Proceed to Checkout
                </button> : <button onClick={
                        () => ProceedToLogin()
                    }
                    id="payBtn">
                    Proceed to Checkout
                </button>
            }
                </div>
                <hr/>
                <footer>
                    <a href="">Refund policy</a>
                    <a href="">Shipping policy</a>
                    <a href="">Privacy policy</a>
                    <a href="">Terms of service</a>
                </footer>

            </div>
            <div id="itemsDiv">
                <div className="order-summary">
                {cart.map((e) => (
                    <div className="cartItem">
                        {/* {totalOffPrice+=e.qty * e.off_price}
                        {totalAmount += e.qty * e.price} */}
                        <img className="cartImg" src={e.images} alt="" />
                        <div className="content">
                            <p className="title">{e.title}</p>
                            <p>Price: {e.price}/-</p>
                            {/* <p>Brand: {e.brand}</p>
                            <p>Color: {e.color}</p> */}

                            <div style={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <p>Quantity: </p>
                                <button  className="small" onClick={() =>  decrementQuantity(e._id)}>-</button>
                                <p> { e.qty } </p>
                                <button className="small" onClick={() => incrementQuantity(e._id)}>+</button>
                            </div>
                            <button id = "deleteBtn" onClick={()=>deleteItem(e._id)}>Remove</button>
                        </div>
                    </div>
                ))}
                {/* <CartContext.Provider
                    value={{ ...state, clearCart, removeItem, increment, decrement }}>
                    <ContextCart />
                </CartContext.Provider> */}
                </div>
                <br />
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
                    <p>{totalOffPrice-totalAmount}/-</p>
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
                {/* <button className="place" onClick={Payment}>Make Payment</button> */}
            </div>    
                <div className="total">
                    <Link to={"/login"}><button className="log-in">LOGIN / REGISTER</button></Link>
                </div>
            </div>

        </div>
    </div>
    )
}