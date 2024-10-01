import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Featured from "@/components/Featured";
//  require('dotenv').config();

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title> Cafe Dash</title>
        <meta name="description" conntent="Cafe Dash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-sm-1">&nbsp;</div>
          <div className="h5 col-sm-10 mb-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </div>
          <div className="col-sm-1">&nbsp;</div>
        </div>
      </div>

      <Featured />
    </div>
  );
}
