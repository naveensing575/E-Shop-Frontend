import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { MdAdd, MdDelete } from 'react-icons/md';

interface CartButtonProps {
  initialQuantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onDelete: () => void;
  isProductRoute?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ initialQuantity, onAdd, onRemove, onDelete, isProductRoute = false }) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    onAdd();
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onRemove();
    }
  };

  return (
    <ButtonGroup className={`d-flex align-items-center ${isProductRoute ? 'w-40' : 'w-100'}`}>
      {quantity === 0 ? (
        <Button variant="warning" onClick={handleAdd} className='align-items-center'>
          Add to Cart
        </Button>
      ) : (
        <>
          <Button variant="warning" onClick={handleRemove} className='align-items-center'>
            <MdDelete />
          </Button>
          <Button variant="warning" disabled className='align-items-center'>
            {quantity}
          </Button>
          <Button variant="warning" onClick={handleAdd} className='align-items-center'>
            <MdAdd />
          </Button>
        </>
      )}
    </ButtonGroup>
  );
};

export default CartButton;
