
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { ViewBooking } from "../components/viewBooking";
import { ManagePackages } from "../components/managePackages";
import { AddPackage } from "../components/addPackage"; // Import the new component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Admin = () => {
  const [activeTab, setActiveTab] = useState("managePackages");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 min-h-screen p-4 flex flex-col`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-transparent text-white p-2 self-end focus:outline-none hover:bg-gray-600"
          >
            {isCollapsed ? <FontAwesomeIcon icon={faArrowRight} /> : <FontAwesomeIcon icon={faArrowLeft} />}
          </button>

          {/* Sidebar Content */}
          {!isCollapsed && <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>}
          <button
            onClick={() => setActiveTab("managePackages")}
            className={`w-full text-left py-2 px-4 mb-2 rounded ${isCollapsed ? "bg-transparent flex items-center justify-center" : ""} ${activeTab === "managePackages" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
          >
            {isCollapsed ? "📦" : "Manage Packages"}
          </button>
          <button
            onClick={() => setActiveTab("viewBookings")}
            className={`w-full text-left py-2 px-4 mb-2 rounded ${isCollapsed ? "bg-transparent flex justify-center items-center" : ""} ${activeTab === "viewBookings" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
          >
            {isCollapsed ? "📄" : "View Bookings"}
          </button>
          <button
            onClick={() => setActiveTab("addPackage")}
            className={`w-full text-left py-2 px-4 mb-2 rounded ${isCollapsed ? "bg-transparent flex justify-center items-center" : ""} ${activeTab === "addPackage" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
          >
            {isCollapsed ? "➕" : "Add Package"}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-8">
          {activeTab === "viewBookings" && <ViewBooking />}
          {activeTab === "managePackages" && <ManagePackages />}
          {activeTab === "addPackage" && <AddPackage />}
        </div>
      </div>
    </>
  );
};

