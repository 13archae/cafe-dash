import React from "react";
import Dishes from "./dishes"
import { useContext, useState, useEffect, router } from 'react';
import axios from "axios";


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
  //const [cafeID, setCafeID] = useState([]);
  //const { cart } = useContext(AppContext);
  //const [state, setState] = useState(cart);

  

  const { data: session } = useSession()
  if (session) {
    console.log("Session: ", session);
  } else {
    console.log("No Session: ", null);
  }



  useEffect(() => {
    axios
        .get(
            `http://localhost:3000/api/cafes`
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


  // let searchQuery = cafes.filter((res) => {
  //   return res.name.toLowerCase().includes(props.search)
  //  }) || [];

  // cafeID = searchQuery[0] ? searchQuery[0].id : null; 

  //definet renderer for Dishes
  const renderDishes = (cafeId) => {
    console.log(`renderDishes: cafeId: ${cafeId}`);
    return (<Dishes theCafeId={cafeId}> </Dishes>)
  };

  if (cafes.length > 0) {
    const cafeList = cafes.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={
               res.image.url
            }
          />
          <CardBody>
          <CardTitle>{res.name}</CardTitle>  
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