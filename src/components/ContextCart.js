import React, { useContext } from "react";
import Items from "./Items";
import Navbar from "./Navbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import { CartContext } from "./Payment";

const ContextCart = () => {
  // cosumer
  const { item, totalAmount, totalItems, clearCart } = useContext(CartContext);
  return (
    <>
          <div className="cart-items-container">
            <Scrollbars className="cart-items-container">
              {item.map((curItem) => {
                return <Items key={curItem.id} {...curItem} />;
              })}
            </Scrollbars>
          </div>
      {/* <Navbar />
      <section className="main-cart-section">
        <h1>shopping Cart</h1>
        <p className="total-items">
          you have <span className="total-items-count">{totalItems} </span>
          items in shopping cart
        </p>

        <div className="cart-items">
        </div> */}
        {/* <div className="card-total">
          <h3>
            card total: <span> {totalAmount}₹ </span>
          </h3>
          <button>CheckOut</button>
          <button onClick={clearCart}>Clear Cart</button>
        </div> */}
      {/* </section> */}
    </>
  );
};

export default ContextCart;
