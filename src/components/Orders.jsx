import { useSelector } from "react-redux"

export const Orders = () => {
    const orders = useSelector((store) => store.cart.cart)
    console.log("Orders: ", orders)
    return(
        <div className="items">
            <h1>Your Orders...</h1>
        {/* <h1>Debit-Card Payment</h1> */}
            {orders.map((e) => (
                    <div className="cartItem">
                        <img className="cartImg" src={e.id.images} alt="" />
                        <div>
                            <p>{e.id.title}</p>
                            <p>Price: {e.id.price}/-</p>
                        </div>
                    </div>
            ))}                       
        </div>
    )
}