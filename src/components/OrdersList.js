import React from "react";

const OrdersList = ({
  orders,
  setSelectedOrder,
  selectedOrder,
  selectedState,
}) => {
  // Sort orders by timestamp in descending order
  const state = selectedState.toLowerCase();
  const sortedOrders = (state === 'success' || state === 'warning' || state === 'archived') ?
    orders.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return b.timestamp - a.timestamp;
      }
      if (!a.timestamp && !b.timestamp) {
        return 0;
      }
      if (!a.timestamp) {
        return 1;
      }
      return -1;
    }) :
    orders.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      if (!a.timestamp && !b.timestamp) {
        return 0;
      }
      if (!a.timestamp) {
        return 1;
      }
      return -1;
    });

  return sortedOrders.map(
    (order, index) =>
      order.state === selectedState && (
        <div
          className={`border border-slate-800 bg-slate-100 hover:bg-slate-300 rounded p-4 m-2 ${order.id === selectedOrder?.id ? "bg-slate-400 hover:bg-slate-400" : ""
            }`}
          key={index}
          onClick={() => setSelectedOrder(order)}
        >
          {index} {order.email}
        </div>
      )
  );
};

export default OrdersList;
