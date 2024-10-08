/* /pages/login.js */

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { AppContext } from "@/components/context";

function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AppContext);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  function forwardToHome() { 
      if (isAuthenticated) {
         // redirect if you're already logged in
      }
    }
  
    return (
      <Container style={{ backgroundColor: '#2a7b90' }}>

      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              <img src="" />
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="#2a7b90"
                      onClick={() => {
                        setLoading(true);
                        console.log(`data: ${JSON.stringify(data)}`)
                        axios
                          .post(
                              `http://localhost:3000/api/user/login`,
                              { 
                                  username: data.identifier,
                                  password: data.password,
                                  
                              }
                          )
                          .then((res) => {
                            // set authed user in global context object
                            //console.log("res.data", res.data);
                            setUser(res.data.result[0]);
                            setLoading(false);
                            setIsAuthenticated(true);
                            
                            console.log(`response data: ${JSON.stringify(res.data.result[0])}`);
                            router.push("/");

                          })
                          .catch((error) => {
                            console.log(`error in register: ${error}`)
                            setError(error.response.data);
                            setLoading(false);
                            
                          });


                      }}
                    >
                      {loading ? "Loading... " : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2a7b90;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
            
        `}
      </style>
    </Container>
  );
}

export default Login;
