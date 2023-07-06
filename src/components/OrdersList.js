import React from "react";

const OrdersList = ({
  orders,
  setSelectedOrder,
  selectedOrder,
  selectedState,
}) =>
  orders.map(
    (order, index) =>
      order.state == selectedState && (
        <div
          className={` border border-slate-800 bg-slate-100 hover:bg-slate-300 rounded p-4 m-2 ${
            order.id == selectedOrder?.id
              ? "bg-slate-400 hover:bg-slate-400"
              : ""
          }`}
          key={index}
          onClick={() => setSelectedOrder(order)}
        >
          {index} {order.email}
        </div>
      )
  );

export default OrdersList;
