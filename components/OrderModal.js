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
  //const [modal, setModal] = useState(showModal);

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

  return (
    <Modal id={"orderdetailmodal"} style={customStyles} isOpen={showModal}>
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        Dishes:
        {inorder?.dishes?.forEach((dish, index) => {
          dish ? (
            <div key={index}>
              Dish: {dish.name} - Quantity: {dish.quantity} - Price: $
              {dish.price}
            </div>
          ) : (
            <div>No dishes</div>
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
