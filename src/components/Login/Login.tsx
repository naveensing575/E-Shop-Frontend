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
  const { updateUserInfo } = useUser();

  const handleLogin = async (values: any, actions: any) => {
    try {
      const { email, password } = values;

      // Sign in with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get the ID token from the userCredential
      const user = userCredential.user;
      const uid = user?.uid || '';
      const displayName = user?.displayName ??'';
      const userEmail = user?.email ?? '';

      // Update user information using the context, including uid
      updateUserInfo(uid, displayName, userEmail);

      // Send the ID token to the backend for further verification
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: await user?.getIdToken() }),
      });

      if (response.ok) {
        console.log("Logged in successfully");
        console.log(user);
        // Redirect to /home
        navigate("/home");
      } else {
        // Handle login error
        throw new Error("Invalid email or password");
      }

      // Reset the form
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
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {(formikProps) => (
          <Form className="login-form">
            <label>Email:</label>
            <Field type="email" name="email" required />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            <label>Password:</label>
            <Field type="password" name="password" required />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            <button type="submit" disabled={formikProps.isSubmitting}>
              {formikProps.isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
