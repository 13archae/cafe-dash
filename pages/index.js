import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut} from "nextauth-react";

//import Head from "next/head";
//import Image from "next/image";
//import styles from "../styles/Home.module.css";
//import Featured from "@/components/Featured";
//  require('dotenv').config();

export default function index() {

  return (
    
    
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
    
      <div onClick={signIn} className="flex w-64 h-auto cursor-pointer items-center justify-center border rounded-md">
        <FcGoogle fontSize={30} className="mr-2" />
        <span className="ml-2 text-lg font-semibold">Sign in with Google</span> 
      </div>
    
    </div>
 
  );
}
