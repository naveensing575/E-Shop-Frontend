import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const GoBackBtn = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='mb-4'>
      <Button variant="light" onClick={goBack}>
        <BsArrowLeft className="pr-2" />
        Go Back
      </Button>
    </div>
  );
};

export default GoBackBtn;
