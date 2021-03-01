import React, { useEffect, useState } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
  getProductsCount,
  getProducts,
} from "./../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./../components/cards/ProductCard";
import { Menu, Slider, Checkbox } from "antd";
import { EuroOutlined, DownSquareOutlined } from "@ant-design/icons";
import { getCategories } from "./../functions/category";
import Search from "./../components/forms/Search";
import CategoryList from "../components/category/CategoryList";
import { Pagination } from "antd";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  // const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(1);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    //fetch categories
    getCategories().then((res) => setCategories(res.data));
  }, []);

  //load products on page load
  const loadAllProducts = () => {
    getProductsByCount(2000).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   loadAllProducts();
  // }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  //load products based on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
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
      <span key={c._id} style={{ display: "inline-flex" }}>
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
      </span>
    ));
  // handle check for categories
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
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

  const sortProducts = () => {

    const sortedProducts = products.sort()
    return sortedProducts
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2 pt-2"> */}
        <hr />
        {/* <h5>Search / Filter / Sort</h5> */}
        <hr />
        <div className="col-md-1" style={{ marginTop: "10px" }}>
          <div style={{ display: "inline" }}>
                  {/* <EuroOutlined />  */}
                  Filter by Price </div> </div>
               <div className="col-md-2" style={{ display: "inline" }}>
            <Slider
              className="mr-2"
              tipFormatter={(value) => `€${value}`}
              range
              value={price}
              onChange={handleSlider}
              max="250" //or find max price from db
            /></div>
   
       
        <div className="col-md-9">
          {" "}
          <div style={{ marginTop: "10px" }}>{showCategories()}</div>
        </div>

        {/* <Menu defaultOpenKeys={["1", "2"]} mode="inline"> */}
        {/* <Search className="m-4 pb-10" /> */}
        {/* <hr />
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <EuroOutlined /> Filter by Price
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
                  max="250" //or find max price from db
                />
              </div>
            </SubMenu> */}
        {/* category */}
        {/* <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showCategories()}</div>
            </SubMenu> */}
        {/* <CategoryList />
          </Menu> */}
        {/* <Pagination
        current={page}
        total={productsCount}
        defaultPageSize={30}
        onChange={(page) => setPage(page)}
      /> */}
      </div>
      {/* main window */}
      <div className="col-md-12 pt-2">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          null
        )}
        {products.length < 1 && <p>No products found</p>}
        {console.log("products-----", products)}
        <div className="row pb-5" style={{ "background-color": "grey" }}>
          {products.map((p) => (
            <div className=" p-3" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Shop;
