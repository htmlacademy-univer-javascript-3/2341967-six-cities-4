import Review from '../review/review';
import { ReviewType } from '../../types/review';

type ReviewListProps = {
    reviews: ReviewType[];
}

export default function ReviewsList({ reviews }: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review}/>
      ))}
    </ul>
  );
}
