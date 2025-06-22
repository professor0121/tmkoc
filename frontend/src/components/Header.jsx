import { NavLink } from 'react-router-dom';
import navRoutes from '../routes/NavRoutes';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* App Name */}
        <div className="text-xl font-bold text-blue-600">MyApp</div>

        {/* Navigation */}
        <nav className="space-x-6 hidden sm:block">
          {navRoutes
            .filter((route) => route.showInNav)
            .map(({ path, name }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-500`
                }
              >
                {name}
              </NavLink>
            ))}
        </nav>

        {/* Profile / Auth */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                {getInitial(user.name)}
              </div>
              <p className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</p>
            </>
          ) : (
            <NavLink to="/auth" className="text-blue-600 font-medium text-sm">
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
