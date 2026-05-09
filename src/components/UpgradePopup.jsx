import React from "react";
import { useNavigate } from "react-router-dom";

const UpgradePopup = ({ open, onClose }) => {

  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
          Upgrade Required 🚀
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Demo time finished. Upgrade now.
        </p>

        <button
          onClick={() => {

            onClose();
          
            navigate("/master-login", {
              state: {
                isRegister: true
              }
            });
          
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Upgrade Now
        </button>

      </div>

    </div>
  );
};

export default UpgradePopup;