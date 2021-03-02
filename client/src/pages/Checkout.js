import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
} from "./../functions/user";

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("test");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  // const [didMount, setDidMount] = useState(false); 

  // useEffect(() => {
  //    setDidMount(true);
  //    return () => setDidMount(false);
  // }, [])
  
  // if(!didMount) {
  //   return null;
  // }

  //this runs when hit refresh page, want it to load on initial page render.....
  useEffect(() => {
    getUserCart(user.token).then((res) => {
    //   console.log(
    //     "user cart response - in checkout page",
    //     JSON.stringify(res.data, null, 4)
    //   ); //null & 4 are additional arguments given to JSON stringify to make it more readable
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    //   console.log("products in checkout", products);
   
    });
  });
  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    //remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Continue shopping");
    });
  };

  const saveAddressToDb = () => {
    console.log("address :", address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved");
      } else toast.warning("address not saved");
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        {/* {JSON.stringify({ products })} */}

        <hr />
        <p>Products {products.length} </p>

        <hr />
        {products.map((p, i) => (
          <div key={i}>
            {/* {console.log("p", p)}
            {console.log("p.product", p.product)} */}
            {/* {console.log("p", p)} */}
            <p>
              {p.product.title} x {p.count} = €{p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: €{total}</p>

        <div className="row">
          <div className="col-md-6">
            <button
              disabled={!addressSaved || !products.length}
              className="btn btn-primary"
            onClick={() =>history.push('/payment')}
            >
              Place Order
            </button>
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
