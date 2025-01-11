
import { Package } from "../interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { PackagesCard } from "./packagesCard";
import { config } from "../config/env";
import { Pagination } from "./pagination";
import Swal from "sweetalert2";

export const ManagePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const packagesPerPage: number = 4;
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<Package>({
    _id: "",
    title: "",
    description: "",
    price: 0,
    availableDates: [] as string[],
    image: "",
  });

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/api/v1/packages`);
      setPackages(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const onDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${config.apiUrl}/api/v1/admin/package/${id}`
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
        timer: 2000,
      });
      fetchPackages();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };

  const openUpdateModal = (packageItem: Package) => {
    setUpdatedData(packageItem);
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        `${config.apiUrl}/api/v1/admin/package/${updatedData._id}`,
        updatedData
      );
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: response.data.message,
        timer: 2000,
      });
      setUpdateModalOpen(false);
      fetchPackages();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the package.",
      });
    }
  };

  const lastPageIndex = currentPage * packagesPerPage;
  const firstPostIndex = lastPageIndex - packagesPerPage;
  const currentPackages = packages.slice(firstPostIndex, lastPageIndex);

  return (
    <>
      <div className="overflow-hidden max-w-screen">
        {/* Package Cards */}
        <div className="px-4 py-4 my-8 flex flex-wrap gap-8 items-center justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            currentPackages.map((packageItem: Package, index) => (
              <PackagesCard
                _id={packageItem._id}
                key={index}
                title={packageItem.title}
                description={packageItem.description}
                price={packageItem.price}
                availableDates={packageItem.availableDates}
                image={packageItem.image}
                onDelete={() => onDelete(packageItem._id)}
                onUpdate={() => openUpdateModal(packageItem)}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination
          totalPackages={packages.length}
          packagePerPage={packagesPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      {updateModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Update Package</h2>
            <form>
              <div className="mb-4">
                <label className="block font-bold">Title</label>
                <input
                  type="text"
                  value={updatedData.title}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, title: e.target.value })
                  }
                  className="border w-full px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold">Description</label>
                <textarea
                  value={updatedData.description}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      description: e.target.value,
                    })
                  }
                  className="border w-full px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold">Price</label>
                <input
                  type="number"
                  value={updatedData.price}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, price: +e.target.value })
                  }
                  className="border w-full px-2 py-1 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold">Available Dates</label>
                <input
                  type="text"
                  value={updatedData.availableDates.join(", ")}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      availableDates: e.target.value.split(",").map((date) => date.trim()),
                    })
                  }
                  className="border w-full px-2 py-1 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setUpdateModalOpen(false)}
                  className="mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

