
export const Navbar = () => {

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <ul className="flex justify-between">
          <li>
            <h1 className="text-slate-50 text-3xl italic ">Travel World</h1>
          </li>
          <li>
            <a href="/" className="text-white px-5 text-xl">Home</a>
            <a href="/admin" className="text-white px-5 text-xl">Admin</a>
          </li>
        </ul>
      </nav>
    </>
  )
}
