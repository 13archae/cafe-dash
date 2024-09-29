import {useContext}from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import { AppContext } from "./context";
import styles from "../styles/Navbar.module.css";

// @refresh reset

const Navbar = () => {
  const ctx = useContext(AppContext);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/logo.png" alt="logo" width={200} height={200} priority={true} style={{padding: "20px"}}/>
        <ul className={styles.list}>
          <li className={styles.listItem}>
              <Link href="/">
                Home
              </Link>
            </li>
            <li className= {styles.listItem}>
              {ctx.user ? (
                <h5>{ctx.user.username}</h5>
              ) : (
                <Link href="/register">
                  Sign up
                </Link>
              )}
            </li>
            <li className= {styles.listItem}>
              {ctx.user ? (
                <Link href="/" onClick={() => {
                  logout();
                  setUser(null);
                }}>
                
                    Sign Out
                  
                </Link>
              ) : (
                <Link href="/login">
                  Sign in
                </Link>
              )}
            </li>

            <li className= {styles.listItem}>
              {ctx.user ? (
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
