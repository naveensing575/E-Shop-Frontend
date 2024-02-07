import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDisplayDate } from '../utils/formatDate';

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
  }, [authToken]);

  return (
    <Container>
      <h1 className="mt-3 mb-5 font">Orders History</h1>
      {purchaseHistory ? <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((order: any, index: number) => (
            <tr key={order.purchaseHistoryId}>
              <td>
                <Link to={`/orders/${order.purchaseHistoryId}`}>
                  {index+1}
                </Link>
              </td>
              <td>{formatDisplayDate(order.purchasedProducts[0]?.purchasedDate)}</td>
              <td>${order.purchasedProducts.reduce((total: number, product: any) => {
                return total + product.quantity * product.product.price;
              }, 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>: (
        <p>No order details found.</p>
      )}
    </Container>
  );
};

export default OrdersHistory;
