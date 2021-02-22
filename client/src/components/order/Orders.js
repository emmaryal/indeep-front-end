import React from "react";
// import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import ShowPaymentInfo from "./../../components/cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {

    const showOrderInTable = (order) => (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Label</th>
              <th scope="col">Price</th>
              <th scope="col">Count</th>
             
            </tr>
          </thead>
    
          <tbody>
            {order.products.map((p, i) => (
              <tr key={i}>
                <td>
                  <b>{p.product.title}</b>
                </td>
                <td>{p.product.artist}</td>
                <td>{p.product.label}</td>
                <td>€{p.product.price}</td>
                <td>{p.count}</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      );



   return (<>
    {orders.map((order) => (
      <div className="row pb-5" key={order._id}>
        <div className="btn btn-block bg-light">
          <ShowPaymentInfo order={order} showStatus={false}/>
          <div className="row">
            <div className="col-md-4">Delivery Status</div>
            <div className="col-md-8">
              <select
                className="form-control"
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                name="status"
                defaultValue={order.orderStatus}
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Competed">Competed</option>
              </select>
            </div>
          </div>
        </div>
        {showOrderInTable(order)}
      </div>
    ))}
  </>)
};
export default Orders;
