import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ToastComponent from '../Toasts/Toast';

interface FormValues {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  address: {
    flat: string;
    street: string;
    city: string;
    country: string;
    zipcode: string;
  };
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      address: {
        flat: '',
        street: '',
        city: '',
        country: '',
        zipcode: '',
      },
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Password is Required').min(6, 'Password must be at least 6 characters'),
      phoneNumber: Yup
        .string()
        .matches(/^\+?[0-9]{1,4}-?[0-9]{6,14}$/, 'Invalid phone number format')
        .required('Phone number is required'),
      firstName: Yup.string().required('First Name Required'),
      lastName: Yup.string().required('Last Name Required'),
      address: Yup.object({
        flat: Yup.string().required('Flat is Required'),
        street: Yup.string().required('Street is Required'),
        city: Yup.string().required('City is Required'),
        country: Yup.string().required('Country is Required'),
        zipcode: Yup.string().required('Zipcode is Required'),
      }).required('Address is Required'),
    }),
    onSubmit: async (values, {resetForm}) => {
      try {
        const response = await axios.post('/register', {
          ...values,
          address: {
            flat: values.address.flat,
            street: values.address.street,
            city: values.address.city,
            country: values.address.country,
            zipcode: values.address.zipcode,
          },
        });

        if (response.status === 201) {
           resetForm();
          setShowToast(true);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          console.error('Registration failed:', response.data.error || 'Unknown error');
        }
      } catch (error: any) {
        console.error('Registration error:', error.message || 'Unknown error');
      }
    },
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mt-3 mb-3">Register</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" {...formik.getFieldProps('email')} />
              <Form.Text className="text-danger">{formik.touched.email && formik.errors.email}</Form.Text>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" {...formik.getFieldProps('password')} />
              <Form.Text className="text-danger">{formik.touched.password && formik.errors.password}</Form.Text>
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('phoneNumber')} />
              <Form.Text className="text-danger">{formik.touched.phoneNumber && formik.errors.phoneNumber}</Form.Text>
            </Form.Group>

            <Form.Group controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('firstName')} />
              <Form.Text className="text-danger">{formik.touched.firstName && formik.errors.firstName}</Form.Text>
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('lastName')} />
              <Form.Text className="text-danger">{formik.touched.lastName && formik.errors.lastName}</Form.Text>
            </Form.Group>

            <Form.Group controlId="flat">
              <Form.Label>Flat/House/Apartment:</Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('address.flat')} />
              <Form.Text className="text-danger">{formik.touched.address?.flat && formik.errors.address?.flat}</Form.Text>
            </Form.Group>

            <Form.Group controlId="street">
              <Form.Label>Street:</Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('address.street')} />
              <Form.Text className="text-danger">{formik.touched.address?.street && formik.errors.address?.street}</Form.Text>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City:</Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('address.city')} />
              <Form.Text className="text-danger">{formik.touched.address?.city && formik.errors.address?.city}</Form.Text>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country:</Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('address.country')} />
              <Form.Text className="text-danger">{formik.touched.address?.country && formik.errors.address?.country}</Form.Text>
            </Form.Group>

            <Form.Group controlId="zipcode">
              <Form.Label>Zipcode:</Form.Label>
              <Form.Control type="text" {...formik.getFieldProps('address.zipcode')} />
              <Form.Text className="text-danger">{formik.touched.address?.zipcode && formik.errors.address?.zipcode}</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={formik.isSubmitting} className='mt-3'>
              {formik.isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </Form>
           <p className="mt-3">
                Already have an account? <a href="/login">Login here</a>
            </p>
           <ToastComponent
            show={showToast}
            onClose={() => setShowToast(false)}
            header="Registration Successful"
            body="You have successfully registered. Please login with your credentials."
            bg="success"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
