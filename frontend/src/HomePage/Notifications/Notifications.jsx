import React from 'react'
import Navigationbar from '../Navigationbar'

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigationbar />
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="flex flex-col items-center max-w-3xl p-8 bg-white rounded-xl shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-4">Notifications</h1>
          <p className="text-gray-600 text-base">
            You have no new notifications at the moment. 
            <br />
            Please check your registered email for any updates or important alerts related to your account.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Notifications
