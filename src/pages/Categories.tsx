import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

interface Category {
  categoryId: number;
  categoryName: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userInfo = localStorage.getItem('userInfo');
        const authToken = userInfo ? JSON.parse(userInfo).token : null;
        const response = await axios.get<Category[]>('http://localhost:4000/products/categories', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <h2 className="mt-3">Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.categoryId}>{category.categoryName}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Categories;
