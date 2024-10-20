import React, { useState } from "react";
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const OrderModal = ({ showModal, inorder, onClose }) => {
  const [modal, setModal] = useState(showModal);
  //const [dishes, setDishes] = useState([]);

  //const toggle = () => setModal(!modal);

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  console.log("In OrderModal:  order:  ", inorder);
  console.log("In OrderModal:  dishes:  ", inorder?.dishes);
  const dishes = inorder?.dishes;

  return (
    <Modal id={inorder._id} style={customStyles} isOpen={modal}>
      <ModalHeader>Order Details</ModalHeader>
      <ModalBody>
        <Container style={{ fontSize: ".65em" }}>
          <Row style={{ fontWeight: "600", fontSize: "1.1em" }}>
            <Col>Dishes:</Col>
          </Row>
          <Container>
            <Row style={{ fontWeight: "600" }}>
              <Col xs={6}>Name</Col>
              <Col>Price</Col>
              <Col>Qty.</Col>
              <Col>Cost</Col>
            </Row>

            {dishes.map((dish, index) => {
              console.log("In OrderModal:  dish:  ", dish);
              return (
                <Row key={index}>
                  <Col xs={6}>{dish.name}</Col>
                  <Col>{USDollar.format(dish.price)}</Col>
                  <Col>{dish.quantity}</Col>
                  <Col>{USDollar.format(dish.price * dish.quantity)}</Col>
                </Row>
              );
            })}
          </Container>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-close" color="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OrderModal;
