import axios from 'axios';

interface FormValues {
  email: string;
  password: string;
  phoneNo: string;
  firstName: string;
  lastName: string;
  dob: string;
  flat: string;
  street: string;
  city: string;
  country: string;
  zipcode: string;
}

const register = {
  async register(formData: FormValues): Promise<void> {
    try {

      await axios.post('http://localhost:4000/register', formData);

      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  }
};

export default register;
