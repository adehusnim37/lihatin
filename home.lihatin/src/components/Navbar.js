import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/img/logo.svg';
import logoLogout from '../assets/img/logout.svg';
import { logoutUser } from '../store/actions/users';

function Navbar(props) {
    const navigate = useNavigate()
    const location = useLocation()

    const logout = async () => {
        try {
            await props.dispatch(logoutUser())
            localStorage.removeItem('token')
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    <p>Lihatin</p>
                </Link>
                <div className="ms-auto">
                    {
                        props.user.data && props.user.data.id ?
                            <div className="d-flex">
                                <Link className="mb-0 me-2 text-white" to={'/dashboard'}>{props.user.data.email}</Link>
                                <button onClick={logout} className='no-btn' disabled={props.user.loading}>
                                    <img src={logoLogout} alt="" />
                                </button>
                            </div>
                            :
                            location.pathname === '/login' ?
                                <Link to={'/register'} className="btn btn-red">Daftar</Link>
                                :
                                <Link to={'/login'} className="btn btn-red">Login</Link>
                    }
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps, null)(Navbar);