import React from 'react'

const Header = ({ user }) => {
  return (
    <div>  {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">Welcome, {user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.role?.toUpperCase()}</p>
        </header></div>
  )
}

export default Header