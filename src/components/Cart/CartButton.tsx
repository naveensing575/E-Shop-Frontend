import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { MdAdd, MdDelete } from 'react-icons/md';
import axios from 'axios';

interface CartButtonProps {
  productId: number;
  initialQuantity: number;
}

const CartButton: React.FC<CartButtonProps> = ({ productId, initialQuantity }) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const userInfo = localStorage.getItem('userInfo');
  const authToken = userInfo ? JSON.parse(userInfo).token : null;

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/cart/add`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setQuantity((prevQuantity) => prevQuantity + 1);
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleRemove = async () => {
    try {
      if (quantity > 0) {
        const response = await axios.post(
          `http://localhost:4000/cart/remove`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        } else {
          console.error('Failed to remove item from cart');
        }
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <ButtonGroup className="d-flex align-items-center w-100">
      {quantity === 0 ? (
        <Button variant="warning" onClick={handleAdd} className="align-items-center">
          Add to Cart
        </Button>
      ) : (
        <>
          <Button variant="warning" onClick={handleRemove} className="align-items-center">
            <MdDelete />
          </Button>
          <Button variant="warning" disabled className="align-items-center">
            {quantity}
          </Button>
          <Button variant="warning" onClick={handleAdd} className="align-items-center">
            <MdAdd /> Add More
          </Button>
        </>
      )}
    </ButtonGroup>
  );
};

export default CartButton;
