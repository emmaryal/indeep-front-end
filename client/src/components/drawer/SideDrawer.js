import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Record from "./../../images/record.jpeg";

const imageStyle = {
  width: "100%"
};
const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} products`}
      placement="right"
      closeable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
                <>  
              <img src={p.images[0].url} style={imageStyle} alt="" />
              <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p> </>
            
 ) : (<>
              <img src={Record} style={imageStyle} alt="" />
              <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to='/cart' >
          <button onClick={() =>
          dispatch({
              type: "SET_VISIBLE",
              payload: false
          })} 
          className="btn btn-raised btn-primary btn-block text-center">
Go To Cart
          </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
