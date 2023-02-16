import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const as = "/login?"+ location.state?.search;
    console.log('location.state', location.state);
    console.log('as', as);
    console.log('auuth', auth?.roles);
    return (
        allowedRoles?.includes(auth?.roles)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login?" state={{ from: location }} replace />
    );
}

export default RequireAuth;