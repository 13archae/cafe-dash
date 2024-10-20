import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Row, Col } from "reactstrap";
import OrderModal from "@/components//OrderModal";

function OrdersList({ theUserId }) {
  const [orders, setOrders] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleItemClick = (item) => {
    console.log("Item clicked", item);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

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
              <div key={order._id}>
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
                  <div className="col-md-2">
                    {USDollar.format(order.amount / 100)}
                  </div>
                  <div className="col-md-4">
                    <button
                      id={index}
                      onClick={() => handleItemClick(order)}
                      style={{ fontSize: ".8em" }}
                    >
                      Order Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showModal ? (
            <OrderModal
              showModal={showModal}
              inorder={selectedItem}
              onClose={handleModalClose}
            />
          ) : (
            <>No Order</>
          )}
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
