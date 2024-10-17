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
                <div className="col-md-6" >
                  <h5>Order Details</h5>    
                </div>
                </div>
                
                {orders.map((order, index) => (
                  <>
                  <div className="row" style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2' }}>
                <div className="col-md-2">
                  {order.createdAt.substring(0, 10)}
                </div>
                <div className="col-md-4" style={{fontSize: ".8em", color: "indigo"}}>
                  {order.charge_id}    
                </div>
                <div  className="col-md-6"> 
                    other data
</div>
</div>

                </>
                  
                  ))}
              </div>
            </div>
      
      </>
    );
  } else {
    return <div style={{"textAlign": "center", "width": "100%"}}><h5> No Orders</h5></div>
  }
}
export default OrdersList;
