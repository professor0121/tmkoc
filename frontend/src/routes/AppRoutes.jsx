// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import navRoutes from './NavRoutes';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import AdminLayout from '../pages/admin/AdminLayout'; // 🧱 Import AdminLayout

function App() {
  return (
    <Router>
      <Routes>
        {navRoutes
          .filter((route) => !route.path.startsWith('/admin'))
          .map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

        {/* 🛡️ Admin layout routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {navRoutes
            .filter((r) => r.path.startsWith('/admin'))
            .map(({ path, element }) => (
              <Route
                key={path}
                path={path.replace('/admin/', '')}
                element={element}
              />
            ))}
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
