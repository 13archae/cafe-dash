import React, { useState, useContext } from 'react';
// @refresh reset

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function NavBar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/cafes/">Cafes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;

/*

const Navbar = () => {
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AppContext);

  console.log("Navbar user:" ,user);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/logo.png" alt="logo" width={150} height={150} priority={true} style={{padding: "20px"}}/>
        <ul className={styles.list}>
          <li className={styles.listItem}>
              <Link href="/">
                Home
              </Link>
            </li>
            <li className= {styles.listItem}>
              {isAuthenticated ? (
                <h5>{user.username}</h5>
              ) : (
                <Link href="/register">
                  Sign up
                </Link>
              )}
            </li>
            <li className= {styles.listItem}>
              {isAuthenticated ? (
                <Link href="/" onClick={() => {
                  logout();
                  setUser(null);
                }}>
                
                    Sign Out
                  
                </Link>
              ) : (
                <Link href="/api/auth/signIn">
                  Sign in
                </Link>
              )}
            </li>

            <li className= {styles.listItem}>
              {isAuthenticated ? (
                <Link href="/cafes" onClick={() => {
                  
                }}>
                
                    Our Cafes
                  
                </Link>
              ) : (
                <></>
              )}
            </li>
          </ul>
        
      </div>
      <div className={styles.item}></div>
      <div className={styles.callButton}>
        <Image src="/img/telephone.png" alt="phone" width={32} height={32} />
      </div>

      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src="/img/cart.png" alt="cart" width={30} height={30} />
          <div className={styles.counter}>2</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

*/