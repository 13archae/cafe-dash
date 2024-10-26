/* /pages/register.js */

import { useState } from "react";
import { useRouter } from "next/router";
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
import axios from "axios";
import Modal from 'react-modal';
import { useFormik } from 'formik';
import * as yup from 'yup';



const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false)
  const customStyles = { 
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }, 
    content: { top: '50%', 
    left: '50%', 
    right: 'auto', 
    bottom: 'auto', 
    marginRight: '-50%', 
    transform: 'translate(-50%, -50%)' } 
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;



  const validationSchema = yup.object().shape({
    username: yup.string().min(6, 'Username must be at least 6 characters').required('Username is required'),
    email: yup.string().email().matches(emailPattern, 'Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      setLoading(true);

      console.log(`values: ${JSON.stringify(values)}`);

      

      axios
        .post(
            process.env.NEXT_PUBLIC_API_ROOT + `/api/user/signup`,
            { 
                username: values.username,
                email: values.email,
                password: values.password,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        )
        .then((res) => {
          // set authed user in global context object
          setLoading(false);
          //console.log(`registered user: ${JSON.stringify(res.data)}`);
          setIsOpen(true);

          setTimeout(() => {
            setIsOpen(false);
            router.push("/");
          }
          , 5000);
          
        })
        .catch((error) => {
          console.log(`error in register: ${error}`)
          setLoading(false);
          setIsOpen(false);
        });
      console.log(values);
    },
  });




  

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            
            <section className="wrapper">
              <h2>Register</h2>
              <Form onSubmit={formik.handleSubmit}>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label htmlFor={"username"}>Username:</Label>
                    <Input
                      id={"username"}
                      name={"username"}
                      type={'text'}
                      style={{ height: 50, fontSize: "1.2em" }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <div style={{ color: "crimson", fontSize: ".8em" }}>{formik.errors.username}</div>
                    )}

                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor={"email"}>Email:</Label>
                    <Input
                      id={"email"}
                      name={"email"}
                      type={"email"}
                      style={{ height: 50, fontSize: "1.2em" }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div style={{ color: "crimson", fontSize: ".8em" }}>{formik.errors.email}</div>
                    )}
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label htmlFor={"password"}>Password:</Label>
                    <Input
                      id={"password"}
                      name={"password"}
                      type={"password"}
                      style={{ height: 50, fontSize: "1.2em" }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div style={{ color: "crimson", fontSize: ".8em" }}>{formik.errors.password}</div>
                    )}
                    
                  </FormGroup>
                  <FormGroup>
                  
                  
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="dark"
                      type="submit"
                    >
                      {loading ? "Loading.." : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <Modal isOpen={isOpen} ariaHideApp={false} onRequestClose={() => setIsOpen(false)} style={customStyles}><h3>Success</h3><div>You have successfully registered.  You will be redirected in 5 seconds.</div> 
      
      </Modal>
      <style jsx>
        {`
        input:invalid {
          border: 2px dashed red;
        }

        input:invalid:required {
          background-image: linear-gradient(to right, pink, lightgreen);
        }

        input:valid {
          border: 2px solid black;
        }

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
            background-color: #2196f3;
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
};
export default Register;
