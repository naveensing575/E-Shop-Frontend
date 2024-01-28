import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Alert } from 'react-bootstrap';
import { BsCartPlus, BsLightning } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NoProductImage from '../assets/default.png';
import Loader from '../components/Loader/Loader';

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userInfo = localStorage.getItem('userInfo');
        const authToken = userInfo ? JSON.parse(userInfo).token : null;
        const response = await axios.get(`http://localhost:4000/products`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error('Failed to fetch products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    };

    filterProducts();
  }, [searchQuery, products]);

  const handleBuyNow = (productId: number) => {
    console.log('Buy now clicked for product:', productId);
  };

  const handleAddToCart = (productId: number) => {
    console.log('Add to cart clicked for product:', productId);
  };

  const handleProductDetails = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Container>
      <h2 className="mt-3 font">Today's Deals</h2>
      {loading && <Loader />}
      {!loading && filteredProducts.length === 0 && searchQuery && (
        <Alert variant="info">No products found for "{searchQuery}"</Alert>
      )}
      {!loading && filteredProducts.length > 0 && (
        <Row xs={1} md={2} lg={3} xl={4}>
          {filteredProducts.map((product) => (
            <Col key={product.productId} className="mb-4">
              <Card className="product-card">
                <Image
                  src={product?.image || NoProductImage}
                  alt="Product"
                  className="card-image"
                  onClick={() => handleProductDetails(product.productId)}
                />
                <Card.Body className="card-body" onClick={() => handleProductDetails(product.productId)}>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text className="mb-3">{product.productDescription}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between text-center">
                  <Button
                    variant="warning"
                    className="w-0 p-2 d-flex align-items-center"
                    onClick={() => handleBuyNow(product.productId)}
                  >
                    <BsLightning className="mr-1" />
                    Buy Now
                  </Button>
                  <Button
                    variant="primary"
                    className="w-0 p-2 d-flex align-items-center"
                    onClick={() => handleAddToCart(product.productId)}
                  >
                    <BsCartPlus className="mr-1" />
                    Add to Cart
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
