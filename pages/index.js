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

     

      <Featured />
    </div>
  );
}
