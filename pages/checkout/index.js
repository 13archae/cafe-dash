/* pages/checkout.js */

import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkoutForm";
import { AppContext } from "@/components/context";
import Cart from "@/components/cart";

import { useSession} from "next-auth/react";
import { getToken } from "next-auth/jwt"

function Checkout() {
  // get app context
  const { data: session, status } = useSession();
  const { isAuthenticated } = status==="authenticated" ? true : false;
  // isAuthenticated is passed to the cart component to display order button
  //const isAuthenticated  = true;

  



  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
  );

console.log("CheckoutSession: ", session);

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h3 style={{ margin: 20 }}>Checkout</h3>
        <Cart isAuthenticated={status === 'authenticated'} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
  // }
}
export default Checkout;
