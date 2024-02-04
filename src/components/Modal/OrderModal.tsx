import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import './modal.css';
import { useNavigate } from 'react-router-dom';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const redirectTimer = setTimeout(() => {
        onClose();
        // Navigate to cart page
        navigate('/cart');
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isSuccess, onClose, navigate]);

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Body className="modal-body">
        {isLoading ? (
          <Spinner animation="border" role="output" variant='primary'>
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          isSuccess && (
            <div className="success-animation">
              <span className="thumbs-up" role="img" aria-label="thumbs-up">
                👍
              </span>
              <div className="success-message">Order Successful!</div>
            </div>
          )
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
