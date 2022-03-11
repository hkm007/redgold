import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../App';
import BeatLoader from "react-spinners/BeatLoader";

function Login() {
    const history = useHistory();
    const { dispatch } = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginHelper = (e) => {
        e.preventDefault();
        //logic
        setLoading(true);

        let data = {
            email,
            password
        }

        let fetchData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch('https://redgold-backend.herokuapp.com/api/auth/login', fetchData)
        .then(res => res.json())
        .then(data2 => {
            setLoading(false);
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                localStorage.setItem("jwt", JSON.stringify(data2.token));
                localStorage.setItem("user", JSON.stringify(data2.userId));
                localStorage.setItem("isAdmin", JSON.stringify(data2.isAdmin));
                dispatch({type:"USER", payload:data2.userId})
                toast.success(data2.message);
                history.push('/dashboard');
            }
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }


    return (
        <React.Fragment>
            <div className="container mb-2">
                <div className="card card-login col-lg-4 mx-auto mt-5 p-4">
                    {
                        (loading)
                            ?
                        <center><BeatLoader loading={loading} size={30} /></center>
                            :
                        <>
                            <h3>Login</h3><hr />
                            <form onSubmit={(e) => loginHelper(e)}>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" autoFocus placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <br />
                                <div className="form-group">
                                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <br />
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-outline-success">Login</button>
                                </div>
                            </form>
                            <br />
                            <p>Don't have an account ? <Link to="/register" style={{ textDecoration: 'none', color: 'red' }}><span className="do">Register</span></Link></p>
                        </>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;