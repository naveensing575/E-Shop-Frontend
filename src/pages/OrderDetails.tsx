import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { formatDisplayDate } from '../utils/formatDate';
import GoBackBtn from '../components/Button/GoBackBtn';

const OrderDetails = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const [orderId, setOrderId] = useState<number>();
  const authToken = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).token : null;

  useEffect(() => {
    if (orderId) { // Check if orderId exists
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/orders/${orderId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setPurchaseHistory(response.data.purchasedProducts);
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };

      fetchOrderDetails();
    }
  }, [orderId, authToken]);

  useEffect(() => {
    // Get orderId from URL
    const orderId = window.location.pathname.split('/').pop();
    if (orderId) {
      setOrderId(parseInt(orderId));
    }
  }, []);

  return (
    <Container>
      <Row className="mb-4 mt-5">
        <Col xs={12}>
          <GoBackBtn />
        </Col>
      </Row>
      <h1 className="mt-3 mb-5 font">Order Details</h1>
      {purchaseHistory.length > 0 ? (
        <>
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
              {purchaseHistory.map((product: any) => (
                <tr key={product.purchasedProductId}>
                  <td>{product.product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>${product.product.price.toFixed(2)}</td>
                  <td>${(product.quantity * product.product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Total Amount: ${purchaseHistory.reduce((total: number, product: any) => {
            return total + product.quantity * product.product.price;
          }, 0).toFixed(2)}</p>
          <p>Date: {formatDisplayDate(purchaseHistory[0].purchasedDate)}</p>
        </>
      ) : (
        <p>No order details found.</p>
      )}
    </Container>
  );
};

export default OrderDetails;
