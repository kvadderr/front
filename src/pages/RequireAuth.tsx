import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const as = "/login?"+ location.state?.search;
    const [searchParams, setSearchParams] = useSearchParams();
    const searchLogin = searchParams.get("login");
    const pass = searchParams.get("pass");
    console.log('LOOOOOOOOGIN', login);
    
    return (
        allowedRoles?.includes(auth?.roles)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;