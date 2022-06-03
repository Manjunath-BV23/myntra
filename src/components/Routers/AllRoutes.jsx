import { Home } from '../Home';
import { Routes,Route } from 'react-router-dom';
import { Login } from '../Login';
import { Signup } from '../Signup';
import { Products } from '../Products';
import { Cart } from '../Cart';
import { Navbar } from '../Navbar';


export const AllRoutes = () => {
    return (
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      );
}