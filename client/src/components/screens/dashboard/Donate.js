import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import moment from 'moment';

function Donate() {
    const [loading, setLoading] = useState(false);
    const userId = JSON.parse(localStorage.getItem("user"));
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const history = useHistory();
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true);

        fetch('https://redgold-backend.herokuapp.com/api/appointment/all', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("jwt"))
            }
        })
        .then(res=>res.json())
        .then(data2 => { 
            setLoading(false);
            setData(data2.data);
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong')
            history.push('/');
            console.log(err);
        })
    }, [history])

    const deleteAppointment = (appointmentId) => {
        let confirmDelete = window.confirm("Are you sure, you want to cancel this appointment ?");

        if(confirmDelete === false) return;
 
        setLoading(true);

        let fetchData = {
            method: "delete",
            headers: {
                "Authorization": "Bearer "+JSON.parse(localStorage.getItem("jwt")),
                "Content-Type": "application/json"
            }
        }

        fetch(`https://redgold-backend.herokuapp.com/api/appointment/delete/${appointmentId}`, fetchData)
        .then(res => res.json())
        .then(data2 => {
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                toast.success(data2.message);
                setData(data2.data)
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }

    const donateBlood = () => {
        setLoading(true);

        let data = {
            userId
        }

        let fetchData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer "+JSON.parse(localStorage.getItem("jwt")),
                "Content-Type": "application/json"
            }
        }

        fetch('https://redgold-backend.herokuapp.com/api/appointment/new', fetchData)
        .then(res => res.json())
        .then(data2 => {
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                toast.success(data2.message);
                setData(data2.data);
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }

    return (
        <>
            {
                (isAdmin)
                    ?
                <></>
                    :
                <>
                    <div className="card col-lg-8 mx-auto">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-8 col-sm-12">
                                    <center><p className="lead"><i>Become a donor and save a life!</i> </p></center>
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <center><button className="btn btn-outline-danger" onClick={() => donateBlood()}>Donate</button></center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </>
            }
            
            <h2>Appointments</h2><hr />
            {
                (loading)
                    ?
                <center><BeatLoader loading={loading} size={30} /></center>
                    :
                <>
                    {
                        (data.length)
                            ?
                        <div className="table-responsive-sm">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                                    (isAdmin)
                                        ?
                                    <tbody>
                                        {
                                            (data.length)
                                                ?
                                            data.map((appointment, index) => {
                                                return (
                                                    <tr key={appointment._id}>
                                                        <th scope="row">{appointment.user.name}</th>
                                                        <td>{appointment.user.phone}</td>
                                                        <td>{appointment.user.address}</td>
                                                        <td>{moment(appointment.date).format('ll')}</td>
                                                        <td><button className="btn btn-outline-dark" onClick={() => deleteAppointment(appointment._id)}>Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                                :
                                            null
                                        }
                                    </tbody>
                                        :
                                    <tbody>
                                        {
                                            (data.length)
                                                ?
                                            data.map((appointment, index) => {
                                                return (
                                                    appointment.user._id === userId 
                                                        ?
                                                    <tr key={appointment._id}>
                                                        <th scope="row">{appointment.user.name}</th>
                                                        <td>{appointment.user.phone}</td>
                                                        <td>{appointment.user.address}</td>
                                                        <td>{moment(appointment.date).format('ll')}</td>
                                                        <td><button className="btn btn-outline-dark" onClick={() => deleteAppointment(appointment._id)}>Delete</button></td>
                                                    </tr>
                                                        :
                                                    null
                                                )
                                            })
                                                :
                                            null
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                            :
                        <p style={{ color: 'red' }}>*No appointments available.</p>
                    }
                </>
            }
            <br />
        </>
    )
}

export default Donate
