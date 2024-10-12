import React, { useState, useContext } from 'react';
//import { useNavigate } from 'react-router-dom';
import { signIn, signOut, useSession} from "next-auth/react";
import { useRouter } from 'next/router';

// @refresh reset


function NavBar(args) {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();
  //const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const signUp = () => {
    router.push("/register"); 
  }

const uid = session?.user?.id;

  const handleOrdersClick = () => {  
    const queryParams = new URLSearchParams({
      userId: uid
    });
    router.push(`/orders?${queryParams.toString()}`);
  }

  return (


    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Cafe Dash</a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">

            {status === "authenticated" && <a className="nav-link" href="/cafes">Our Cafes</a>}
            {status !== "authenticated" && <a className="nav-link disabled" href="/cafes">Our Cafes</a>}
          
        </li>
        <li className="nav-item">

            {status === "authenticated" && <span className="nav-link" onClick={handleOrdersClick}>Orders</span>}
            {status !== "authenticated" && <a className="nav-link disabled" href="/orders">Orders</a>}
          
        </li>
        
      </ul>
     
      {status === "authenticated" &&  (
      <>
          <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" onChange={(e) =>
                        setQuery(e.target.value.toLocaleLowerCase())
                        }
                        value={query}>Search</button>
        </form>

          
      </>
    
    )
}

  
    {status === "authenticated" && <span className="navbar-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> }
    {status === "authenticated" && session.user.name }
    {status === "authenticated" &&   <span className="navbar-text">&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;</span> }
    {status === "authenticated" &&  <span style={{ cursor: 'pointer' }} onClick={() => signOut()}>Sign out</span>}

    {status !== "authenticated" && <span className="navbar-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span> }
    {status !== "authenticated" &&  <span style={{ cursor: 'pointer' }} onClick={() => signUp()}>Sign Up</span>}
    {status !== "authenticated" &&   <span className="navbar-text">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span> }
    {status !== "authenticated" &&  <span style={{ cursor: 'pointer' }} onClick={() => signIn()}>Sign In</span>}
  </nav>
    
    
  );
}





export default NavBar;