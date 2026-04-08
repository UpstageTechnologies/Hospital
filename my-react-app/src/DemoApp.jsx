import { BrowserRouter, Routes, Route } from "react-router-dom"


import DemoHome from "./pages/DemoHome"
import DemoDoctors from "./pages/DemoDoctors"
import DemoDoctorDetails from "../pages/DemoDoctorDetails"

function DemoApp() {
  return (
    <BrowserRouter>

      <Routes>

        
        <Route path="/demohome" element={<DemoHome />} />
        <Route path="/demodoctors" element={<DemoDoctors />} />
        <Route path="/demodoctor/:id" element={<DemoDoctorDetails />} />

      </Routes>

    </BrowserRouter>
  )
}

export default DemoApp