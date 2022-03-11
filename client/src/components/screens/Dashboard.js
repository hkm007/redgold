import React from 'react';
import Booking from './dashboard/Booking';
import Donate from './dashboard/Donate';

function Dashboard() {
    return (
        <div className="container col-lg-8 my-4">
            <Donate />
            <Booking />
        </div>
    )
}

export default Dashboard
