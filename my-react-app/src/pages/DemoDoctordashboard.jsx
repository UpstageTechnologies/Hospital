const DemoDoctordashboard = () => {
  return (

    <div className="flex">

         <div className="w-[250px] bg-blue-600 text-white min-h-screen p-6">
                <h2 className="text-lg font-bold">Doctor Panel</h2>
            </div>
    <div className="flex-1 p-10">

      <h1 className="text-3xl font-bold mb-4">
        Welcome Doctor 👨‍⚕️
      </h1>

      <p className="text-gray-600 mb-6">
        Doctor Dashboard helps manage appointments, patient records, and availability schedules efficiently.
      </p>

      <h2 className="text-xl font-semibold mb-3">🔹 What You Can Do Here</h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
        <li>View and manage appointments</li>
        <li>Check patient details</li>
        <li>Update availability slots</li>
        <li>Add prescriptions</li>
        <li>Manage patient history</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">🚀 Future Features (Coming Soon)</h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Telemedicine support</li>
        <li>Patient analytics dashboard</li>
        <li>Automated scheduling</li>
        <li>Voice-to-text prescriptions</li>
        <li>Smart alerts & notifications</li>
      </ul>

    </div>
    </div>
  );
};

export default DemoDoctordashboard;