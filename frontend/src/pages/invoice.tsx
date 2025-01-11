
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import "jspdf-autotable";
import { Navbar } from "../components/Navbar";
import config from "../config/env";
const generateInvoicePDF = (packageDetail: any, bookingDetails: any) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("TravelWorld", 10, 15); // Company name
  doc.setFontSize(12);
  doc.text("Booking Invoice", 10, 25);
  doc.line(10, 27, 200, 27); // Divider line

  const bookingData = [
    ["Booking ID", bookingDetails.id],
    ["Customer Name", bookingDetails.name],
    [
      "Booking Date",
      bookingDetails.bookingDate
        ? new Date(bookingDetails.bookingDate).toLocaleDateString()
        : "N/A",
    ],
    ["Special Request", bookingDetails.specialRequest || "None"],
  ];

  doc.autoTable({
    head: [["Booking Information", ""]],
    body: bookingData,
    startY: 30,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [72, 144, 255] }, // Table header background color
  });

  const packageData = [
    ["Package Title", packageDetail.title],
    ["Description", packageDetail.description],
    ["Price Per Traveler", `$${packageDetail.price}`],
    ["Number of Travelers", bookingDetails.numberOfTravelers],
    ["Total Price", `$${bookingDetails.TotalPrice}`],
  ];

  const lastTableFinalY = doc.lastAutoTable?.finalY ?? 40; doc.autoTable({
    head: [["Package Information", ""]],
    body: packageData,
    startY: lastTableFinalY + 10,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [72, 144, 255] },
  });

  const footerStartY = doc.lastAutoTable?.finalY ?? 60; // Use 60 as fallback if undefined
  doc.setFontSize(10);
  doc.text("Thank you for booking with TravelWorld!", 10, footerStartY + 20);
  doc.text("Visit us at: www.travelworld.com", 10, footerStartY + 30);

  doc.save(`invoice.pdf`);
};

export const InvoicePage = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [packageDetail, setPackageDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.apiUrl}/api/v1/bookings/${bookingId}`);
        const booking = response.data;
        console.log(booking)
        setBookingDetails(booking);
        const packageDetail = await axios.get(`${config.apiUrl}/api/v1/package/${booking.packageId}`);
        setPackageDetail(packageDetail.data.onePackage);
        console.log(packageDetail.data.onePackage)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch booking details.");
        console.error("Error fetching booking details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!bookingDetails || !packageDetail) return <p>No booking or package details found!</p>;

  return (
    <>
      <Navbar />
      <div className="p-10 max-w-4xl mx-auto border rounded-lg shadow-lg bg-white">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-blue-600">TravelWorld</h1>
          <p className="text-lg font-medium text-gray-600">Your Trusted Travel Partner</p>
        </header>

        <h2 className="text-3xl font-semibold mb-6">Booking Invoice</h2>

        <table className="w-full text-left mb-6 border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="font-bold py-2">Booking ID:</td>
              <td>{bookingDetails._id}</td>
            </tr>
            <tr className="border-b">
              <td className="font-bold py-2">Customer Name:</td>
              <td>{bookingDetails.name}</td>
            </tr>
            <tr className="border-b">
              <td className="font-bold py-2">Booking Date:</td>
              <td>{new Date(bookingDetails.bookingDate).toLocaleDateString()}</td>
            </tr>
            <tr className="border-b">
              <td className="font-bold py-2">Special Request:</td>
              <td>{bookingDetails.specialRequest || "None"}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-2xl font-semibold mb-4">Package Details</h3>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="font-bold py-2">Package Title:</td>
              <td>{packageDetail.title}</td>
            </tr>
            <tr className="border-b">
              <td className="font-bold py-2">Package Description:</td>
              <td>{packageDetail.description}</td>
            </tr>
            <tr className="border-b">
              <td className="font-bold py-2">Package Available Dates:</td>
              <td className="flex gap-4 items-center">
                {
                  packageDetail.availableDates.map((date: string, index: number) => (
                    <li key={index} className="list-none mt-2">{new Date(date).toLocaleDateString()}</li>
                  ))
                }
              </td>
            </tr>
            <tr className="border-b">
              <td className="font-bold py-2">Total Price:</td>
              <td className="text-slate-700 font-semibold text-lg">${bookingDetails.TotalPrice}</td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={() => generateInvoicePDF(packageDetail, bookingDetails)}
          className="mt-8 bg-blue-600 text-white font-bold px-6 py-3 rounded hover:bg-blue-700"
        >
          Download Invoice
        </button>
      </div>    </>
  );
};


