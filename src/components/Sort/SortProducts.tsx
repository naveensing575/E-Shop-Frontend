import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface SortProductsProps {
  onChange: (value: string | null) => void;
}

const SortProducts: React.FC<SortProductsProps> = ({ onChange }) => {
  const handleSortChange = (eventKey: string | null) => {
    onChange(eventKey);
  };

  return (
    <Dropdown onSelect={handleSortChange}>
      <Dropdown.Toggle variant="warning" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="priceAsc">Price: Low to High</Dropdown.Item>
        <Dropdown.Item eventKey="priceDesc">Price: High to Low</Dropdown.Item>
        <Dropdown.Item eventKey="ratingDesc">Rating: High to Low</Dropdown.Item>
        <Dropdown.Item eventKey="ratingAsc">Rating: Low to High</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortProducts;
