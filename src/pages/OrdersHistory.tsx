import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const OrdersHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const userInfo = localStorage.getItem('userInfo');
  const authToken = userInfo ? JSON.parse(userInfo).token : null;

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/orders/history', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPurchaseHistory(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchaseHistory();
  }, []);

  // Function to format date
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Container>
      <h1 className="mt-3 mb-5">Orders History</h1>
      {purchaseHistory.map((order: any) => (
        <div key={order.purchaseHistoryId} className="mb-5">
          <h3>Order ID: {order.purchaseHistoryId}</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.purchasedProducts.map((product: any) => (
                <tr key={product.purchasedProductId}>
                  <td>{product.product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>${product.product.price.toFixed(2)}</td>
                  <td>${(product.quantity * product.product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Total Amount: ${order.purchasedProducts.reduce((total: number, product: any) => {
            return total + product.quantity * product.product.price;
          }, 0).toFixed(2)}</p>
          <p>Date: {formatDisplayDate(order.purchasedProducts[0].purchasedDate)}</p> {/* Displaying Formatted Date */}
        </div>
      ))}
    </Container>
  );
};

export default OrdersHistory;
