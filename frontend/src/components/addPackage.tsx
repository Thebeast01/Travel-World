
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export const AddPackage = () => {
  const [packageData, setPackageData] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: [] as string[],
    image: "",
  });
  const [newDate, setNewDate] = useState("");

  const addDate = () => {
    if (newDate.trim()) {
      setPackageData((prev) => ({
        ...prev,
        availableDates: [...prev.availableDates, newDate],
      }));
      setNewDate("");
    }
  };

  const removeDate = (index: number) => {
    setPackageData((prev) => ({
      ...prev,
      availableDates: prev.availableDates.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPackageData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/admin/package", packageData);
      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text: "Package Added Successfully",
          icon: "success",
        });
        setPackageData({
          title: "",
          description: "",
          price: "",
          availableDates: [],
          image: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      })
    }
  };
  return (
    <div className="overflow-hidden max-w-screen">
      <div className="bg-white p-10 rounded-lg md:w-[500px]">
        <h1 className="text-2xl font-bold">Add Package</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={addData}>
          <input
            onChange={(e) => setPackageData({ ...packageData, title: e.target.value })}
            type="text"
            value={packageData.title}
            placeholder="Title"
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <textarea
            onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
            value={packageData.description}
            placeholder="Package Description"
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={packageData.price}
            className="border border-gray-300 p-2 rounded-md"
            onChange={(e) => setPackageData({ ...packageData, price: e.target.value })}
            required
          />
          <div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="border border-gray-300 p-2 rounded-md flex-1"
              />
              <button
                type="button"
                onClick={addDate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Date
              </button>
            </div>
            <ul className="mt-2">
              {packageData.availableDates.map((date, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{date}</span>
                  <button
                    type="button"
                    onClick={() => removeDate(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Upload Image:</label>
            <input
              type="file"
              accept="image/*"

              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded-md"
              required
            />
            {packageData.image && (
              <img
                src={packageData.image}
                alt="Preview"
                className="mt-4 w-40 h-40 object-cover border"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit Package
          </button>
        </form>
      </div>
    </div>
  );
};

