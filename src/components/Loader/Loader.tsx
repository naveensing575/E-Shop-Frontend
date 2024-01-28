import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader: React.FC = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center mt-100">
      <Spinner animation="border" variant="primary" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
