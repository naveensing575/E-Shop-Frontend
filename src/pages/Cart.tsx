import React, { useEffect, useState } from 'react';
import { Container, Table, Image, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems } from '../services/cartService';
import CartButton from '../components/Cart/CartButton';
import { CSSTransition } from 'react-transition-group';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false);
  const userInfo = localStorage.getItem('userInfo');
  const authToken = userInfo ? JSON.parse(userInfo).token : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItemsData = async () => {
      try {
        const cartItems = await fetchCartItems(authToken);
        if (cartItems.length === 0) {
          setShowEmptyCartMessage(true);
          setCartItems([]);
          setTotalPrice(0);
        } else {
          setCartItems(cartItems);
          calculateTotalPrice(cartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItemsData();
  }, [authToken]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setTotalPrice(0);
    } else {
      calculateTotalPrice(cartItems);
    }
  }, [cartItems]);

  const calculateTotalPrice = (items: any[]) => {
    const totalPrice = items.reduce(
      (total: number, item: any) => total + item.quantity * item.product.price,
      0
    );
    setTotalPrice(totalPrice);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleCartItemRemoved = (productId: number) => {
  const updatedCartItems = cartItems.filter(item => item.product.productId !== productId);
  setCartItems(updatedCartItems);

  if (updatedCartItems.length === 0) {
    setShowEmptyCartMessage(true);
  }
};


  const handleCartItemAdded = (price: number) => {
    // Recalculate total price whenever an item is added
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mt-3 mb-0 font">Cart</h1>
        {!showEmptyCartMessage && (
          <Button variant="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        )}
      </div>
      {showEmptyCartMessage ? (
        <div className="text-center">
          <Alert variant="secondary">Your Shopping Bag is Empty!!</Alert>
          <div>
            <Button variant="primary" onClick={() => navigate('/products')}>
              Continue Shopping...
            </Button>
          </div>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <CSSTransition key={item.cartItemId} in appear timeout={500} classNames="item">
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.product.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.productDescription}</td>
                  <td>${item.product.price.toFixed(2)}</td>
                  <td>
                    <Image
                      src={item.product.image}
                      alt={item.product.productName}
                      style={{ width: '100px', cursor: 'pointer' }}
                      onClick={() => handleProductClick(item.product.productId)}
                    />
                  </td>
                  <td>
                    <CartButton
                      productId={item.product.productId}
                      initialQuantity={item.quantity}
                      onCartItemRemoved={handleCartItemRemoved}
                      onCartItemAdded={handleCartItemAdded} 
                      price={item.product.price}
                    />
                  </td>
                </tr>
              </CSSTransition>
            ))}
          </tbody>
          {/* <tfoot>
            <tr className="fw-bold fs-4 text-end">
              <td colSpan={5}>
                <strong>Total:</strong>
              </td>
              <td colSpan={2}>${totalPrice.toFixed(2)}</td>
            </tr>
          </tfoot> */}
        </Table>
      )}
    </Container>
  );
};

export default CartPage;
