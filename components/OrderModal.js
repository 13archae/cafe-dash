import React, { useState } from "react";
import {
  Button,
  Modal,
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
        Dishes:
        {dishes.map((dish, index) => {
          console.log("In OrderModal:  dish:  ", dish);
          return (
            <div key={index}>
              Dish: {dish?.name} - Quantity: {dish?.quantity} - Price: $
              {dish.price}
            </div>
          );
        })}
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
