import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function Authenticated(props) {
    const auth = useSelector(state => state.users);

    return auth?.data?.id ? <Outlet /> : <Navigate to="/login" />;
}

export default Authenticated;