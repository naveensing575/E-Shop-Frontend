import React, { useEffect, useState } from 'react';
import { Container, Table, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const userInfo = localStorage.getItem('userInfo');
  const authToken = userInfo ? JSON.parse(userInfo).token : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cart`,{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCartItems(response.data);

      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Function to handle product click
  const handleProductClick = (productId: number) => {
    // Navigate to the product page with the product ID
    navigate(`/products/${productId}`);
  };

  return (
    <Container>
      <h1 className="mt-3 mb-5">Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.cartItemId}>
              <td>{index+1}</td>
              <td>{item.product.productName}</td>
              <td>{item.quantity}</td>
              <td>{item.product.productDescription}</td>
              <td>
                {/* Add onClick event to the Image component */}
                <Image
                  src={item.product.image}
                  alt={item.product.productName}
                  style={{ width: '100px', cursor: 'pointer' }} // Add cursor pointer
                  onClick={() => handleProductClick(item.product.productId)} // Call handleProductClick with product ID
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CartPage;
