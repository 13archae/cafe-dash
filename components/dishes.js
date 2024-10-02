import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import {AppContext} from "./context";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
function Dishes({ theCafeId }) {
  //const [restaurantID, setRestaurantID] = useState();

  const [dishes, setDishes] = useState();
  const { addItem } = useContext(AppContext);

  console.log(`in dishes: cafeId : ${theCafeId}`);
  

  useEffect(() => {
    if (theCafeId < 1) {
      theCafeId = 1;
    } 
    axios
        .post(
            `http://localhost:3000/api/dishes`,
            { 
              cafeId: theCafeId
          }
      )
        .then((res) => {

          console.log(res);
          setDishes(res.data.result);

        })
        .catch((error) => {
          console.log(`error in dishes: ${error}`)
          
        });
      console.log(`Query Data: ${dishes}`);

    }, [theCafeId]);


  if (theCafeId && theCafeId > 0 && dishes && dishes.length > 0) {
    return (
      <>
        {dishes.map((res) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 150, width: 150 }}
                src={`${res.image.url}`}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
                <CardText>${res.price}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  color="info"
                  outline-color="primary"
                  onClick={() => addItem(res)}
                >
                  + Add To Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </>
    );
  } else {
    return <h1> No Dishes</h1>;
  }
}
export default Dishes;
