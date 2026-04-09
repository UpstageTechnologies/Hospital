const MasterDashboard = () => {
    return (
        <div className="flex">

            {/* LEFT SIDEBAR */}
            <div className="w-[250px] bg-blue-600 text-white min-h-screen p-6">
                <h2 className="text-lg font-bold">Master Panel</h2>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Welcome Master Admin 👋
                </h1>

                <p className="mb-4 text-gray-700">
                    Master Dashboard is the highest level control panel of the hospital system.
                    Here, the master admin can manage the entire platform including doctors,
                    staff, patients, and system settings.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">
                    🔹 What You Can Do Here
                </h2>

                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                    <li>Create and manage Admin accounts</li>
                    <li>Monitor all doctors and their availability</li>
                    <li>Manage patients and appointments</li>
                    <li>Control subscriptions and hospital plans</li>
                    <li>Access full system analytics</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-3">
                    🚀 Future Features (Coming Soon)
                </h2>

                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                    <li>Real-time dashboard with charts & reports</li>
                    <li>Doctor performance analytics</li>
                    <li>Automated appointment management</li>
                    <li>Role-based access control system</li>
                    <li>Notifications & alerts system</li>
                </ul>

            </div>
        </div>
    )
}

export default MasterDashboard