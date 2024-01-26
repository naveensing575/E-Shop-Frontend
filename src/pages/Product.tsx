import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeft } from 'react-icons/bs';

interface ProductProps {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
}

const Product: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<ProductProps | null>(null);

  const fetchProductDetails = async () => {
    try {
      // Ensure that the authentication token is included in the request headers
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get<ProductProps>(`http://localhost:4000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setProductDetails(response.data);
      } else {
        console.error('Failed to fetch product details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const goBack = () => {
    navigate(-1); // Equivalent to history.goBack()
  };

  return (
    <Container className="mt-3">
      {productDetails ? (
        <>
          <Row>
            <Col md={6}>
              <Image src="https://via.placeholder.com/400" alt="Product" fluid />
            </Col>
            <Col md={6}>
              <h2>{productDetails.productName}</h2>
              <p>{productDetails.productDescription}</p>
              <p>Price: ${productDetails.price}</p>
              <Button variant="primary" className="mr-2">
                View Details
              </Button>
              <Button variant="success">
                Add to Cart
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className="mt-3">
        <Button variant="light" onClick={goBack}>
          <BsArrowLeft className="mr-2" />
          Go Back
        </Button>
      </div>
    </Container>
  );
};

export default Product;
