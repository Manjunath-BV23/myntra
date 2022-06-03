import "./Products.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/Products/action";
import {addCart} from '../redux/Cart/action';
import { Store } from "@mui/icons-material";
import { usePagination } from "use-pagination-hook";



export const Products = () => {
    const [productData, setProductData] = useState([]);
    // const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.products);
    const { current, pages, display, next, previous } = usePagination({ items: productData, size: 20 });

    console.log(" Stored Products ", products);
    const cart = useSelector((store) => store.cart.cart);

    // console.log("Cart: ", cart)

    useEffect(() => {
        getData()
        setProductData(products)
    },[]);

        // const handleClickCart = (e) => {
        //    dispatch(addCart(e));
        //    axios.post("https://myntra123.herokuapp.com/productdetails",e);
        // }
    

    const getData = () => {
        axios.get(`https://my-myntra-api.herokuapp.com/products`)
        .then((res) => putData(res))
    }

    const putData = (res) => {
        setProductData(res.data);
        dispatch(addProduct(res.data))
    }
    console.log("DAta:", productData)


   const sorting = (e) => {
        const sorting = e.target.value;

        const sortRes = [...products].sort((a, b) => {
            if (sorting === "low") {
                return a.price > b.price ? 1 : -1;
            }

            if (sorting === "high") {
                return a.price < b.price ? 1 : -1;
            }

            if (sorting === "rating") {
                 return a.ratings < b.ratings ? 1 : -1;
            }
        })

        setProductData(sortRes)
   }

   const filterBrand = (e) => {
    const brand = e.target.value;
    console.log(e.target.value)
    const filterData = products.filter((e) => e.brand === brand);
    setProductData(filterData)
}

    const handleCheckedMen = (e) => {
        console.log(e.target.value)
    if (e.target.checked) {
            const rows = products.filter((row) => row.gender === "Men");
            setProductData(rows);
        }
    };

    const handleCheckedWomen = (e) => {
        console.log(e.target.value)

        if (e.target.checked) {
            const rows = products.filter((row) => row.gender === "Women");
            setProductData(rows);
        }
    }

    const handleCheckedKids = (e) => {
        console.log(e.target.value)

        if (e.target.checked) {
        const rows = products.filter((row) => row.gender === "Boys");
        setProductData(rows);
        }
    }

     const handleCheckedGirls = (e) => {
        console.log(e.target.value)

         if (e.target.checked) {
             const rows = [...products].filter((row) => row.gender === "Girls");
             setProductData(rows);
         }
    }

    const handleOne = (e) => {
         if (e.target.checked) {
             const rows = [...products].filter((row) => row.price > 0 && row.price <= 1000);
             setProductData(rows);
         }
    }

    const handleTwo = (e) => {
         if (e.target.checked) {
             const rows = products.filter((row) => row.price > 1000 && row.price <= 1500);
             setProductData(rows);
         }
    }

      const handleThree = (e) => {
         if (e.target.checked) {
             const rows = [...products].filter((row) => row.price > 1500 && row.price <= 2000);
             setProductData(rows);
         }
    }

      const handleFour = (e) => {
         if (e.target.checked) {
             const rows = [...products].filter((row) => row.price > 2000 && row.price <= 2500);
             setProductData(rows);
         }
    }

    return (
        <div className="mainDiv">
            <div style={{marginLeft:"2%",lineHeight:"30%"}}>
                <p style={{fontSize:"18px"}}>Home</p>
                <p style={{ fontSize: "18px", fontWeight: "700" }}>Myntra Fashion Store<span style={{ color: "grey", fontWeight: "400" }}>-1245 items</span></p>
                <div style={{display: "flex"}}>
                    <p className="filters">FILTERS</p>
                    <select className="selectBtn" onChange={sorting}>
                        <option>Select</option>
                        <option value="low">Price : Low to High</option>
                        <option value="high">Price : High to Low</option>
                        <option value="rating">Customer Rating</option>
                    </select>
                    <input style={{ marginLeft:"2%",width:"25%",height:"35px",marginTop:"15px" }} type="text" placeholder="Search product here" onChange={(e)=>setSearch(e.target.value)}/>
                    <div className="btnDivpage">
                        <button className="prevBtn" disabled={current === 1} onClick={previous}>Prev</button>
                        <p className="pageNum">{current}</p>
                        <button className="nextBtn" disabled={current === pages} onClick={next}>Next</button>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="prodctDiv">
                <div className="leftDiv">
                    <div className="checkDiv">
                         <input type="checkbox" onChange={handleCheckedMen} /><label>Men</label>
                        <br/>
                        <input type="checkbox" onChange={handleCheckedWomen}  /><label>Women</label>
                        <br/>
                        <input type="checkbox" onChange={handleCheckedKids} /><label>Boys</label>
                        <br/>
                        <input type="checkbox" onChange={handleCheckedGirls}/><label>Girls</label>
                   </div>
                    <hr />
                    <div className="checkDiv1">
                        <h4>PRICE</h4>
                         <input type="checkbox" onChange={handleOne} /><label>RS. 0 to RS.1000</label>
                        <br/>
                        <input type="checkbox" onChange={handleTwo}/><label>RS. 1001 to RS.1500</label>
                        <br/>
                        <input type="checkbox" onChange={handleThree}/><label>Rs. 1501 to Rs.2000</label>
                        <br/>
                        <input type="checkbox" onChange={ handleFour}/><label>RS.2001 to RS.2500</label>
                    </div>
                    <hr/>
                      <div className="checkDiv1">
                        <h4>BRAND</h4>
                         <input type="checkbox" value = "H&M" onChange={filterBrand}/><label>H&M</label>
                        <br/>
                        <input type="checkbox" value = "NOVA" onChange={filterBrand}/><label>NOVA</label>
                        <br/>
                        <input type="checkbox" value = "LOreal" onChange={filterBrand}/><label>LOreal</label>
                        <br/>
                        <input type="checkbox" value = "TNW" onChange={filterBrand} /><label>TNW</label>
                         <br/>
                        <input type="checkbox" value = "CORE" onChange={filterBrand}/><label>CORE</label>
                         <br/>
                        <input type="checkbox"/><label>HRX</label>
                         <br/>
                        <input type="checkbox"/><label>Khadi Bhandar</label>
                         <br/>
                        <input type="checkbox" /><label>Myntra Super</label>
                         <br/>
                        <input type="checkbox"/><label>OneX</label>
                    </div>
                    <hr/>
                      <div className="checkDiv1">
                        <h5>DISCOUNT RANGE</h5>
                         <input type="checkbox" value = {10}/><label>10% and above</label>
                        <br/>
                        <input type="checkbox" /><label>20% and above</label>
                        <br/>
                        <input type="checkbox" /><label>30% and above</label>
                        <br/>
                        <input type="checkbox" /><label>40% and above</label>
                        <br/>
                        <input type="checkbox" /><label>50% and above</label>
                        <br/>
                        <input type="checkbox" /><label>60% and above</label>
                        <br/>
                        <input type="checkbox" /><label>70% and above</label>
                        <br/>
                        <input type="checkbox" /><label>80% and above</label>
                        <br/>
                        <input type="checkbox" /><label>90% and above</label>
                   </div>
                   
                </div>
                <div className="rightDiv">
                    {
                        display.filter((name) =>{
                                if (search === "") {
                                    return productData;
                                } else {
                                    return name.category.toLowerCase().includes(search.toLowerCase());
                                }
                        }).map((e) => (
                            <div className="mainBox" key={e._id}>
                                <img className="prodImg" src={e.images} alt="" />
                                <p style={{fontSize:"15px",fontWeight:"700"}}>{e.brand}</p>
                                <p style={{lineHeight: "1%",color:"#323136",fontSize:"15px"}}>{e.category}</p>
                                <div style={{ display: 'flex' }}><p style={{ fontSize: "15px", fontWeight: "700" }}>{"Rs. " + e.price}</p><p style={{ marginLeft: "2%", textDecoration: "line-through", fontSize: "13px" }}>{"Rs." + e.off_price}</p><p style={{ marginLeft: "4%", fontSize: "13px", color: "#FF905A" }}>({e.discount} %OFF)</p></div>
                                <button onClick={() => dispatch(addCart(e))}>ADD to Cart</button>
                            </div>
                        ))
                    }

                </div>
            </div>
            
       </div>
   )
}