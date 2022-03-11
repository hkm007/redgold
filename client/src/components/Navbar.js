import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

function Navbar() {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext);

    const logout = () => {
        localStorage.clear()
        dispatch({ type: "CLEAR" })
        history.push('/');
    }

    const renderList = () => {
        if(state) {
            return [
                <Link className="btn btn-primary" type="button" to="/dashboard" key="1">Dashboard</Link>,
                <Link className="btn btn-danger mx-2" type="button" onClick={() => logout()} key="2">Logout</Link>
            ]
        }
        else {
            return [
                <Link className="btn btn-success" type="button" to="/login" key="3">Login</Link>,
                <Link className="btn btn-primary mx-2" type="button" to="/register" key="4">Register</Link>
            ]
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/#">Redgold</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            (state) 
                                ?
                            <>
                                <li className="nav-item" key="5">
                                    <Link className="nav-link" to="/bank">Bank</Link>
                                </li>
                                <li className="nav-item" key="6">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                            </>
                                :
                            <></>
                        }
                    </ul>

                    <>{ renderList() }</>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;