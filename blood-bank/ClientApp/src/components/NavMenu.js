import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
  const location = useLocation();
  const isRoutePage = location.pathname === '/' || location.index;

  if (isRoutePage) {
    return null; // Don't render NavMenu on the route page
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">Blood Bank</NavbarBrand>
        <NavbarToggler className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/HomePage">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/AddDonor">Add Donors</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/DonorList">View Donors</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/Dashboard">Dashboard</NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavMenu;
