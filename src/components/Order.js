import React from "react";

const Order = ({
  setSelectedState,
  updateOrderState,
  orders,
  setSelectedOrder,
  selectedOrder,
  selectedState,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="text-sm font-semibold text-blue-700">Id:</div>
    <div>{selectedOrder.id ? selectedOrder.id : "Not provided"}</div>

    <div className="text-sm font-semibold text-blue-700">Selected Image:</div>
    <div>
      {selectedOrder.selectedImage
        ? selectedOrder.selectedImage
        : "Not provided"}
    </div>

    <div className="text-sm font-semibold text-blue-700">Email:</div>
    <div>{selectedOrder.email ? selectedOrder.email : "Not provided"}</div>

    <div className="text-sm font-semibold text-blue-700">Selected Color:</div>
    <div>
      {selectedOrder.selectedColor
        ? selectedOrder.selectedColor
        : "Not provided"}
    </div>

    <div className="text-sm font-semibold text-blue-700">Postal Code:</div>
    <div>
      {selectedOrder.postalCode ? selectedOrder.postalCode : "Not provided"}
    </div>

    <div className="text-sm font-semibold text-blue-700">City:</div>
    <div>{selectedOrder.city ? selectedOrder.city : "Not provided"}</div>

    <div className="text-sm font-semibold text-blue-700">Street:</div>
    <div>{selectedOrder.street ? selectedOrder.street : "Not provided"}</div>

    <div className="text-sm font-semibold text-blue-700">Selected Type:</div>
    <div>
      {selectedOrder.selectedType ? selectedOrder.selectedType : "Not provided"}
    </div>

    <div className="text-sm font-semibold text-blue-700">Selected Size:</div>
    <div>
      {selectedOrder.selectedSize ? selectedOrder.selectedSize : "Not provided"}
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
      {!(selectedState == "new") && (
        <button
          onClick={() => {
            updateOrderState("new");
            setSelectedState("new");
          }}
          className="col-start-1 border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300"
        >
          NEW
        </button>
      )}
      {!(selectedState == "sent") && (
        <button
          onClick={() => {
            updateOrderState("sent");
            setSelectedState("sent");
          }}
          className="col-start-2  border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300"
        >
          SENT
        </button>
      )}
      {!(selectedState == "success") && (
        <button
          onClick={() => {
            updateOrderState("success");
            setSelectedState("success");
          }}
          className="col-start-3 border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-green-200 border-green-400 hover:bg-green-300"
        >
          SUCCESS
        </button>
      )}
      {!(selectedState == "warning") && (
        <button
          onClick={() => {
            updateOrderState("warning");
            setSelectedState("warning");
          }}
          className="col-start-4 border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-red-200 border-red-400 hover:bg-red-300"
        >
          WARNING
        </button>
      )}

      {!(selectedState == "archived") && (
        <button
          onClick={() => {
            updateOrderState("archived");
            setSelectedState("archived");
          }}
          className="col-start-5 border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-slate-200 border-slate-400 hover:bg-slate-300"
        >
          ARCHIVED
        </button>
      )}
    </div>
  </div>
);

export default Order;
