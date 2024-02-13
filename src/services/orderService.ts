import axios from 'axios';

export const placeOrder = async (authToken: string, cartItems: any[]) => {
  try {
    await axios.post(
      '/orders/create',
      {
        products: cartItems.map((item) => ({
          productId: item.product.productId,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error('Error placing order');
  }
};

export const fetchOrderDetails = async (orderId: number, authToken: string | null) => {
  try {
    const response = await axios.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.purchasedProducts;
  } catch (error) {
    throw new Error('Error fetching order details');
  }
};
