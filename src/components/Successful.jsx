import { useSelector } from "react-redux";
import "./Successful.css"

export const Successful = () => {
  const order = useSelector((store) => store.cart.order);
  console.log("Order:", order)

    return (
        <div className="back">
            <h1>Helo</h1>
            <img className="background" src="https://egsgroup.files.wordpress.com/2017/02/payment-successful.png" alt="" />

        </div>
    )
}