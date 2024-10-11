import React from "react";
//import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession} from "next-auth/react";
import { Container, Row, Col, Button  } from 'reactstrap';



//import Head from "next/head";
//import Image from "next/image";
//import styles from "../styles/Home.module.css";
import Featured from "@/components/Featured";



export default function index() {

  

  const { data: session } = useSession();

 
  return ( 
    <>
    <Featured />

    
    </>  
  )
  
}
