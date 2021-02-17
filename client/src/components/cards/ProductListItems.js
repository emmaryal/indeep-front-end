import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    // price,
    // category,
    // subs,
    // shipping,
    // color,
    // brand,
    // sold,
    // quantity,
    title, artist, label, catno, format, price, mediaCondition, sleeveCondition, category, description, quantity, sold, subs
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label-default label-pill pull-xs-right">€{price}</span>
      </li>
      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className=" label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}
{/* 
      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )} */}

      {/* <li className="list-group-item">
        Shipping{" "}
        <span className="label-default label-pill pull-xs-right">{shipping}</span>
      </li> */}
      <li className="list-group-item">
        title{" "}
        <span className="label-default label-pill pull-xs-right">{title}</span>
      </li><li className="list-group-item">
        artist{" "}
        <span className="label-default label-pill pull-xs-right">{artist}</span>
      </li><li className="list-group-item">
        label{" "}
        <span className="label-default label-pill pull-xs-right">{label}</span>
      </li>
      <li className="list-group-item">
        Media Condition{" "}
        <span className="label-default label-pill pull-xs-right">{mediaCondition}</span>
      </li>
      <li className="list-group-item">
        Sleeve Condition{" "}
        <span className="label-default label-pill pull-xs-right">{sleeveCondition}</span>
      </li>
      <li className="list-group-item">
        Cat no.{" "}
        <span className="label-default label-pill pull-xs-right">{catno}</span>
      </li>
      <li className="list-group-item">
        Available{" "}
        <span className="label-default label-pill pull-xs-right">{quantity}</span>
      </li>
      <li className="list-group-item">
        Format{" "}
        <span className="label-default label-pill pull-xs-right">{format}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
