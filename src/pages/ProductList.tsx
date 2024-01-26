import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { BsCartPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import NoProductImage from '../assets/default.png';

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:4000/products');

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error('Failed to fetch products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Container>
      <h2 className="mt-3">Products</h2>
      <Row xs={1} sm={2} md={3} lg={4}>
        {products.map((product) => (
          <Col key={product.productId} className="mb-4">
            <Card>
              <Image src={NoProductImage} alt="Product" fluid />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text className="mb-3">{product.productDescription}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between text-center">
                <Button
                  variant="primary"
                  className="w-0 p-2"
                  onClick={() => handleViewDetails(product.productId)}
                >
                  View Details
                </Button>
                <Button variant="success" className="w-0 p-2">
                  <BsCartPlus className="mr-2" />
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
