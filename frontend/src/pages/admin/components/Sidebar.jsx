import React from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems=[
        {path:'/admin/dashboard',name:'Dashboard'},
        {path:'/admin/users',name:'Manage Users'},
        {path:'/admin/settings',name:'Settings'},
        {path:'/admin/packages',name:'Packages'},
    ]
    return (
        <div>
            {/* Sidebar */}
            <aside className="h-screen w-64 bg-white shadow-lg p-4 hidden md:block">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
                <nav className="space-y-4">
                    {
                        menuItems.map(({path,name})=>(
                            <NavLink key={path} to={path} className="block text-gray-700 hover:text-blue-600 font-medium">
                                {name}
                            </NavLink>
                        ))
                    }   
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar