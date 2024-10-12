import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import {AppContext} from "./context";
import axios from "axios";
import {
  Button,
  Row,
  Col,
} from "reactstrap";

function OrdersList({ theUserId }) {
  const [orders, setOrders] = useState([]);

  //const theUserId = props.userId;

  console.log(`in OrderList: userId : ${theUserId}`);

  useEffect(() => {
    if (!theUserId || theUserId < 1) {
        return;
    } 
   
    
     axios  
         .post(
             `${process.env.NEXT_PUBLIC_API_ROOT}/api/orders/list`,
              { 
                userId: theUserId
              }
         )
         .then((res) => {
             setOrders(res.data.result);
 
         })
         .catch((error) => {
             console.log(`error in orders: ${error}`)
             //setError(error.response.data);
             //setLoading(false);
             
         });
         console.log(`Query Data: ${JSON.stringify(orders)}`);
     
     
 }, [theUserId]); 
  


  if (orders && orders.length > 0) {
    return (
      <>
        <div>
            <h1>Order List</h1>
            
              <ul>
                  {orders.map(order => (
                      <li key={order._id}>Order Date: {order.createdAt}</li>
                  ))}
            </ul> 
        </div>
      </>
    );
  } else {
    return <div style={{"textAlign": "center", "width": "100%"}}><h5> No Orders</h5></div>
  }
}
export default OrdersList;
