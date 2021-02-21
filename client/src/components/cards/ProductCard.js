import React, {useState} from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import record from "./../../images/record.jpeg";
import { Link } from "react-router-dom";
import _ from "lodash";
import {useSelector, useDispatch} from 'react-redux'


const { Meta } = Card;

const ProductCard = ({ product }) => {
  //destructure
  const { images, title, description, slug, artist, label, price } = product;
  //tooltip
  const [tooltip, setTooltip] = useState("Click to add");
//redux
const {user, cart} = useSelector(state => ({...state}))
const dispatch = useDispatch()


  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");


      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique
      })
      dispatch({
        type: "SET_VISIBLE",
        payload: true
      })
    }
  };

  return (
    <>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : record}
            style={{ height: "250px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br /> 
              {product.quantity <1 ? 'Out of Stock' :'Add to Cart'}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={title}

          // artist={artist}
          // label={label}
        />
        {/* <div className="pt-3">
      <p>Artist: {artist}</p>
      <p>Label: {label}</p>
      <p>Price: €{price}</p>
    </div> */}
      </Card>
    </>
  );
};

export default ProductCard;
