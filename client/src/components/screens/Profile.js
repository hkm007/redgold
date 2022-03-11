import React, { useState, useEffect } from 'react';
import profileImage from'./pics/profile.jpg';
import { toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";

function Profile() {
    const userId = JSON.parse(localStorage.getItem("user"));
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`https://redgold-backend.herokuapp.com/api/profile/${userId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("jwt"))
            }
        })
        .then(res=>res.json())
        .then(data2 => { 
            setLoading(false);
            
            setName(data2.data.name);
            setEmail(data2.data.email);
            setPhone(data2.data.phone);
            setAddress(data2.data.address);
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }, [userId])

    const updateProfile = (e) => {
        e.preventDefault();
        setLoading(true);

        let data = {
            phone,
            address
        }

        fetch(`https://redgold-backend.herokuapp.com/api/profile/update/${userId}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("jwt"))
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data2 => { 
            setLoading(false);
            
            if(data2.error) {
                toast.error(data2.error);
            } else {
                toast.success(data2.message);
                setName(data2.data.name);
                setEmail(data2.data.email);
                setPhone(data2.data.phone);
                setAddress(data2.data.address);
            }
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }

    return (
        <div className="container col-lg-4 mx-auto mb-2">
            <div className="card p-4 mt-5">
                {
                    (loading)
                        ?
                    <center><BeatLoader loading={loading} size={30} /></center>
                        :
                    <>
                        <center>
                            <img className="card-img-top img-fluid" src={profileImage} alt="..." style={{ maxHeight: '170px', maxWidth: '170px' }} />
                        </center>
                        <div className="card-body">
                            <center>
                                <h3 className="card-title">Profile</h3>
                                {
                                    (isAdmin)
                                        ?
                                    <span className="badge bg-danger">Admin</span>
                                        :
                                    <span className="badge bg-info">User</span>
                                }
                            </center>
                            <hr />
                            <form onSubmit={(e) => updateProfile(e)}>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" value={name} disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Phone (e.g. +91-8290XXXXXX)" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="address" aria-describedby="addressHelp" placeholder="Address (e.g. Varanasi, India)" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-outline-warning" type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Profile;