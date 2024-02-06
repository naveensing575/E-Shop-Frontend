import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Alert, Pagination } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NoProductImage from '../assets/default.png';
import Loader from '../components/Loader/Loader';
import SortProducts from '../components/SortProducts/SortProducts';
import CartButton from '../components/Cart/CartButton';

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
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') ?? '';

  const fetchProducts = async () => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      const authToken = userInfo ? JSON.parse(userInfo).token : null;
      const response = await axios.get(`http://localhost:4000/products`, {
        params: {
          page: currentPage, 
          limit: productsPerPage,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error('Failed to fetch products:', response.statusText);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        handleForbiddenError(error);
      } else {
        console.error('Error fetching products:', error.response?.data?.error || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForbiddenError = (error: any) => {
    const errorMessage = error.response.data?.error;
    if (errorMessage === 'Forbidden - Invalid Token') {
      // Show alert and redirect to login page
      setError('You are not authorized. Please login again.');
      navigate('/login');
    } else {
      console.error('Error fetching products:', errorMessage);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]); // Fetch products when the current page changes

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

  const handleProductDetails = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleSortChange = (value: string | null) => {
    if (value !== null) {
      setSortCriteria(value);
    }
  };

  const truncateDescription = (description: string, maxLength: number = 25) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Reset current page to 1 when a search query is entered
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const renderPagination = () => {
    return (
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
    if (currentProducts.length === 0) {
      return <Alert variant="info">No products found for "{searchQuery}"</Alert>;
    }
    return (
      <Row xs={1} md={2} lg={3} xl={4}>
        {currentProducts.map((product) => (
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
                <Card.Text className="mb-3">{truncateDescription(product.productDescription)}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-center">
                <CartButton productId={product.productId} initialQuantity={0} />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
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
      {renderContent()}
      {renderPagination()}
    </Container>
  );
};

export default ProductList;
