import React, { useEffect, useState } from "react";
import BestSellers from "./../components/Home/BestSellers";
import Jumbotron from "./../components/cards/Jumbotron";
import NewArrivals from "./../components/Home/NewArrivals";
import CategoryList from './../components/category/CategoryList'
import SubList from './../components/sub/SubList'


const Home = () => {
  return (
    <>
      <div
        className="jumbotron h1 text-center font-weight-bold"
        style={{ font: "AmericanTypewriter" }}
      >
        <Jumbotron text={["InDeep Records", "Rare & Hard to Find Vinyl"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron ">
        New Arrivals
      </h4>
      <NewArrivals />
     

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron ">
        Best Sellers
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron ">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron ">
        Sub Categories
      </h4>
      <SubList />

      
      <br />
      <br />
    </>
  );
};

export default Home;
