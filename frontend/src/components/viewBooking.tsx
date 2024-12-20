import { useEffect, useState } from "react";
import axios from "axios";
import { Booking } from "../interfaces";
import { BookingCard } from "./bookingCard";
import { Pagination } from "./pagination";

export const ViewBooking = () => {
  const [bookingData, setBookingData] = useState([])
  const bookingPerPage: number = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const fetchBookingData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://travel-world-gamma.vercel.app/api/v1/admin/bookings')
      console.log(response.data)
      setBookingData(response.data)
      setLoading(false)
    } catch (e) {

      console.log(e)
    }
  }

  useEffect(() => {
    fetchBookingData()
  }, [])
  const lastPageIndex = currentPage * bookingPerPage;

  const firstPostIndex = lastPageIndex - bookingPerPage;
  const currentBooking = bookingData.slice(firstPostIndex, lastPageIndex)
  console.log('currentPackages', currentBooking)

  return (
    <>
      <div className="  px-4 py-4 my-8 flex flex-wrap  gap-8 items-center justify-center ">
        {
          loading ? <p>Loading...</p> :
            currentBooking.map((bookingItem: Booking, index) => (
              <BookingCard
                _id={bookingItem._id}
                key={index}
                name={bookingItem.name}
                email={bookingItem.email}
                people={bookingItem.people}
                phone={bookingItem.phone}
                bookingDate={bookingItem.bookingDate}
                specialRequest={bookingItem.specialRequest}

              />
            ))
        }

      </div>

      <Pagination totalPackages={bookingData.length} packagePerPage={bookingPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </>
  )
}
