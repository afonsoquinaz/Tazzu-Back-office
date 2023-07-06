import "./App.css";
import {
  FaHome,
  FaTruckMoving,
  FaTachometerAlt,
  FaAddressBook,
} from "react-icons/fa"; // Choose the icons you like
import GeneralOrders from "./components/GeneralOrders";
import { useState } from "react";
import Home from "./components/Home";
import TrackOrder from "./components/TrackOrder";

function App() {
  const [option, setOption] = useState("home");

  return (
    <div className="p-1 w-full bg-slate-100 h-screen">
      <div className="grid  grid-cols-10 h-screen">
        <div className="grid col-span-1 border-r-2 ">
          <button
            onClick={() => setOption("home")}
            className="flex items-center space-x-2 p-4"
          >
            <span className="text-xl font-bold hover:text-slate-400 mx-auto">
              T A Z Z U
            </span>
          </button>
          <button
            onClick={() => setOption("dashboard")}
            className="flex items-center space-x-2 hover:text-slate-400 p-4"
          >
            <FaTruckMoving className="h-9 w-9 mx-auto" />
          </button>
          <button
            onClick={() => setOption("trackOrder")}
            className="flex items-center space-x-2 p-4"
          >
            <FaAddressBook className="h-9 w-9 mx-auto hover:text-slate-400 " />
          </button>
        </div>
        <div className="col-span-9">
          {option == "home" && <Home></Home>}
          {option == "dashboard" && <GeneralOrders></GeneralOrders>}

          {option == "trackOrder" && <TrackOrder></TrackOrder>}
        </div>
      </div>
    </div>
  );
}

export default App;
