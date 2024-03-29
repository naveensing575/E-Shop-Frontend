import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useUser } from "../../contexts/userContext";
import { Container, Row, Col, Card, Form as BootstrapForm, Button } from "react-bootstrap";
import { login } from "../../services/authService";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: contextLogin } = useUser();

  const handleLogin = async (values: any, actions: any) => {
    try {
      const { email, password } = values;

      // Sign in with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get the ID token from the userCredential
      const user = userCredential.user;
      const userEmail = user?.email ?? '';
      const userName = user?.email?.trimEnd()?.split('@')[0] ?? '';

      // Call the login function from authService
      await login(email, password, await user?.getIdToken());

      contextLogin(userName, userEmail, await user?.getIdToken());

      navigate("/home");
      actions.resetForm();
    } catch (error) {
      console.error("Login error:", error);
      actions.setFieldError("password", "Invalid email or password");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Container fluid className="h-100 mt-5">
      <Row className="h-100 justify-content-center align-items-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">E-Shop</h1>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {(formikProps) => (
                  <Form>
                    <div className="mb-3">
                      <Field type="email" name="email" as={BootstrapForm.Control} placeholder="Email" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <Field type="password" name="password" as={BootstrapForm.Control} placeholder="Password" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    <Button type="submit" className="w-100" disabled={formikProps.isSubmitting}>
                      {formikProps.isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  </Form>
                )}
              </Formik>

              <p className="mt-3 text-center">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
