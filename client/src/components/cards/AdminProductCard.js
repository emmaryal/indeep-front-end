import React from "react";
import { Card } from "antd";
import record from "./../../images/record.jpeg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug, artist, label, price } = product;

  return (
    <Card
    style={{ width: '250px', height: '250px' }}
      cover={
        <img
          src={images && images.length ? images[0].url : record}
          style={{ height: "250px", width: "250px", 
          // objectFit: "cover" 
          }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}

        // description={`${description && description.substring(0, 40)}...`}
      />
      {/* <div className="pt-3">
      <p>Artist: {artist}</p>
      <p>Label: {label}</p>
      <p>Price: €{price}</p>
    </div> */}
    </Card>
  );
};

export default AdminProductCard;
