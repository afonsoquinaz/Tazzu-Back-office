import React from "react";

const StateButton = ({
  newCount,
  pickedCount,
  sentCount,
  successCount,
  warningCount,
  archivedCount,
  selectedState,
  setSelectedState,
  setSelectedOrder,
}) => (
  <div className="grid grid-cols-6 gap-4">
    <button
      className={`border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300
     ${
       selectedState === "new" ? "bg-blue-500 hover:bg-blue-500" : "bg-blue-200"
     }
     `}
      onClick={() => {
        setSelectedState("new");
        setSelectedOrder(null);
      }} // Set selectedState to 'NEW' when clicked
    >
      NEW - {newCount}
    </button>
    <button
      className={`border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300
     ${
       selectedState === "picked"
         ? "bg-blue-500 hover:bg-blue-500"
         : "bg-blue-200"
     }
     `}
      onClick={() => {
        setSelectedState("picked");
        setSelectedOrder(null);
      }} // Set selectedState to 'NEW' when clicked
    >
      PICKED - {pickedCount}
    </button>
    <button
      className={`border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-blue-200 border-blue-400 hover:bg-blue-300
     ${
       selectedState === "sent"
         ? "bg-blue-500 hover:bg-blue-500"
         : "bg-blue-200"
     }
     `}
      onClick={() => {
        setSelectedState("sent");
        setSelectedOrder(null);
      }} // Set selectedState to 'SENT' when clicked
    >
      SENT - {sentCount}
    </button>
    <button
      className={`border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-green-200 border-green-400 hover:bg-green-300
     ${
       selectedState === "success"
         ? "bg-green-500  hover:bg-green-500"
         : "bg-green-200"
     }
     `}
      onClick={() => {
        setSelectedState("success");
        setSelectedOrder(null);
      }} // Set selectedState to 'SUCCESS' when clicked
    >
      SUCCESS - {successCount}
    </button>
    <button
      className={`border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-red-200 border-red-400 hover:bg-red-300
    ${
      selectedState === "warning"
        ? "bg-red-500  hover:bg-red-500"
        : "bg-red-200"
    }
    `}
      onClick={() => {
        setSelectedState("warning");
        setSelectedOrder(null);
      }} // Set selectedState to 'WARNING' when clicked
    >
      WARNING - {warningCount}
    </button>
    <button
      className={`border rounded text-xl font-bold text-slate-800 p-4 m-2 bg-slate-200 border-slate-400 hover:bg-slate-300
   ${
     selectedState === "archived"
       ? "bg-slate-500  hover:bg-slate-500"
       : "bg-slate-200"
   }
   `}
      onClick={() => {
        setSelectedState("archived");
        setSelectedOrder(null);
      }} // Set selectedState to 'ARCHIVED' when clicked
    >
      ARCHIVED - {archivedCount}
    </button>
  </div>
);

export default StateButton;
