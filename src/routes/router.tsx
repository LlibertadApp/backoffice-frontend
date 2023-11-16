import { Route, Routes } from "react-router-dom"
import Login from "../pages/login"
import Dashboard from "../pages/dashboard"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="" element={<Login/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>

            <Route path="*" element={<div>404 Not found</div>} />
        </Routes>
    )
}

export default AppRouter