import axios from 'axios';

export async function fetchCategories(authToken: string) {
  try {
    const response = await axios.get<string[]>('http://localhost:4000/products/categories', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
  } catch (error: any) {
    throw error;
  }
}
