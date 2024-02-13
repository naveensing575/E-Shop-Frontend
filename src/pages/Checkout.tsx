import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../contexts/cartContext';
import OrderModal from '../components/Modal/OrderModal';
import GoBackBtn from '../components/Button/GoBackBtn';
import { fetchCartItems } from '../services/cartService';
import { placeOrder } from '../services/orderService';

interface CartItem {
  cartItemId: number;
  quantity: number;
  product: {
    productId: number;
    productName: string;
    price: number;
  };
}

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { updateCartCount } = useCart();
  const userInfo = localStorage.getItem('userInfo');
  const authToken = userInfo ? JSON.parse(userInfo).token : null;

  useEffect(() => {
    const fetchCartItemsData = async () => {
      const fetchedCartItems = await fetchCartItems(authToken);
      setCartItems(fetchedCartItems);

      const totalPrice = fetchedCartItems.reduce(
        (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
        0
      );
      setTotal(totalPrice);
    };

    fetchCartItemsData();
  }, [authToken]);


  const handlePlaceOrder = async () => {
    setShowModal(true);
    try {
      await placeOrder(authToken, cartItems);

      // Call updateCartCount with 0 to clear the cart count after placing the order
      updateCartCount(0);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <Row className="mb-4 mt-5">
        <Col xs={12}>
          <GoBackBtn />
        </Col>
      </Row>

      <h1 className="mt-3 mb-5 font">Checkout</h1>
      {cartItems && cartItems.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.cartItemId}>
                <td>{item.product.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.product.price.toFixed(2)}</td>
                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>
                <strong>Total:</strong>
              </td>
              <td>
                <strong>${total.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
      <Button variant="primary" onClick={handlePlaceOrder}>
        Place Order
      </Button>
      {showModal && <OrderModal isOpen={showModal} onClose={handleCloseModal} />}
    </Container>
  );
};

export default CheckoutPage;
