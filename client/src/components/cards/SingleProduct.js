import React, {useState} from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Record from "./../../images/record.jpeg";
import ProductListItems from "./ProductListItems";
import Sound from "react-sound";
import ReactAudioPlayer from "react-audio-player";
import _ from 'lodash'
import {useSelector, useDispatch} from 'react-redux'


const { TabPane } = Tabs;
const SingleProduct = ({ product }) => {
  const { title, description, images, sound } = product;
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
      <div className="col-md-5">
        {images && images.length ? (
          <div className="carousel-container">
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images &&
                images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          </div>
        ) : (
          <Card cover={<img src={Record} className="mb-3 card-image" />} />
        )}
      </div>

      <div className="col-md-3">
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}

            {/* <p>{description && description}</p> */}
          </TabPane>
          <TabPane tab="Listening booth" key="2">
            <ReactAudioPlayer src={product.sound} autoPlay controls />
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-4">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to
              Cart
            </a>
          </Tooltip>,

            <Link to="/">
              <HeartOutlined className="text-info" />
              <br />
              Add to Wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
