import { Review } from '../../types/review';
import { getStars } from '../../const/utils';
import { conversionDate } from '../../const/utils';

type ReviewProps = {
    reviews: Review[];
}

export default function Reviews({reviews}: ReviewProps): JSX.Element {

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map(({date, rating, id, user, comment}) => (
          <li className="reviews__item" key={id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={user.avatar} width="54" height="54" alt="Reviews avatar"/>
              </div>
              <span className="reviews__user-name">
                {user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: getStars(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {comment}
              </p>
              <time className="reviews__time" dateTime={date}>{conversionDate(date)}</time>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
