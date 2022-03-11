import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import moment from 'moment';


function Booking() {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const userId = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('https://redgold-backend.herokuapp.com/api/booking/all', {
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

    const deleteBooking = (bookingId) => {
        let confirmDelete = window.confirm("Are you sure, you want to cancel this booking ?");

        if(confirmDelete === false) return;

        setLoading(true);

        let fetchData = {
            method: "delete",
            headers: {
                "Authorization": "Bearer "+JSON.parse(localStorage.getItem("jwt")),
                "Content-Type": "application/json"
            }
        }

        fetch(`https://redgold-backend.herokuapp.com/api/booking/delete/${bookingId}`, fetchData)
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


    return (
        <>
            <h2>Bookings</h2><hr />
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
                                        <th scope="col">Group</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                                    (isAdmin)
                                        ?
                                    <tbody>
                                        {
                                            data.map((booking, index) => {
                                                return (
                                                    <tr key={booking._id}>
                                                        <th scope="row">{booking.user.name}</th>
                                                        <td>{booking.user.phone}</td>
                                                        <td>{booking.group}</td>
                                                        <td>{moment(booking.date).format('ll')}</td>
                                                        <td><button className="btn btn-outline-dark" onClick={() => deleteBooking(booking._id)}>Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                        :
                                    <tbody>
                                        {
                                            data.map((booking, index) => {
                                                return (
                                                    booking.user._id === userId 
                                                        ?
                                                    <tr key={booking._id}>
                                                        <th scope="row">{booking.user.name}</th>
                                                        <td>{booking.user.phone}</td>
                                                        <td>{booking.group}</td>
                                                        <td>{moment(booking.date).format('ll')}</td>
                                                        <td><button className="btn btn-outline-dark" onClick={() => deleteBooking(booking._id)}>Delete</button></td>
                                                    </tr>
                                                        :
                                                    null
                                                )
                                            })
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                            :
                        <p style={{ color: 'red' }}>*No bookings available.</p>
                    }
                </>
            }
        </>
    )
}

export default Booking
