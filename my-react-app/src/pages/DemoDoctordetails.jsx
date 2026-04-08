import Navbar from "../components/Navbar"
import { useState } from "react"
import BookingPopup from "./BookingPopup"

const DemoDoctorDetails = () => {

  const [show, setShow] = useState(false)

  return (
    <div>

      <Navbar />

      <div className="p-10">

        <h1 className="text-2xl font-bold">Doctor Details</h1>

        {/* SLOT */}
        <div className="mt-6">
          <button
            onClick={() => setShow(true)}
            className="border px-4 py-2"
          >
            5:19pm - 5:20pm
          </button>
        </div>

      </div>

      {show && <BookingPopup close={() => setShow(false)} />}

    </div>
  )
}

export default DemoDoctorDetails