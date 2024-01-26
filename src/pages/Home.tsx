import React from 'react';
import { Container } from 'react-bootstrap';
import ProductList from './ProductList';

const Home: React.FC = () => {
  return (
    <Container fluid>
      <ProductList />
    </Container>
  );
};

export default Home;
