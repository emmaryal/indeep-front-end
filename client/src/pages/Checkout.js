import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress } from "./../functions/user";

const Checkout = () => {
 
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart response - in checkout page", JSON.stringify(res.data, null, 4)); //null & 4 are additional arguments given to JSON stringify to make it more readable
      setProducts(res.data.products);
      setTotal(res.data.cartTotal)
      console.log("products", products)
    });
  }, []);
const emptyCart = () => {
if (typeof window !== 'undefined'){
    localStorage.removeItem('cart')
}
// remove from redux
dispatch({
    type: 'ADD_TO_CART',
    payload: []
});
//remove from backend
emptyUserCart(user.token)
.then((res)=>{
    setProducts([]);
    setTotal(0);
    toast.success('Cart is empty. Continue shopping');
});
}

const saveAddressToDb = () => {}


  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        textarea
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        {JSON.stringify({products})}

        <hr />
        <p>Products {products.length} </p>
     
        <hr />
        {products.map((p,i) =>(
            <div key={i}>
            {console.log("p", p)}
            {console.log("p.product", p.product)}
            {/* {console.log("p", p)} */}
                <p>{p.product.title} x {p.count} = {" "}
                €{p.product.price * p.count }</p>
            </div>
        ))}
        <hr />
        <p>Cart Total: €{total}</p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
            <button disabled ={!products.length} onClick={emptyCart} className="btn btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
