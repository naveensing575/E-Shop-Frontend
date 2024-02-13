import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fetchCategories } from '../services/categoryService';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
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

  return (
    <Container>
      <h2 className="mt-3">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Categories;
