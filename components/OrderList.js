import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Row, Col } from "reactstrap";

function OrdersList({ theUserId }) {
  const [orders, setOrders] = useState([]);

  //const theUserId = props.userId;

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleShow = () => {
    setIsOpen(true);
  };

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

  console.log(`in OrderList: userId : ${theUserId}`);

  useEffect(() => {
    if (!theUserId || theUserId < 1) {
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ROOT}/api/orders/list`, {
        userId: theUserId,
      })
      .then((res) => {
        setOrders(res.data.result);
      })
      .catch((error) => {
        console.log(`error in orders: ${error}`);
        //setError(error.response.data);
        //setLoading(false);
      });
    console.log(`Query Data: ${JSON.stringify(orders)}`);
  }, []);

  if (orders && orders.length > 0) {
    return (
      <>
        <div className="container">
          <h1>Order List</h1>

          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <h5>Order Date</h5>
              </div>
              <div className="col-md-4">
                <h5>Charge Id</h5>
              </div>
              <div className="col-md-2">
                <h5>Total Paid</h5>
              </div>
              <div className="col-md-4"></div>
            </div>

            {orders.map((order, index) => (
              <>
                <div
                  className="row"
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f2f2f2",
                  }}
                >
                  <div className="col-md-2">
                    {order.createdAt.substring(0, 10)}
                  </div>
                  <div
                    className="col-md-4"
                    style={{ fontSize: ".8em", color: "indigo" }}
                  >
                    {order.charge_id}
                  </div>
                  <div className="col-md-2">${order.amount / 100}</div>
                  <div className="col-md-4">
                    <span onClick={handleShow}>Order Details</span>
                  </div>
                </div>
              </>
            ))}

            <Modal
              isOpen={isOpen}
              ariaHideApp={false}
              onRequestClose={() => setIsOpen(false)}
              style={customStyles}
            >
              <h3>Success</h3>
              <div>
                You have successfully registered. You will be redirected in 5
                seconds.
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div style={{ textAlign: "center", width: "100%" }}>
        <h5> No Orders</h5>
      </div>
    );
  }
}
export default OrdersList;
