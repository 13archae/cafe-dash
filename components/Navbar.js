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
        Cafe Dash
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
        <>
          <form className="form-inline my-2 my-lg-0">
            <input
              id="search"
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onChange={(e) => {
                setQuery(e.target.value.toLocaleLowerCase());
                alert(`Query: ${query}`);
              }}
              value={query}
            >
              Search
            </button>
          </form>
        </>
      )}

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
