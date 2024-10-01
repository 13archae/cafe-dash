import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import AppContext from "./context";
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
function Dishes({ restId }) {
  //const [restaurantID, setRestaurantID] = useState();

  const [dishes, setDishes] = useState();
  const { addItem } = useContext(AppContext);

  

  useEffect(() => {
    axios
        .get(
            `http://localhost:3000/api/dishes`
        )
        .then((res) => {
          setDishes(res.data.result);

        })
        .catch((error) => {
          console.log(`error in cafes: ${error}`)
          
        });
      console.log(`Query Data: ${cafes}`)
    }, []); 


  if (restId > 0) {
    return (
      <>
        {restaurant.dishes.map((res) => (
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
              </CardBody>
              <div className="card-footer">
                <Button
                  color="info"
                  outline-color="primary"
                  // TODO: onClick={() => addItem(res)}
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
