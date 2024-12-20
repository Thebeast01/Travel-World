import { useNavigate } from "react-router-dom"
export const Navbar = () => {

  const navigate = useNavigate()
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <ul className="flex justify-between">
          <li>
            <h1 className="text-slate-50 text-3xl italic ">Travel World</h1>
          </li>
          <li>
            <a href="/" className="text-white px-5 text-xl">Home</a>
            <button onClick={() => navigate('/admin')} className="text-white px-5 text-xl">Admin</button>
          </li>
        </ul>
      </nav>
    </>
  )
}
