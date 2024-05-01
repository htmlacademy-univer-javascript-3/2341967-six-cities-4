import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to main screen</Link>
    </div>
  );
}

export default NotFoundPage;
