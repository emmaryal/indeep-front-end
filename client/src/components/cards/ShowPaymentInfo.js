import { OrderedListOutlined } from "@ant-design/icons";
import react from "react";


const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div className="">
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {" / "}
      <span>
        Amount:{" / "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-UK", {
          style: "currency",
          currency: "EUR",
        })}
      </span>
      {" / "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Ordered On:{" "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <br/>
      {showStatus ? <span className="badge bg-primary text-white">
        STATUS: {order.orderStatus}
      </span> : null }
    </p>
  </div>
);
export default ShowPaymentInfo;
