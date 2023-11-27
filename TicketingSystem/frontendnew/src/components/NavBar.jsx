import React, { useEffect, useRef, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import '../styles/navbar.css';

function NavBar() {

    const [role, setrole] = useState(sessionStorage.getItem("role"));
    return (
        <div className="col-lg-3 side-nav " style={{ height: '100vh', margin: '0',overflow:'scroll',overflowX:'hidden' }}>
            <div className="d-flex flex-column justify-content-center align-items-center title-box " style={{ height: '15%' }}>
                <h1 className="nav-title">Ticket<span style={{color:'yellow'}}>+</span></h1>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center mt-2" style={{ margin: '0%', height: '85%' }}>
                <nav className="nav flex-column " style={{ width: '80%' }}>
                    {role == "ADMIN" &&
                        <>
                            <NavLink exact to="/home" className="nav-link main-nav-link" activeClassName="active-link" style={{ width: '100%' }}>Home</NavLink>
                            <NavLink exact to="/users" className="nav-link main-nav-link " activeClassName="active-link">User Management</NavLink>
                            <NavLink exact to="/bus" className="nav-link main-nav-link " activeClassName="active-link">Bus Management</NavLink>
                            <NavLink exact to="/route" className="nav-link main-nav-link " activeClassName="active-link">Route Management</NavLink>
                            <NavLink exact to="/schedules" className="nav-link main-nav-link " activeClassName="active-link">Schedules</NavLink>
                            <NavLink exact to="/assignInspector" className="nav-link main-nav-link " activeClassName="active-link">Assign Inspector</NavLink>
                            <NavLink exact to="/offences" className="nav-link main-nav-link " activeClassName="active-link">Offences</NavLink>
                            <NavLink exact to="/trips" className="nav-link main-nav-link " activeClassName="active-link">Trip Details</NavLink>
                            <NavLink exact to="/invalidTickets" className="nav-link main-nav-link " activeClassName="active-link">Invalid Tickets</NavLink>
                            <NavLink exact to="/login" onClick={()=>{sessionStorage.clear(); window.location="/"}} className="nav-link main-nav-link " activeClassName="active-link">Logout</NavLink>
                        </>
                    }
                   


                </nav>
            </div>
        </div>
    );
}

export default NavBar;