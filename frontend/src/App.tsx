import { Route, Routes } from "react-router-dom"
import { Admin } from "./pages/admin"
import { Home } from "./pages/home"
import { PackageDetails } from "./pages/packageDetail"
import { InvoicePage } from "./pages/invoice"
import { Register } from "./pages/register"
function App() {

  return (

    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/invoice/:bookingId" element={<InvoicePage />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
