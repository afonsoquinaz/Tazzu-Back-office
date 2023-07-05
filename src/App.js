import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  onSnapshot,
} from "@firebase/firestore";
import "./App.css";
import { db } from "../src/firebase/firebase"; // import your Firebase instance

function App() {
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
      <div className="grid grid-cols-5 gap-4">
        <button
          className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300"
          onClick={() => {
            setSelectedState("new");
            setSelectedOrder(null);
          }} // Set selectedState to 'NEW' when clicked
        >
          NEW - {newCount}
        </button>
        <button
          className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300"
          onClick={() => {
            setSelectedState("sent");
            setSelectedOrder(null);
          }} // Set selectedState to 'SENT' when clicked
        >
          SENT - {sentCount}
        </button>
        <button
          className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-green-200 border-green-400 hover:bg-green-300"
          onClick={() => {
            setSelectedState("success");
            setSelectedOrder(null);
          }} // Set selectedState to 'SUCCESS' when clicked
        >
          SUCCESS - {successCount}
        </button>
        <button
          className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-red-200 border-red-400 hover:bg-red-300"
          onClick={() => {
            setSelectedState("warning");
            setSelectedOrder(null);
          }} // Set selectedState to 'WARNING' when clicked
        >
          WARNING - {warningCount}
        </button>
        <button
          className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-slate-200 border-slate-400 hover:bg-slate-300"
          onClick={() => {
            setSelectedState("archived");
            setSelectedOrder(null);
          }} // Set selectedState to 'ARCHIVED' when clicked
        >
          ARCHIVED - {archivedCount}
        </button>
      </div>
      <div className="grid grid-cols-10">
        <div className="col-span-3">
          {" "}
          {orders.map(
            (order, index) =>
              order.state == selectedState && (
                <div
                  className=" border border-slate-800 bg-slate-100 hover:bg-slate-300 rounded p-4 m-2"
                  key={index}
                  onClick={() => setSelectedOrder(order)}
                >
                  {index} {order.email}
                </div>
              )
          )}
        </div>
        <div className="col-span-7">
          <div className="col-span-8 border p-6 rounded-lg bg-blue-50 shadow-md">
            {selectedOrder ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-semibold text-blue-700">Id:</div>
                <div>
                  {selectedOrder.id ? selectedOrder.id : "Not provided"}
                </div>

                <div className="text-sm font-semibold text-blue-700">
                  Selected Image:
                </div>
                <div>
                  {selectedOrder.selectedImage
                    ? selectedOrder.selectedImage
                    : "Not provided"}
                </div>

                <div className="text-sm font-semibold text-blue-700">
                  Email:
                </div>
                <div>
                  {selectedOrder.email ? selectedOrder.email : "Not provided"}
                </div>

                <div className="text-sm font-semibold text-blue-700">
                  Selected Color:
                </div>
                <div>
                  {selectedOrder.selectedColor
                    ? selectedOrder.selectedColor
                    : "Not provided"}
                </div>

                <div className="text-sm font-semibold text-blue-700">
                  Postal Code:
                </div>
                <div>
                  {selectedOrder.postalCode
                    ? selectedOrder.postalCode
                    : "Not provided"}
                </div>

                <div className="text-sm font-semibold text-blue-700">City:</div>
                <div>
                  {selectedOrder.city ? selectedOrder.city : "Not provided"}
                </div>

                <div className="text-sm font-semibold text-blue-700">
                  Street:
                </div>
                <div>
                  {selectedOrder.street ? selectedOrder.street : "Not provided"}
                </div>

                <div className="text-sm font-semibold text-blue-700">
                  Selected Type:
                </div>
                <div>
                  {selectedOrder.selectedType
                    ? selectedOrder.selectedType
                    : "Not provided"}
                </div>

                <div className="text-sm font-semibold text-blue-700">
                  Selected Size:
                </div>
                <div>
                  {selectedOrder.selectedSize
                    ? selectedOrder.selectedSize
                    : "Not provided"}
                </div>

                {/*<div className="text-sm font-semibold text-blue-700">
                  Country:
                </div>
                <div>
                  {selectedOrder.country
                    ? selectedOrder.country
                    : "Not provided"}
                </div> */}
                <div className="col-span-2 grid grid-cols-5 gap-4">
                  <button
                    onClick={() => updateOrderState("new")}
                    className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300"
                  >
                    NEW
                  </button>
                  <button
                    onClick={() => updateOrderState("sent")}
                    className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300"
                  >
                    SENT
                  </button>
                  <button
                    onClick={() => updateOrderState("success")}
                    className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-green-200 border-green-400 hover:bg-green-300"
                  >
                    SUCCESS
                  </button>
                  <button
                    onClick={() => updateOrderState("warning")}
                    className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-red-200 border-red-400 hover:bg-red-300"
                  >
                    WARNING
                  </button>
                  <button
                    onClick={() => updateOrderState("archived")}
                    className="border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-slate-200 border-slate-400 hover:bg-slate-300"
                  >
                    ARCHIVED
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-red-600 font-semibold">
                NO ORDER SELECTED
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
