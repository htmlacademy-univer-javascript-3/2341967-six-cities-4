function LoadingScreen(): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
    >
      <div style={{
        backgroundColor: 'lightblue',
        borderRadius: '50%',
        width: '200px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <p>Loading ...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;

