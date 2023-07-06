import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../firebase/firebase"; // import your Firebase instance
import StateButton from "./StateButtons";
import OrdersList from "./OrdersList";
import Order from "./Order";
function GeneralOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedState, setSelectedState] = useState("new");

  // Create five state variables to hold the counts
  const [newCount, setNewCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [archivedCount, setArchivedCount] = useState(0);

  useEffect(() => {
    const ordersCollection = collection(db, "Orders");
    onSnapshot(ordersCollection, (ordersSnapshot) => {
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // Includes document ID in the data
      setOrders(ordersList);
    });
  }, []);

  // This function updates the state of the selected order.
  const updateOrderState = async (newState) => {
    if (selectedOrder) {
      const orderRef = doc(db, "Orders", selectedOrder.id);
      await updateDoc(orderRef, {
        state: newState,
      });
      setSelectedOrder((prevState) => ({ ...prevState, state: newState })); // Updates local state.
    } else {
      alert("No order selected.");
    }
  };

  // useEffect to calculate counts each time `orders` array changes
  useEffect(() => {
    setNewCount(orders.filter((order) => order.state === "new").length);
    setSentCount(orders.filter((order) => order.state === "sent").length);
    setSuccessCount(orders.filter((order) => order.state === "success").length);
    setWarningCount(orders.filter((order) => order.state === "warning").length);
    setArchivedCount(
      orders.filter((order) => order.state === "archived").length
    );
  }, [orders]);

  return (
    <div className="p-1 w-full">
      <div>
        <StateButton
          newCount={newCount}
          sentCount={sentCount}
          successCount={successCount}
          warningCount={warningCount}
          archivedCount={archivedCount}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          setSelectedOrder={setSelectedOrder}
        ></StateButton>
        <div className="grid grid-cols-10">
          <div className="col-span-3">
            <OrdersList
              orders={orders}
              selectedState={selectedState}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            ></OrdersList>{" "}
          </div>
          <div className="col-span-7">
            <div className="col-span-8 border p-6 rounded-lg bg-blue-50 shadow-md">
              {selectedOrder ? (
                <Order
                  orders={orders}
                  selectedState={selectedState}
                  selectedOrder={selectedOrder}
                  setSelectedOrder={setSelectedOrder}
                  updateOrderState={updateOrderState}
                  setSelectedState={setSelectedState}
                ></Order>
              ) : (
                <div className="text-center text-red-600 font-semibold">
                  NO ORDER SELECTED
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralOrders;
