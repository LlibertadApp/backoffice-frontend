import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import NewFiscal from '../pages/new-fiscal';
import EditFiscal from '../pages/editar-fiscal';

import NotFoundPage from '../pages/not-found';

import ProtectedRoute from '../middlewares/ProtectedRoute';
import PublicRoute from '../middlewares/PublicRoute';

const AppRouter = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route element={<PublicRoute token={token} />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute token={token} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-fiscal" element={<NewFiscal />} />
        <Route path="/edit-fiscal" element={<EditFiscal />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
