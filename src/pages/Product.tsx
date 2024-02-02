import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoProductImage from '../assets/default.png';
import ratingStars from '../utils/ratingStars';
import Loader from '../components/Loader/Loader';
import CartButton from '../components/Cart/CartButton';
import GoBackBtn from '../components/Button/GoBackBtn';

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
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

    fetchProductDetails();
  }, [id]);

  const renderProductDetails = () => {
    if (!productDetails) {
      return <p>No product found</p>;
    }

    return (
        <Row>
          <GoBackBtn />
          <Col md={1} />
          <Col md={4} className='text-center'>
            <Image src={productDetails.image || NoProductImage} alt="Product" fluid className='align-items-center float-right mr-3' />
          </Col>
          <Col md={1} />
          <Col md={5}>
            <h2>{productDetails.productName}</h2>
            <p>{productDetails.productDetails}</p>
            <p>Price: ${productDetails.price}</p>
            <div className="mr-2">Rating: {productDetails.rating} {ratingStars(productDetails.rating)}</div>
            <p>Reviews:</p>
            <ul>
              {productDetails.reviews.map((review, index) => (
                <li key={index}>
                  <strong>{review.user}:</strong> {review.comment}
                </li>
              ))}
            </ul>
            <div className='w-25 mt-4'>
              <CartButton
                productId={productDetails.productId}
                initialQuantity={0}
              />
            </div>
          </Col>
          <Col md={1} />
        </Row>
    );
  };

  return (
    <Container className="mt-3">
      {loading ? <Loader /> : renderProductDetails()}
    </Container>
  );
};

export default Product;
