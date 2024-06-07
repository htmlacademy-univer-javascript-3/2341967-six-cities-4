import { useAppSelector } from '../hooks';
import { getComments } from '../../store/current-offer-data/selectors';
import Review from '../review/review';

export default function ReviewsList(): JSX.Element {
  const reviews = useAppSelector(getComments);
  return (
    <ul className="reviews__list">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {reviews
        .slice()
        .sort((reviewA, reviewB) => {
          const dateA = new Date(reviewA.date).getTime();
          const dateB = new Date(reviewB.date).getTime();

          return dateB - dateA;
        })
        .slice(0, 10)
        .map((review) => (
          <Review key={review.id} review={review} />
        ))}
    </ul>
  );
}
