import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import CafeList from "@/components/CafeList";
import Cart from "@/components/cart";
import { AppContext } from "@/components/context";
//  require('dotenv').config();

export default function Cafes() {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AppContext);

    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
          router.push("/"); // redirect if you're not logged in
        }
      }, []);

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

      <CafeList />
        <Cart></Cart>
    </div>
  );
}
