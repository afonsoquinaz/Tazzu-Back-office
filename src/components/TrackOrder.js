// File: src/components/TrackOrder.js

import React, { useState } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase"; // import your Firebase instance
import Order from "./Order";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    setLoading(true);
    const docRef = doc(db, "Orders", orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setOrder({ id: docSnap.id, ...docSnap.data() });
    } else {
      alert("No such order!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
      <div className="w-full max-w-md">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="order-id"
          type="text"
          placeholder="Enter your order ID here"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={trackOrder}
          disabled={loading}
        >
          Track Order
        </button>
        {order && <Order selectedOrder={order} />}{" "}
        {/* Display Order component if order is not null */}
      </div>
    </div>
  );
};

export default TrackOrder;
