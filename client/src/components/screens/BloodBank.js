import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function BloodBank() {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const userId = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState([])
    const [group, setGroup] = useState("");
    const [searchGroup, setSearchGroup] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setLoading(true);

        fetch('https://redgold-backend.herokuapp.com/api/blood/all', {
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

    const addBloodGroup = (e) => {
        e.preventDefault();
        setLoading(true);

        let data = {
            group,
            price
        }

        let fetchData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer "+JSON.parse(localStorage.getItem("jwt")),
                "Content-Type": "application/json"
            }
        }

        fetch('https://redgold-backend.herokuapp.com/api/blood/add', fetchData)
        .then(res => res.json())
        .then(data2 => {
            setLoading(false);
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                toast.success(data2.message);
                setData(data2.data)
                setPrice("");
                setGroup("");
            }
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }

    const bookBlood = (bloodId) => {
        setLoading(true);

        let data = {
            userId,
            bloodId
        }

        fetch('https://redgold-backend.herokuapp.com/api/booking/new', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+JSON.parse(localStorage.getItem("jwt"))
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data2 => { 
            setLoading(false);
            toast.success(data2.message);
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong')
            history.push('/');
            console.log(err);
        })
    }

    const deleteBlood = (bloodId) => {
        let confirmDelete = window.confirm("Are you sure, you want to delete this blood group ?");

        if(confirmDelete === false) return;

        setLoading(true);

        let fetchData = {
            method: "delete",
            headers: {
                "Authorization": "Bearer "+JSON.parse(localStorage.getItem("jwt")),
                "Content-Type": "application/json"
            }
        }

        fetch(`https://redgold-backend.herokuapp.com/api/blood/delete/${bloodId}`, fetchData)
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

    const searchBloodGroup = (e) => {
        e.preventDefault();
        console.log(searchGroup);
        setData(data.filter(blood => blood.group === searchGroup));
        setSearchGroup("");
    }

    return (
        <div className="container col-lg-8 my-4">
            <h2>Blood Bank</h2>
            <hr />

            {
                (!isAdmin)
                    ?
                <>
                    <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={(e) => searchBloodGroup(e)}>
                        <div className="col-8">
                            <div className="input-group">
                                <input type="text" className="form-control" id="inlineFormInputSearchGroupBlood" placeholder="Group (e.g. B+)" value={searchGroup} onChange={(e) => setSearchGroup(e.target.value)} required />
                            </div>
                        </div>

                        <div className="col-4">
                            <button type="submit" className="btn btn-outline-info">Search</button>
                        </div>
                    </form>
                    <hr />
                </>
                    :
                <>
                    <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={(e) => addBloodGroup(e)}>
                        <div className="col-12">
                            <div className="input-group">
                                <input type="text" className="form-control" id="inlineFormInputGroupBlood" placeholder="Group (e.g. B+)" value={group} onChange={(e) => setGroup(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <input type="text" className="form-control" id="inlineFormInputGroupPrice" placeholder="Price (e.g. 1000)" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-outline-success">Add Group</button>
                        </div>
                    </form>
                    <hr />
                </>
            }

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
                                        <th scope="col">Group</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((blood, index) => {
                                            return (
                                                <tr key={blood._id}>
                                                    <th scope="row">{blood.group}</th>
                                                    <td>Rs. {blood.price}</td>
                                                    <td>500 ml</td>
                                                    <td>
                                                        {
                                                            (!isAdmin)
                                                                ?
                                                            <button className="btn btn-outline-dark" onClick={() => bookBlood(blood._id)}>Book</button>
                                                                :
                                                            <button className="btn btn-outline-dark" onClick={() => deleteBlood(blood._id)}>Delete</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                            :
                        <p style={{ color: 'red' }}>*No blood group available.</p>
                    }
                </>
            }
        </div>
    )
}

export default BloodBank;