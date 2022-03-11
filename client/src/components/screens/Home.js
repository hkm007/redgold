import React from 'react'
import homeImage from'./pics/home.svg';

function Home() {
    return (
        <div className="container my-4">
            <center>
                <img className="img-fluid" src={homeImage} alt="..." style={{ maxHeight: '300px' }} />
                <div className="my-3">
                    <h1 className="display-1">Welcome to Redgold</h1>
                    <h5 className="display-4">The Online Blood Bank</h5>
                </div>
            </center>
        </div>
    )
}

export default Home
