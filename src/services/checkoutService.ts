import axios from 'axios';

const fetchCartItems = async (authToken: string | null) => {
  try {
    const response = await axios.get(`/cart`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (Array.isArray(response.data.cartItems)) {
      return response.data.cartItems;
    } else {
      console.error('Invalid response format: cartItems array is missing');
      return [];
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

export { fetchCartItems };
