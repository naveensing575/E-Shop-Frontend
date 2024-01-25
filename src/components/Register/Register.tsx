import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  // Initialize formik with form values type
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
  onSubmit: async (values) => {
  try {
    const response = await axios.post('http://localhost:4000/register', {
      ...values,
      address: {
        flat: values.address.flat,
        street: values.address.street,
        city: values.address.city,
        country: values.address.country,
        zipcode: values.address.zipcode,
      },
    });

    if (response.status === 200) {
      const userData = response.data; 

      // Modify the user data structure to include the address as an object
      const updatedUserData = {
        ...userData,
        address: {
          flat: values.address.flat,
          street: values.address.street,
          city: values.address.city,
          country: values.address.country,
          zipcode: values.address.zipcode,
        },
      };

      // Handle the updated user data as needed
      console.log('User registered successfully:', updatedUserData);

      // Redirect to the login page
      navigate('/login');
    } else {
      // Handle registration failure
      console.error('Registration failed:', response.data.error || 'Unknown error');
    }
  } catch (error: any) {
    console.error('Registration error:', error.message || 'Unknown error');
  }
},

  });

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label>Password:</label>
          <input type="password" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="text" {...formik.getFieldProps('phoneNumber')} />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="error">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>

        <div>
          <label>First Name:</label>
          <input type="text" {...formik.getFieldProps('firstName')} />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" {...formik.getFieldProps('lastName')} />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div>
          <label>Flat/House/Apartment:</label>
          <input type="text" {...formik.getFieldProps('address.flat')} />
          {formik.touched.address?.flat && formik.errors.address?.flat ? (
            <div className="error">{formik.errors.address?.flat}</div>
          ) : null}
        </div>

        <div>
          <label>Street:</label>
          <input type="text" {...formik.getFieldProps('address.street')} />
          {formik.touched.address?.street && formik.errors.address?.street ? (
            <div className="error">{formik.errors.address?.street}</div>
          ) : null}
        </div>

        <div>
          <label>City:</label>
          <input type="text" {...formik.getFieldProps('address.city')} />
          {formik.touched.address?.city && formik.errors.address?.city ? (
            <div className="error">{formik.errors.address?.city}</div>
          ) : null}
        </div>

        <div>
          <label>Country:</label>
          <input type="text" {...formik.getFieldProps('address.country')} />
          {formik.touched.address?.country && formik.errors.address?.country ? (
            <div className="error">{formik.errors.address?.country}</div>
          ) : null}
        </div>

        <div>
          <label>Zipcode:</label>
          <input type="text" {...formik.getFieldProps('address.zipcode')} />
          {formik.touched.address?.zipcode && formik.errors.address?.zipcode ? (
            <div className="error">{formik.errors.address?.zipcode}</div>
          ) : null}
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
