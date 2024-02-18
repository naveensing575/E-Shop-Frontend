import React, { useState, useEffect } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDisplayDate } from '../utils/formatDate';
import { fetchPurchaseHistory } from '../services/orderHistoryService';
import GoBackBtn from '../components/Button/GoBackBtn';
import Loader from '../components/Loader/Loader';

const OrdersHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = localStorage.getItem('userInfo');
  const authToken = userInfo ? JSON.parse(userInfo).token : null;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await fetchPurchaseHistory(authToken);
        setPurchaseHistory(history);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [authToken]);

  return (
    <Container>
      <Row className='mt-4 mb-4'>
          <GoBackBtn />
      </Row>
      <h1 className="mt-3 mb-5 font">Orders History</h1>
      {isLoading ? <Loader/>
        : purchaseHistory.length > 0 ? (
        <Table striped bordered hover>
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
                    {index + 1}
                  </Link>
                </td>
                <td>{formatDisplayDate(order.purchasedProducts[0]?.purchasedDate)}</td>
                <td>${order.purchasedProducts.reduce((total: number, product: any) => {
                  return total + product.quantity * product.product.price;
                }, 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No orders purchased.</p>
      )}
    </Container>
  );
};

export default OrdersHistory;
