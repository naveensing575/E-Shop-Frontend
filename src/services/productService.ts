import axios from 'axios';

export async function fetchProducts(page: number, limit: number, authToken: string) {
  try {
    const response = await axios.get(`http://localhost:4000/products`, {
      params: {
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
  } catch (error: any) {
    throw error;
  }
}
