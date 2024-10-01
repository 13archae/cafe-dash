
//import Dishes from "./dishes"
import { useContext, useState, useEffect } from 'react';
import axios from "axios";


import AppContext from "./context"
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

function CafeList(props) {
  const [cafes, setCafes] = useState([])
  //const { cart } = useContext(AppContext);
  //const [state, setState] = useState(cart);

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
      console.log(`Query Data: ${cafes}`)
    }, []); 


  /* let searchQuery = cafes.filter((res) => {
    return res.name.toLowerCase().includes(props.search)
   }) || [];

  let restId = searchQuery[0] ? searchQuery[0].id : null; */

  //definet renderer for Dishes
  /* const renderDishes = (restaurantID) => {
    return (<Dishes restId={restaurantID}> </Dishes>)
  }; */
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

            {/* <Button color="info" onClick={() => setRestaurantID(res.id)}>{res.name}</Button> */}

          </div>
        </Card>
      </Col>
    ));

    return (

      <Container>
        <Row xs='3'>
          {cafeList}
        </Row>

        {/* <Row xs='3'>
          {renderDishes(restaurantID)}
        </Row> */}

      </Container>

    )
  } else {
    return <h1> No Restaurants Found</h1>
  }
}
export default CafeList