import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  getProductsByCount,
  fetchProductsByFilter
} from './../../../functions/product';
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from './../../../functions/product';
//import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Menu, Slider, Checkbox} from "antd";
import { EuroOutlined, DownSquareOutlined } from "@ant-design/icons";
import { getCategories } from './../../../functions/category'
import Search from './../../../components/forms/Search'
import { useSelector, useDispatch } from "react-redux";

const { SubMenu} = Menu;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
//from shop
const [price, setPrice] = useState([0, 0]);
const [ok, setOk] = useState(false);
const [categories, setCategories] = useState([]);
const [categoryIds, setCategoryIds] = useState([]);

let dispatch = useDispatch();
let { search } = useSelector((state) => ({ ...state }));
const { text } = search;







  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
      //fetch categories
      getCategories().then((res) => setCategories(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(2000)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };


//from shop

 //load products based on user search input
 useEffect(() => {
  const delayed = setTimeout(() => {
    fetchProducts({ query: text });
  }, 300);
  return () => clearTimeout(delayed);
}, [text]);

const fetchProducts = (arg) => {
  fetchProductsByFilter(arg).then((res) => {
    setProducts(res.data);
  });
};

//load products based on price range
useEffect(() => {
  console.log("ok to request");
  fetchProducts({ price });
}, [ok]);

const handleSlider = (value) => {
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  setCategoryIds([]);
  setPrice(value);
  setTimeout(() => {
    setOk(!ok);
  }, 300);
};

//load products based on category
const showCategories = () =>
  categories.map((c) => (
    <div key={c._id}>
      <Checkbox
        onChange={handleCheck}
        className="pb-2 pl-4 pr-4"
        value={c._id}
        name="category"
        checked={categoryIds.includes(c._id)}
      >
        {c.name}
      </Checkbox>

      <br />
    </div>
  ));

// handle check for categories
const handleCheck = (e) => {
  dispatch({
      type: 'SEARCH_QUERY',
      payload: {text: ''}
  });
  setPrice([0,0])
//console.log(e.target.value)
let inTheState = [...categoryIds];
let justChecked = e.target.value;
let foundInTheState = inTheState.indexOf(justChecked); // will return true or -1

if (foundInTheState === -1) {
  inTheState.push(justChecked);
} else {
  inTheState.splice(foundInTheState, 1);
}
  setCategoryIds(inTheState);
  console.log(inTheState);
  fetchProducts({ category: inTheState });

};



  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
<br />
<br />
          <h5>Search / Filter / Sort</h5>
          <hr />

          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
         
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <EuroOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(value) => `€${value}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="1000" //or find max price from db
                />
              </div>
            </SubMenu>
            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>
          </Menu>











        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-3 pb-3">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;