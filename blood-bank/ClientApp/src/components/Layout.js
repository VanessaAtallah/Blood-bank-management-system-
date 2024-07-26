import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../components/NavMenu';
import { useLocation } from 'react-router-dom';

const Layout = (props) => {
  // Get the current location using useLocation hook
  const location = useLocation();

  // Check if the current route is an authentication page or the Sign In page
  const isAuthPage = location.pathname === '/SignIn' || location.pathname === '/SignUp';
  const isSignInPage = location.pathname === '/SignUp';

  // If the current route is an authentication page or the Sign In page, don't render the NavMenu
  if (isAuthPage || isSignInPage) {
    return (
      <Container tag="main">
        {props.children}
      </Container>
    );
  }

  // If the current route is not an authentication page or the Sign In page, render the NavMenu
  return (
    <div>
      <NavMenu />
      <Container tag="main">
        {props.children}
      </Container>
    </div>
  );
}

export default Layout;
