import React from "react";
import ModalImage from "react-modal-image";
import Record from "./../../images/record.jpeg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {CloseOutlined} from '@ant-design/icons'

const ProductCardInCheckout = ({ p }) => {
  let dispatch = useDispatch();

  const handleQuantityChange = e => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`Max available quantity : ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
const handleRemove=()=>{
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i,1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    } 
}
  return (
    <tbody>
      <tr>
        <td>
          <div className="" style={{ width: "100px", height: "100px" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={Record} large={Record} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>{p.artist}</td>
        <td>{p.label}</td>
        <td>€{p.price}</td>
        <td className="text-center" >
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center"><CloseOutlined  onClick={handleRemove} className="text-danger pointer"/></td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
