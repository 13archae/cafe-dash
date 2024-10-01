import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import CafeList from "@/components/CafeList";
//  require('dotenv').config();

export default function Cafes() {

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
    </div>
  );
}
