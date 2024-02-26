import React from 'react';
import { Toast } from 'react-bootstrap';

interface ToastComponentProps {
  show: boolean;
  onClose: () => void;
  delay?: number;
  header: string;
  body: string;
  bg: string;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ show, onClose, delay = 3000, header, body, bg }) => {
  return (
    <Toast
      show={show}
      onClose={onClose}
      delay={delay}
      autohide
      bg={bg}
      style={{
        position: 'fixed',
        top: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">{header}</strong>
        <h4 onClick={onClose} style={{ cursor: 'pointer', marginLeft: 'auto' }}>
          &times;
        </h4>
      </Toast.Header>
      <Toast.Body color='white'>{body}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
