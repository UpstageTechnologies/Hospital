const DemoPatientdashboard = () => {
  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-4">
        Welcome Patient 👋
      </h1>

      <p className="text-gray-600 mb-6">
        Patient Dashboard allows users to manage appointments, view medical history, and stay connected with doctors.
      </p>

      <h2 className="text-xl font-semibold mb-3">🔹 What You Can Do Here</h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
        <li>Book and manage appointments</li>
        <li>View doctor availability</li>
        <li>Access medical records</li>
        <li>Track appointment history</li>
        <li>Update personal profile</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">🚀 Future Features (Coming Soon)</h2>

      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Online consultation (video call)</li>
        <li>Prescription downloads</li>
        <li>Health reports tracking</li>
        <li>AI health suggestions</li>
        <li>Reminder notifications</li>
      </ul>

    </div>
  );
};

export default DemoPatientdashboard;