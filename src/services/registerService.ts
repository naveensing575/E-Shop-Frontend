import axios from 'axios';

export interface Address {
  flat: string;
  street: string;
  city: string;
  country: string;
  zipcode: string;
}

export interface UserData {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  address: Address;
}

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post('/register', {
      ...userData,
      address: {
        flat: userData.address.flat,
        street: userData.address.street,
        city: userData.address.city,
        country: userData.address.country,
        zipcode: userData.address.zipcode,
      },
    });

    if (response.status !== 201) {
      throw new Error('Registration failed');
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Unknown error');
  }
};
