import React, { useState, useContext } from "react";
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

function Dish({ res }) {
  //const { addItem } = useContext(AppContext);

  return (
    <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
      <Card style={{ margin: "0 10px" }}>
        {/* <CardImg
                top={true}
                style={{ height: 150, width: 150 }}
                src={`${res.image.url}`}
              /> */}

        <CardBody>
          <CardTitle style={{ "font-size": "14px", "text-align": "center" }}>
            {res.name}
          </CardTitle>
          <CardText style={{ "font-size": "12px", "text-align": "center" }}>
            {res.description}
          </CardText>
          <CardText style={{ "font-size": "14px", "text-align": "center" }}>
            ${res.price}
          </CardText>
        </CardBody>
        <div className="card-footer">
          <Button color="dark" onClick={() => addItem(res)}>
            + Add To Cart
          </Button>
        </div>
      </Card>
    </Col>
  );
}

export default Dish;
