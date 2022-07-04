import "./Products.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProductData, getProductLoading} from "../redux/Products/action";
import {getCartData} from '../redux/Cart/action';
import { Store } from "@mui/icons-material";
import { usePagination } from "use-pagination-hook";



export const Products = () => {
    // export const addData = (data) => {
    //     // console.log("I'm here")
    //     setProductData(data)
    //     // dispatch(addProduct(res.data))
    // }

    const [productData, setProductData] = useState([]);
    // const [page, setPage] = useState(1);
    const [tick, setTick] = useState(false)
    const [brandfilter, setBrandfilter] = useState(false)
    const [pricefilter, setPricefilter] = useState(false)
    const [test, setTest] = useState(true)
    const [disc, setDisc] = useState(false)
    const [category, setCategory] = useState(false)
    
    const [search, setSearch] = useState("");
    let cat = 0
    
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((store) => store.products);
    console.log(loading, error)


    const check = () => {
        if(test) {
            return products
        }else {
            return productData
        }
    }

    const { current, pages, display, next, previous } = usePagination({ items: check(), size: 20 });

    console.log(" Stored Products ", products);
    const cart = useSelector((store) => store.cart.cart);

    console.log("Cart: ", cart.id)

    useEffect(() => {
        getData();
        getCart();
        // callBack()
    },[]);



   

    const getData = () => {
        dispatch(getProductData())
    }

    console.log("DAta:", productData)


   const sorting = (e) => {
       setTest(false)
        const sorting = e.target.value;
        if(tick == false){

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
        else if(tick == true){

            const sortRes = [...productData].sort((a, b) => {
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
   }

   const filterBrand = (e) => {
    setTest(false)
    const brand = e.target.value;
    console.log(e.target.value)
    if(tick == false){
        if(brand == "all"){
        
            setProductData(products)
        }else {
            const filterData = products.filter((e) => e.brand === brand);
            setProductData(filterData)
        }
    }
    else {

        if(brand == "all"){
            
            setProductData(productData)
        }else {
            const filterData = productData.filter((e) => e.brand === brand);
            setProductData(filterData)
        }
    }
    // if(brandfilter === false){
    //     setProductData(filterData)
    //     setBrandfilter(true)
    // }else {
    //     setProductData([...productData, ...filterData]);
    // }
}
const filterDiscount = (e) => {
    
    setTest(false)
    const discount = e.target.value;
    console.log(e.target.value)
    if(tick == false){
        // if(disc == false){
        //     const filterData = [...products].filter((e) => e.discount >= discount);
        //     console.log("DIs: ", filterData)
        //     setProductData(filterData)
        //     setDisc(true)
        // }
        // else {
        //     const filterData = [...productData].filter((e) => e.discount >= discount);
        //     console.log("DIs: ", filterData)
        //     setProductData([...productData, ...filterData])
        // }
        const filterData = products.filter((e) => Number(e.discount) >= discount);
        console.log("DIs: ", filterData)
        setProductData(filterData)
        setDisc(true)

    }
    else{

        if(disc == false){
            const filterData = [...productData].filter((e) => Number(e.discount) >= discount);
            console.log("DIs: ", filterData)
            setProductData(filterData)
            setDisc(true)
        }
        else {
            const filterData = [...products].filter((e) => Number(e.discount) >= discount);
            console.log("DIs: ", filterData)
            setProductData([...productData, ...filterData])
        }
    }
    setTick(true)
}
const callBack  = ()=>{
    handleCheckedMen()
    handleCheckedGirls()
    handleCheckedKids()
    handleCheckedWomen()
}

    const handleCheckedMen = (e) => {

        setTest(false)
        console.log(e.target.value)
    if (e.target.checked) {
            const rows = [...products].filter((row) => row.gender === "Men");
            if(tick === false){
                setProductData(rows)
                setTick(true)
            }else {
                const row = [...productData].filter((row) => row.gender === "Men");
                if(category  == false){
                    setProductData(row);
                }
                else{
                    const filt = [...products].filter((row) => row.gender === "Men");
                    setProductData([...productData, ...filt]);
                }
            }
            setCategory(true)
            setTick(true)
            cat++
        }
        else {
            cat--
            if(cat <= 0){
                
                setProductData(products)
                // setTick(false)
            }
            // else{
            //     const filt = [...products].filter((row) => row.gender === "Men");
            //     setProductData([...productData, ...filt]);
            // }
        }
    };

    const handleCheckedWomen = (e) => {
        setTest(false)
        console.log(e.target.value)
        if (e.target.checked) {
            const rows = [...products].filter((row) => row.gender === "Women");
            if(tick === false){
                setProductData(rows)
                setTick(true)
            }else {
                const row = [...productData].filter((row) => row.gender === "Women");
                if(category  == false){
                    setProductData(row);
                }
                else{
                    const filt = [...products].filter((row) => row.gender === "Women");
                    setProductData([...productData, ...filt]);
                }
            }
            setCategory(true)
            setTick(true)
            cat++
        }
        else {
            cat--
            if(cat <= 0){
                
                setProductData(products)
                // setTick(false)
            }
            // else{
            //     const filt = [...products].filter((row) => row.gender === "Women");
            //     setProductData([...productData, ...filt]);
            // }
        }
        // if (e.target.checked) {
        //     const rows = [...products].filter((row) => row.gender === "Women");
        //     if(tick == false){
        //         setProductData(rows)
        //         setTick(true)
        //     }else {
        //         setProductData([...productData, ...rows]);
        //     }
        // }
    }

    const handleCheckedKids = (e) => {
        setTest(false)
        console.log(e.target.value)
        if (e.target.checked) {
            const rows = [...products].filter((row) => row.gender === "Boys");
            if(tick === false){
                setProductData(rows)
                setTick(true)
            }else {
                const row = [...productData].filter((row) => row.gender === "Boys");
                if(category  == false){
                    setProductData(row);
                }
                else{
                    const filt = [...products].filter((row) => row.gender === "Boys");
                    setProductData([...productData, ...filt]);
                }
            }
            setCategory(true)
            setTick(true)
            cat++
        }
        else {
            cat--
            if(cat <= 0){
                
                setProductData(products)
                // setTick(false)
                
            }
            // else{
            //     const filt = [...products].filter((row) => row.gender === "Boys");
            //     setProductData([...productData, ...filt]);
            // }
        }
    }

     const handleCheckedGirls = (e) => {
        setTest(false)
        console.log(e.target.value)
        if (e.target.checked) {
            const rows = [...products].filter((row) => row.gender === "Girls");
            if(tick === false){
                setProductData(rows)
                setTick(true)
            }else {
                const row = [...productData].filter((row) => row.gender === "Girls");
                if(category  == false){
                    setProductData(row);
                }
                else{
                    const filt = [...products].filter((row) => row.gender === "Girls");
                    setProductData([...productData, ...filt]);
                }
            }
            setCategory(true)
            setTick(true)
            cat++
        }
        else {
            cat--
            if(cat <= 0){
                
                setProductData(products)
                
            }
            // else{
            //     const filt = [...products].filter((row) => row.gender === "Girls");
            //     setProductData([...productData, ...filt]);
            // }
        }
    }

    const handleOne = (e) => {
        setTest(false)
         if (e.target.checked) {
             if(tick == false){
                 const rows = [...products].filter((row) => row.price > 0 && row.price <= 1000);
                 if(pricefilter == false){
                    setProductData(rows)
                    setPricefilter(true)
                }else {
                    setProductData([...productData, ...rows]);
                }
             }else{
                 const rows = [...productData].filter((row) => row.price > 0 && row.price <= 1000);
                 if(pricefilter == false){
                    setProductData(rows)
                    setPricefilter(true)
                }else {
                    const rows = [...products].filter((row) => row.price > 0 && row.price <= 1000);
                    setProductData([...productData, ...rows]);
                }

             }
             setTick(true)
         }
    }

    const handleTwo = (e) => {
        setTest(false)
        if (e.target.checked) {
            if(tick == false){
                const rows = [...products].filter((row) => row.price > 1000 && row.price <= 1500);
                if(pricefilter == false){
                   setProductData(rows)
                   setPricefilter(true)
               }else {
                   setProductData([...productData, ...rows]);
               }
            }else{
                const rows = [...productData].filter((row) => row.price > 1000 && row.price <= 1500);
                if(pricefilter == false){
                   setProductData(rows)
                   setPricefilter(true)
               }else {
                   const rows = [...products].filter((row) => row.price > 1000 && row.price <= 1500);
                   setProductData([...productData, ...rows]);
               }

            }
            setTick(true)
        }
    }

      const handleThree = (e) => {
        setTest(false)
        if (e.target.checked) {
            if(tick == false){
                const rows = [...products].filter((row) => row.price > 1500 && row.price <= 2000);
                if(pricefilter == false){
                   setProductData(rows)
                   setPricefilter(true)
               }else {
                   setProductData([...productData, ...rows]);
               }
            }else{
                const rows = [...productData].filter((row) => row.price > 1500 && row.price <= 2000);
                if(pricefilter == false){
                   setProductData(rows)
                   setPricefilter(true)
               }else {
                   const rows = [...products].filter((row) => row.price > 1500 && row.price <= 2000);
                   setProductData([...productData, ...rows]);
               }

            }
            setTick(true)
        }
    }

      const handleFour = (e) => {
        setTest(false)
        if (e.target.checked) {
            if(tick == false){
                const rows = [...products].filter((row) => row.price > 2000 && row.price <= 2500);
                if(pricefilter == false){
                   setProductData(rows)
                   setPricefilter(true)
               }else {
                   setProductData([...productData, ...rows]);
               }
            }else{
                const rows = [...productData].filter((row) => row.price > 2000 && row.price <= 2500);
                if(pricefilter == false){
                   setProductData(rows)
                   setPricefilter(true)
               }else {
                   const rows = [...products].filter((row) => row.price > 2000 && row.price <= 2500);
                   setProductData([...productData, ...rows]);
               }

            }
            setTick(true)
        }
    }

    const getCart = () => {
        dispatch(getCartData())
    }

    const addCartItem = (e) =>{
        console.log("ADDED", e)
        // dispatch(addCart(e))

        axios.post("https://myntra-updated.herokuapp.com/cart", e).then(() => getCart())
    }
    // loading ? ("Loading...."): error ?("Error Occured") :

    return  (
        <div className="mainDiv">
            <div style={{marginLeft:"2%",lineHeight:"1px"}}>
                <p style={{fontSize:"18px"}}>Home</p>
                <p style={{ fontSize: "18px", fontWeight: "700" }}>Myntra Fashion Store<span style={{ color: "grey", fontWeight: "400" }}>- {products.length} items</span></p>
                <div style={{display: "flex"}}>
                    <p className="filters">FILTERS</p>
                    <select className="selectBtn" onChange={sorting}>
                        <option>Select</option>
                        <option value="low">Price : Low to High</option>
                        <option value="high">Price : High to Low</option>
                        <option value="rating">Customer Rating</option>
                    </select>
                    <input style={{ marginLeft:"2%",width:"16%",height:"35px",marginTop:"15px" }} type="text" placeholder="Search product here" onChange={(e)=>setSearch(e.target.value)}/>
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
                        <input type="checkbox" value = "all" onChange={filterBrand}/><label>All Brands</label>
                        {/* <br/>
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
                        <input type="checkbox"/><label>OneX</label> */}
                    </div>
                    <hr/>
                      <div className="checkDiv1">
                        <h5>DISCOUNT RANGE</h5>
                         <input type="checkbox" value = {10} onChange={filterDiscount}/><label>10% and above</label>
                        <br/>
                        <input type="checkbox" value = {20} onChange={filterDiscount} /><label>20% and above</label>
                        <br/>
                        <input type="checkbox" value = {30} onChange={filterDiscount} /><label>30% and above</label>
                        <br/>
                        <input type="checkbox" value = {40} onChange={filterDiscount} /><label>40% and above</label>
                        <br/>
                        <input type="checkbox" value = {50} onChange={filterDiscount}/><label>50% and above</label>
                        <br/>
                        <input type="checkbox" value = {60} onChange={filterDiscount}/><label>60% and above</label>
                        <br/>
                        <input type="checkbox" value = {70} onChange={filterDiscount}/><label>70% and above</label>
                        <br/>
                        <input type="checkbox" value = {80} onChange={filterDiscount}/><label>80% and above</label>
                        <br/>
                        <input type="checkbox" value = {90} onChange={filterDiscount}/><label>90% and above</label>
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
                                <button className="cartBtn" onClick={() => {addCartItem(e)}}>ADD TO CART</button>
                            </div>
                        ))
                    }

                </div>
            </div>
            
       </div>
   )
}

