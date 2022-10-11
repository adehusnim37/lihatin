import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function Guest(props) {
    const auth = useSelector(state => state.users);

    return !auth?.data?.id ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default Guest;