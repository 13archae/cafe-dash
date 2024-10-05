import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession} from "next-auth/react";

//import Head from "next/head";
//import Image from "next/image";
//import styles from "../styles/Home.module.css";
import Featured from "@/components/Featured";

export default function index() {

  const { data: session } = useSession()
  if(session) {
    return ( 
      <>
        Signed in as {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
        <Featured />
      </>
    )
  }
  else{
  return (
    <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
}
