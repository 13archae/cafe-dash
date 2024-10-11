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
          `${process.env.NEXT_PUBLIC_API_ROOT}/api/dishes`,
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
                <CardTitle style={{"font-size": "14px", "text-align": "center"}}>{res.name}</CardTitle>
                <CardText style={{"font-size": "12px", "text-align": "center"}}>{res.description}</CardText>
                <CardText style={{"font-size": "14px", "text-align": "center"}}>${res.price}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  color="dark"
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
    return <div style={{"text-align": "center", "width": "100%"}}><h5> No Dishes</h5></div>
  }
}
export default Dishes;
