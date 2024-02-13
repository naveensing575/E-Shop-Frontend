import axios from 'axios';

export const fetchPurchaseHistory = async (authToken: string | null) => {
  try {
    const response = await axios.get('http://localhost:4000/orders/history', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching purchase history');
  }
};
