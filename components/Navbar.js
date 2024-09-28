import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import { useAppContext } from "./context";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const context = useAppContext();
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/logo.png" alt="logo" width="69" height="69" />
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">Home</a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            {user ? (
              <h5>{context.user.username}</h5>
            ) : (
              <Link href="/register">
                <a className="nav-link"> Sign up</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">Sign in</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </div>
      <div className={styles.item}></div>
      <div className={styles.callButton}>
        <Image src="/img/telephone.png" alt="phone" width="32" height="32" />
      </div>

      <div className={styles.texts}>
        <div className={styles.text}>ORDER NOW!</div>
        <div className={styles.text}>8829 77 0062</div>
      </div>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src="/img/cart.png" alt="cart" width="30" height="30" />
          <div className={styles.counter}>2</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
