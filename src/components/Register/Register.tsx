import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import register from '../../services/register';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dob: string;
  flat: string;
  street: string;
  city: string;
  country: string;
  zipcode: string;
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
      dob: '',
      flat: '',
      street: '',
      city: '',
      country: '',
      zipcode: '',
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
       dob: Yup
    .date()
    .nullable()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
      flat: Yup.string().required('Flat is Required'),
      street: Yup.string().required('Street is Required'),
      city: Yup.string().required('City is Required'),
      country: Yup.string().required('Country is Required'),
      zipcode: Yup.string().required('Zipcode is Required'),
    }),
    onSubmit: async (values) => {
      try {
        await register.register(values);

        // Registration successful, redirect to login page
        navigate('/login');
      } catch (error) {
        console.error('Registration error:', error);
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
          <label>Date of Birth:</label>
          <input type="date" {...formik.getFieldProps('dob')} />
          {formik.touched.dob && formik.errors.dob ? (
            <div className="error">{formik.errors.dob}</div>
          ) : null}
        </div>

        <div>
          <label>Flat/House/Apartment:</label>
          <input type="text" {...formik.getFieldProps('flat')} />
          {formik.touched.flat && formik.errors.flat ? (
            <div className="error">{formik.errors.flat}</div>
          ) : null}
        </div>

        <div>
          <label>Street:</label>
          <input type="text" {...formik.getFieldProps('street')} />
          {formik.touched.street && formik.errors.street ? (
            <div className="error">{formik.errors.street}</div>
          ) : null}
        </div>

        <div>
          <label>City:</label>
          <input type="text" {...formik.getFieldProps('city')} />
          {formik.touched.city && formik.errors.city ? (
            <div className="error">{formik.errors.city}</div>
          ) : null}
        </div>

        <div>
          <label>Country:</label>
          <input type="text" {...formik.getFieldProps('country')} />
          {formik.touched.country && formik.errors.country ? (
            <div className="error">{formik.errors.country}</div>
          ) : null}
        </div>

        <div>
          <label>Zipcode:</label>
          <input type="text" {...formik.getFieldProps('zipcode')} />
          {formik.touched.zipcode && formik.errors.zipcode ? (
            <div className="error">{formik.errors.zipcode}</div>
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
