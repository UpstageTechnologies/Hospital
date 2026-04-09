const DashboardNavbar = () => {
    return (
        <div className="flex items-center justify-between px-10 py-4 border-b">

            {/* LEFT */}
            <h1 className="text-xl font-bold">Dashboard</h1>

            {/* CENTER */}
            <div className="flex gap-8 mx-auto">
                <button>Master</button>
                <button>Admin</button>
                <button>Doctor</button>
                <button>Patient</button>
                <button>Staff</button>
            </div>

            {/* RIGHT (empty for balance) */}
            <div className="w-[100px]"></div>

        </div>
    )
}

export default DashboardNavbar