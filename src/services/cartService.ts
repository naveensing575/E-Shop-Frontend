import axiosInstance from '../utils/axiosInstance';

const cartService = {
  fetchCartItem: async () => {
    try {
      const response = await axiosInstance.get('/cart');
      return response.data.cartItems;
    } catch (error) {
      throw new Error('Error fetching cart items');
    }
  },
};

export default cartService;
