import { FaStar } from 'react-icons/fa';

const ratingStars = (rating: number) => {
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    size={20}
                    color={index < Math.floor(rating) ? '#FFD700' : '#C0C0C0'}
                  />
                ))}
    </div>
  )
}

export default ratingStars
