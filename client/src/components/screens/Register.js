import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";

function Register() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const registerHelper = (e) => {
        e.preventDefault();
        //logic
        setLoading(true);

        if(password.length < 4) {
            setLoading(false);
            toast.warning('Password length must be atleast 4.');
            return;
        }

        let data = {
            name,
            phone,
            address,
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

        fetch('https://redgold-backend.herokuapp.com/api/auth/register', fetchData)
        .then(res => res.json())
        .then(data2 => {
            setLoading(false);
            if(data2.error) {
                toast.error(data2.error);
            }
            else {
                toast.success(data2.message);
                history.push('/login');
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
                            <h3>Register</h3><hr />
                            <form onSubmit={(e) => registerHelper(e)}>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" autoFocus placeholder="Name (e.g. Himanshu Mishra)" onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <br />
                                <div className="form-group">
                                    <input type="text" className="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Phone (e.g. +91-8290XXXXXX)" onChange={(e) => setPhone(e.target.value)} required />
                                </div>
                                <br />
                                <div className="form-group">
                                    <input type="text" className="form-control" id="address" aria-describedby="addressHelp" placeholder="Address (e.g. Mumbai, India)" onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                                <br />
                                <div className="form-group">
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email (e.g. abc@example.com)" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <br />
                                <div className="form-group">
                                    <input type="password" className="form-control" id="password" placeholder="Password (Atleast 4 characters)" onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <br />
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-outline-primary">Register</button>
                                </div>
                            <br />
                            <p>Already have an account ? <Link to="/login" style={{ textDecoration: 'none', color: 'red' }}><span className="do">Login</span></Link></p>
                            </form>
                        </>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register
