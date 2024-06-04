import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 Not Found</h1>
      <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go to main screen</Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    height: '100vh',
    textAlign: 'center' as 'center',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
  },
  title: {
    fontSize: '3em',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.5em',
    marginBottom: '20px',
  },
  link: {
    fontSize: '1.2em',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NotFoundPage;

