import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsArrowLeft } from 'react-icons/bs';
import NoProductImage from '../assets/default.png';
import ratingStars from '../utils/ratingStars';
import Loader from '../components/Loader/Loader';
import CartButton from '../components/Cart/CartButton';

interface Review {
  user: string;
  comment: string;
}

interface ProductProps {
  productId: number;
  productName: string;
  productDetails: string;
  image: string;
  price: number;
  rating: number;
  reviews: Review[];
}

const Product: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  const fetchProductDetails = async () => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      const authToken = userInfo ? JSON.parse(userInfo).token : null;
      const response = await axios.get<ProductProps>(`http://localhost:4000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setProductDetails(response.data);
      } else {
        console.error('Failed to fetch product details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const goBack = () => {
    navigate('/products');
  };

  const onAdd = () => {
    setCartQuantity(cartQuantity + 1);
  };

  const onRemove = () => {
    if (cartQuantity > 0) {
      setCartQuantity(cartQuantity - 1);
    }
  };

  const onDelete = () => {
    setCartQuantity(0);
  };

  return (
    <Container className="mt-3">
      {loading ? (
        <Loader />
      ) : productDetails ? (
        <>
          <Row>
            <div className='mb-4'>
                <Button variant="light" onClick={goBack}>
                <BsArrowLeft className="pr-2" />
                Go Back
              </Button>
            </div>
            <Col md={1}/>
            <Col md={4} className='text-center'>
              <Image src={productDetails?.image || NoProductImage} alt="Product" fluid className='align-items-center float-right mr-3'/>
            </Col>
             <Col md={1}/>
            <Col md={5}>
              <h2>{productDetails.productName}</h2>
              <p>{productDetails.productDetails}</p>
              <p>Price: ${productDetails.price}</p>
              <p className="mr-2">Rating: {productDetails.rating}  {ratingStars(productDetails.rating)}</p>
              <p>Reviews:</p>
              <ul>
                {productDetails.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.user}:</strong> {review.comment}
                  </li>
                ))}
              </ul>
              <CartButton
                initialQuantity={cartQuantity}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                isProductRoute={true}
              />
            </Col>
            <Col md={1}/>
          </Row>
        </>
      ) : (
        <p>No product found</p>
      )}
    </Container>
  );
};

export default Product;
