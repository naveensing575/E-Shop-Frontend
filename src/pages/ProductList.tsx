import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Alert } from 'react-bootstrap';
import { BsCartPlus } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NoProductImage from '../assets/default.png';
import Loader from '../components/Loader/Loader';
import SortProducts from '../components/Sort/SortProducts';

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  image: string;
  rating: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortCriteria, setSortCriteria] = useState<string>('priceAsc');

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') ?? '';

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
    const filterAndSortProducts = () => {
      let filteredProducts = [...products];

      // Filter products based on search query
      if (searchQuery) {
        filteredProducts = filteredProducts.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort filtered products based on sort criteria
      switch (sortCriteria) {
        case 'priceAsc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'ratingDesc':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'ratingAsc':
          filteredProducts.sort((a, b) => a.rating - b.rating);
          break;
        default:
          break;
      }

      setFilteredProducts(filteredProducts);
    };

    filterAndSortProducts();
  }, [products, searchQuery, sortCriteria]);

  const handleAddToCart = (productId: number) => {
    console.log('Add to cart clicked for product:', productId);
  };

  const handleProductDetails = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleSortChange = (value: string | null) => {
    if (value !== null) {
      setSortCriteria(value);
    }
  };

  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col xs={12} md={6}>
          <h2 className="mt-3 font">Today's Deals</h2>
        </Col>
        <Col xs={12} md={6} className="text-md-right mt-3 mt-md-0">
          <SortProducts onChange={handleSortChange} />
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : filteredProducts.length === 0 ? (
        <Alert variant="info">No products found for "{searchQuery}"</Alert>
      ) : (
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
                      variant="primary"
                      className=" d-flex align-items-center"
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
