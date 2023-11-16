import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import NewFiscal from '../pages/new-fiscal';
import EditFiscal from '../pages/editar-fiscal';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-fiscal" element={<NewFiscal />} />
            <Route path="/edit-fiscal" element={<EditFiscal />} />

            <Route path="*" element={<div>404 Not found</div>} />
        </Routes>
    );
};

export default AppRouter;
