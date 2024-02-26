import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../services/categoryService';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo');
  const authToken = userInfo ? JSON.parse(userInfo).token : null;

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories(authToken);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesData();
  }, [authToken]);

  const handleCategoryClick = (category: string) => {
    navigate('/products');
  };

  return (
    <Container>
      <h2 className="mt-5 mb-4 text-center">Browse Categories</h2>
      <Row className="justify-content-center mt-5">
        {categories.map((category, index) => (
          <Col key={category} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
              className="shadow category-card"
              onClick={() => handleCategoryClick(category)}
            >
              <Card.Body>
                <Card.Title className="text-center">{category}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
