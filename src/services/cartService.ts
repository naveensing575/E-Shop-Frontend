import axios from 'axios';

export async function fetchCartItems(authToken: string) {
  try {
    const response = await axios.get(`/cart`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      return response.data.cartItems;
    } else {
      throw new Error(`Failed to fetch cart items: ${response.statusText}`);
    }
  } catch (error: any) {
    throw error;
  }
}
