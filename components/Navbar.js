import React, { useState, useContext } from "react";
//import { useNavigate } from 'react-router-dom';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AppContext } from "@/components/context";

// @refresh reset

function NavBar(args) {
  const [isOpen, setIsOpen] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();
  //const navigate = useNavigate();
  const { query, setQuery } = useContext(AppContext);

  const toggle = () => setIsOpen(!isOpen);

  const signUp = () => {
    router.push("/register");
  };

  const uid = session?.user?.id;

  const handleOrdersClick = () => {
    const queryParams = new URLSearchParams({
      userId: uid,
    });
    router.push(`/orders?${queryParams.toString()}`);
  };

  const doSignOut = async () => {
    const data = await signOut({ callbackUrl: "/", redirect: false });
    router.push(data.url);
  };

  const doSignIn = async () => {
    const data = await signIn({ callbackUrl: "/", redirect: false });
    router.push(data.url);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src="img/cafe-dash-logo-300.png" alt="cafe-dash logo" />
      </a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          {status === "authenticated" && (
            <span
              style={{ cursor: "pointer" }}
              className="nav-link"
              onClick={handleOrdersClick}
            >
              Orders
            </span>
          )}
          {status !== "authenticated" && (
            <a className="nav-link disabled" href="/orders">
              Orders
            </a>
          )}
        </li>
      </ul>

      {status === "authenticated" && (
        <span className="navbar-text">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      )}
      {status === "authenticated" && session.user.name}
      {status === "authenticated" && (
        <span className="navbar-text">
          &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
        </span>
      )}
      {status === "authenticated" && (
        <span style={{ cursor: "pointer" }} onClick={() => doSignOut()}>
          Sign out
        </span>
      )}

      {status !== "authenticated" && (
        <span className="navbar-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
      )}
      {status !== "authenticated" && (
        <span style={{ cursor: "pointer" }} onClick={() => signUp()}>
          Sign Up
        </span>
      )}
      {status !== "authenticated" && (
        <span className="navbar-text">
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        </span>
      )}
      {status !== "authenticated" && (
        <span style={{ cursor: "pointer" }} onClick={() => doSignIn()}>
          Sign In
        </span>
      )}
    </nav>
  );
}

export default NavBar;
