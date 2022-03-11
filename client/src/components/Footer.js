import React from 'react'

function Footer() {
    return (
        <React.Fragment>
            <footer className="page-footer font-small">
                <div className="footer-copyright text-center text-dark py-2">
                    <p style={{color:'black'}}>Copyright © {new Date().getFullYear()}. All Rights Reserved.</p>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer
