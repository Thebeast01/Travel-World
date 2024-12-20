
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import Swal from "sweetalert2";

export const PackageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [packageDetail, setPackageDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfTravelers: 0,
    specialRequest: "",
    TotalPrice: 0,
    packageId: '',
  });

  const fetchPackageDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://travel-world-murex.vercel.app/api/v1/package/${id}`);
      setPackageDetail(response.data.onePackage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackageDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!packageDetail) return <p>No Package Found</p>;

  const bookNow = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://travel-world-murex.vercel.app/api/v1/booking", {
        ...bookingData, TotalPrice: packageDetail.price * bookingData.numberOfTravelers,
        packageId: id,
      });
      if (response.data.success) {
        const bookingDetails = response.data;
        navigate(`/invoice/${bookingDetails.id}`
        );
        Swal.fire({
          title: "Success",
          text: "Booking Confirmed",
          icon: "success",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Booking Failed! Please try again",
        icon: "error",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center overflow-x-hidden">
        <div className="p-10 md:w-1/2">
          <img src={packageDetail.image} alt={packageDetail.title} className="w-full h-96 object-cover" />
          <h1 className="text-4xl font-bold my-4">{packageDetail.title}</h1>
          <p className="text-lg">{packageDetail.description}</p>
          <p className="text-xl font-bold mt-4">Price: ${packageDetail.price}</p>
          <h3 className="text-2xl font-semibold mt-6">Available Dates:</h3>
          <ul>
            {packageDetail.availableDates.map((date: string, index: number) => (
              <li key={index}>{new Date(date).toLocaleDateString()}</li>
            ))}
          </ul>
          <button
            className="bg-cyan-600 px-4 py-2 my-3 rounded-md text-slate-100 font-bold hover:bg-cyan-500 hover:text-slate-700"
            onClick={() => setIsModalOpen(true)}
          >
            Book Now
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center overflow-hidden">
          <div className="bg-white p-10 rounded-lg  md:w-[500px]">
            <h1 className="text-2xl font-bold">Booking Form</h1>
            <form className="flex flex-col gap-4 mt-4" onSubmit={bookNow}>
              <input
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 p-2 rounded-md"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded-md"
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 p-2 rounded-md"
                required
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
              />
              <input
                type="number"
                placeholder="Number Of Travelers"
                className="border border-gray-300 p-2 rounded-md"
                required
                onChange={(e) =>
                  setBookingData({ ...bookingData, numberOfTravelers: parseInt(e.target.value) })
                }
              />
              <textarea
                placeholder="Special Request"
                className="border border-gray-300 p-2 rounded-md"
                onChange={(e) => setBookingData({ ...bookingData, specialRequest: e.target.value })}
              />
              <h3>
                Total: <span>${packageDetail.price * bookingData.numberOfTravelers}</span>
              </h3>
              <span className="flex justify-between  w-full
              ">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-orange-700 text-slate-100 rounded-md font-bold px-4 py-2 hover:bg-orange-500">
                  Cancle Booking
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 px-4 py-2 rounded-md text-slate-100 font-bold hover:bg-cyan-500 hover:text-slate-700"
                >
                  Confirm Booking
                </button >

              </span>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

