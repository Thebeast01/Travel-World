import { Booking } from "../interfaces"

export const BookingCard = (
  {
    _id,
    name,
    email,
    phone,
    people,
    specialRequest,
    bookingDate
  }: Booking) => {
  return (
    <div className="w-[400px] shadow-md shadow-slate-400 p-4 max-w-screen  border-black border-1  rounded-lg overflow-hidden  "  >
      <div className="flex flex-col">
        <p className="text-slate-900 font-bold text-md  py-3">Customer Name : <span className="font-normal text-slate-700"> {name}</span></p>
        <p className="text-slate-900 font-bold">Email :<span className="text-slate-700 font-normal">{email}</span></p>
        <p className="text-slate-900 font-bold  py-2">Phone : <span className="text-slate-700"> {phone}</span></p>
        <p className="text-slate-900 font-bold  py-2">Number of People : <span className="text-slate-700">{people}</span></p>
        <p className="text-slate-900 font-bold  py-2"> Special Request : <span className="text-slate-700">{specialRequest}</span></p>
        <p className="text-slate-950 font-semibold">Booking Data :   <span className="text-slate-600">
          {new Date(bookingDate).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
          })}
        </span></p>

        <p>Booking id{_id}</p>


      </div>
    </div >
  )
}
