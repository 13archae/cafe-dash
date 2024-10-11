import React, {useState, useEffect }from 'react';
import { useSession} from "next-auth/react";
import { useRouter } from 'next/router';
import axios from "axios";

export default function OrderList() {

    const { data: session, status } = useSession();
const router = useRouter();
const [orders, setOrders] = useState([]);

console.log("ORDERS session: ", JSON.stringify(session));

useEffect(() => {

    axios  
        .post(
            `${process.env.NEXT_PUBLIC_API_ROOT}/api/orders/list`,
            { 
                userId: session.user.id //"670824774a1e91852ddb797c"
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
        console.log(`Query Data: ${JSON.stringify(orders)}`)
    }, []); 


if (status === "unauthenticated") {
    router.push("/"); 
}


    return (
        <>
        <div>
            <h1>Order List</h1>
            {orders.length > 0 ? (
            <ul>
                {orders.map(order => (
                <li key={order._id}>Order Date: {order.createdAt}</li>
                ))}
            </ul>
            ) : (
            <p>No orders found.</p>
            )} 
        </div>
        
        </>

    );
};
