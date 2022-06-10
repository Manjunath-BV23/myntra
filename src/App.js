import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import  {Home} from "./components/Home";
import {Navbar} from "./components/Navbar";
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Products } from './components/Products';
import { Cart } from './components/Cart';
import { Payment } from './components/Payment';
import { Successful } from './components/Successful';
import { Orders } from './components/Orders';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/successful" element={<Successful />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
