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
  if(session) {
    return ( 
      <>
        <Container >
          <Row>
            <Col xs="12" md="7">&nbsp;</Col>
            <Col xs="12" md="5" fontSize={14}> 
              Signed in as {JSON.stringify(session.user.name)} &nbsp;:&nbsp;&nbsp;&nbsp;
            <button onClick={() => signOut()}>Sign out</button>
            </Col>
          </Row>
        </Container>
        
        <Featured />
          
        
      </>
    )
  }
  else{
  return (
    <>
      Not signed in <br/>
      <button onClick={() => signIn('google', {callbackUrl: '/cafes'})}>Sign in</button>
    </>
  )
}
}
