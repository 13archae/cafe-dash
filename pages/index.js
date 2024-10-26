import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import CafeList from "@/components/CafeList";
import Cart from "@/components/cart";
import { AppContext } from "@/components/context";

import { useSession } from "next-auth/react";
//import { getToken } from "next-auth/jwt";

export default function Cafes() {
  //const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  const router = useRouter();

  const { data: session, status } = useSession();
  const { query, setQuery } = useContext(AppContext);

  console.log("status: ", status);

  // if (status === "unauthenticated") {
  //   return <p>Access Denied</p>

  //   //router.push("/");
  // }

  /* useEffect(() => {

        console.log("Session: ", session);

        

        /* if (!data) {
          router.push("/api/auth/signin"); // redirect if you're not logged in
        } */
  /*}, []);  */

  return (
    <div className="container">
      <Head>
        <title> Cafes</title>
        <meta name="description" conntent="Cafe Dash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-sm-1">&nbsp;</div>
          <div className="col-sm-1">&nbsp;</div>
        </div>
      </div>

      <CafeList query={query} />
      {status === "authenticated" ? <Cart></Cart> : <></>}
    </div>
  );
}
