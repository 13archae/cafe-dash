import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

function Cafe({ res, setCafeId }) {
  return (
    <Col xs="6" sm="4" key={res.id}>
      <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
        <CardImg top={true} style={{ height: 150 }} src={res.image.url} />
        <CardBody>
          <CardTitle style={{ "font-size": "14px", "text-align": "center" }}>
            {res.name}
          </CardTitle>
          <CardText style={{ "font-size": "12px", "text-align": "center" }}>
            {res.description}
          </CardText>
        </CardBody>
        <div className="card-footer text-center">
          <Button className={"btn btn-dark"} onClick={() => setCafeId(res.id)}>
            Select Dishes
          </Button>
        </div>
      </Card>
    </Col>
  );
}

export default Cafe;
