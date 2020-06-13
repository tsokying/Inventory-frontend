import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
            id="navbar"
        >
            <h4>
                <Link to="/" className="navbar-brand">Inventory System (v1.0)</Link>
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
                        <Link to="/stock" className="nav-link"
                            >Stock<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/product"className="nav-link" >Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/location" className="nav-link">Location</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/package" className="nav-link">Transfering</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/user" className="nav-link">User</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
