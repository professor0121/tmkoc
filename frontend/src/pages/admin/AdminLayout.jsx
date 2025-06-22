// src/layouts/AdminLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../../utils/authUtils';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
        <Sidebar/>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <Header user={user}/>
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
