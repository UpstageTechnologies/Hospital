import React from "react"
import DemoNavbar from "../components/DemoNavbar"
import { assets } from "../assets/assets"

const DemoContact = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10">

      <DemoNavbar />

      <div className="text-center text-2xl pt-10 text-gray-600">
        <p>
          CONTACT <span className="font-semibold text-gray-800">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-24">

        <img
          src={assets.contact_image}
          className="w-full md:max-w-[420px] rounded-lg"
          alt=""
        />

        <div className="flex flex-col justify-center gap-5 text-sm text-gray-600">

          <p className="text-xl font-semibold">
            Demo Hospital Office
          </p>

          <p>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          <p>
            Tel: (415) 555-0132 <br />
            Email: demohospital@gmail.com
          </p>

          <p className="text-xl font-semibold">
            Careers at Demo
          </p>

          <p>
            Learn more about our teams and job openings.
          </p>

          <button className="border border-black px-8 py-3 w-fit">
            Explore Jobs
          </button>

        </div>

      </div>

    </div>
  )
}

export default DemoContact