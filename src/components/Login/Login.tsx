import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useUser } from "../../contexts/userContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (values: any, actions: any) => {
    try {
      const { email, password } = values;

      // Sign in with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get the ID token from the userCredential
      const user = userCredential.user;
      const userEmail = user?.email ?? '';

      // Update user information using the context, including uid
      login(userEmail, await user?.getIdToken());

      // Send the ID token to the backend for further verification
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await user?.getIdToken()}`,
        },
      });

      if (response.ok) {
        console.log("Logged in successfully");
        console.log(user);
        // Store the ID token in local storage (handled by the context)
        navigate("/home");
      } else {
        // Handle login error
        throw new Error("Invalid email or password");
      }
      actions.resetForm();
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);

      // Set a custom error message in the form
      actions.setFieldError("password", "Invalid email or password");
    } finally {
      // Set submitting to false to enable the form button
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h1>E-Shop</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {(formikProps) => (
            <Form className="form">
              <div>
                <Field type="email" name="email" className="form-input" required placeholder="Email"/>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div>
                <Field type="password" name="password" className="form-input" required  placeholder="Password"/>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <button type="submit" className="form-button" disabled={formikProps.isSubmitting}>
                {formikProps.isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
