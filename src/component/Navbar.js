import React from 'react'

function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
            id="navbar"
        >
            <h4>
                <a className="navbar-brand" href="#">Inventory System (v1.0)</a>
            </h4>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#"
                            >Stock<span className="sr-only">(current)</span></a
                        >
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Product</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Location</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Transfering</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">User</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
