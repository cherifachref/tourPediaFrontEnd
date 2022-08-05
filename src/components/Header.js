
import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
    const [show, setShow] = useState(false);
    const dispatch=useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    }
    const { user } = useSelector((state) => ({ ...state.auth }));
  return (
    <MDBNavbar fixed="top" expand="lg" style={{backgroundColor :"#f0e6ea"}}>
        <MDBContainer>
            <MDBNavbarBrand style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }} >
            <Link to="/">Touropedia</Link>
            </MDBNavbarBrand>
            <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
            style={{color:"#606080"}}
            >
                <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
                <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {user?.result?._id && (
                        <h5 style={{ marginRight: "30px", marginTop: "17px" }}>
                        Logged in as: <span style={{color:'green',fontWeight:'900'}}>{user?.result?.name}</span> 
                        </h5>
                        )}
                    <MDBNavbarItem>
                        <MDBNavbarLink>
                        <Link to="/"><p className="header-text">Home</p></Link>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    {user?.result?._id && (
                        <>
                    <MDBNavbarItem>
                        <MDBNavbarLink>
                        <Link to="/addTour"><p className="header-text">Add Tour</p></Link>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <MDBNavbarLink>
                        <Link to="/dashboard"><p className="header-text">Dhashboard</p></Link>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                        </>
                    )}
                    {user?.result?._id ? (
                    <MDBNavbarItem>
                        <MDBNavbarLink>
                        <Link to="/login"><p className="header-text" onClick={handleLogout}>logout</p></Link>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    ) : (
                    <MDBNavbarItem>
                        <MDBNavbarLink>
                            <Link to="/login"><p className="header-text">Login</p></Link>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    ) }


                </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
  )
}

export default Header