import { Link } from "react-router-dom"
import { packageCardProps } from "../interfaces"

export const PackagesCard = ({
  id,
  title,
  description,
  price,
  availableDates,
  image,
  onUpdate,
  onDelete,

}: packageCardProps,) => {
  return (
    <Link to={`/package/${id}`}>
      <div className="w-[300px] max-w-screen border-black border-1 rounded-lg overflow-hidden">
        <div className="flex flex-col">
          <div className="flex items-center justify-center h-[250px]">
            <img src={image} alt={title} className="w-full h-full" />
          </div>

          <h1 className="text-slate-600 font-bold text-2xl text-center py-3">{title}</h1>

          <p className="text-slate-900 font-semibold italic">{description}</p>

          <p className="text-slate-950 font-bold text-lg py-2">
            Price: <span className="text-slate-700 font-semibold">${price}</span>
          </p>

          <h3 className="text-slate-950 font-bold text-xl">Available Dates</h3>
          {availableDates &&
            availableDates.map((date: string, index: number) => (
              <p key={index}>
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            ))}

          <div className="flex justify-between items-center mt-4">
            {onUpdate && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onUpdate(id);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(id);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
