import axios from 'axios';

export async function fetchProductDetails(productId: number, authToken: string) {
  try {
    const response = await axios.get(`http://localhost:4000/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch product details: ${response.statusText}`);
    }
  } catch (error: any) {
    throw error;
  }
}
