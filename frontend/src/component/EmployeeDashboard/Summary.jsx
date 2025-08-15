import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const SummaryCard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 flex justify-center items-center h-[60vh]">
      <div className="bg-white shadow-lg rounded-xl px-8 py-6 text-center w-full max-w-md">
        <div className="text-4xl text-teal-600 flex justify-center mb-4">
          <FaUser />
        </div>
    <h1 className="font-bebas underline text-5xl text-purple-700 mb-2 ">Welcome Back</h1>
      <p className="font-lobster text-7xl text-green-800 decoration-4 decoration-green-600">
  {user.name}
</p>

      </div>
    </div>
  );
};

export default SummaryCard;
