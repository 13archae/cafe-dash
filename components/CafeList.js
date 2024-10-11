
import Dishes from "./dishes"
import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';


//import { AppContext } from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";


import { useSession } from "next-auth/react"


function CafeList(props) {
  const [cafes, setCafes] = useState([]);
  const [cafeId, setCafeId] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
  
    axios
        .get(
            `${process.env.NEXT_PUBLIC_API_ROOT}/api/cafes`
        )
        .then((res) => {
          setCafes(res.data.result);

        })
        .catch((error) => {
          console.log(`error in cafes: ${error}`)
          //setError(error.response.data);
          //setLoading(false);
          
        });
      console.log(`Query Data: ${JSON.stringify(cafes)}`)
    }, []); 

    
    if (status === "unauthenticated") {
      router.push("/"); 
    }


  // let searchQuery = cafes.filter((res) => {
  //    return res.name.toLowerCase().includes(props.search)
  //   }) || [];

  //setCafeId(searchQuery[0] ? searchQuery[0].id : null); 

  

  //definet renderer for Dishes
  const renderDishes = (cafeID) => {
    console.log(`renderDishes: cafeId: ${cafeId}`);
    return (<Dishes theCafeId={cafeID}> </Dishes>)
  };

  if(cafes.length > 0) {
    const cafeList = cafes.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 150 }}
            src={
               res.image.url
            }
          />
          <CardBody>
          <CardTitle >{res.name}</CardTitle>  
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">

            <Button color="info" onClick={() => setCafeId(res.id)} >Select Dishes</Button>

          </div>
        </Card>
      </Col>
    ));

    return (

      <Container>
        <Row xs='3'>
          {cafeList}
        </Row>

        <Row xs='3'>
          {renderDishes(cafeId)}
        </Row>

      </Container>

    )
  } else {
    return <h1> No Cafes Found</h1>
  }
}
export default CafeList