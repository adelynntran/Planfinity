function Header({title, description}) {

    //handle "login" button click:
    const handleLoginClick = () => {
        console.log("Login clicked");
    };

    return (
    <div style={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Left side - Title and Description */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937'
        }}>
          {title}
        </h1>
        <h2 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 'normal',
          color: '#6b7280'
        }}>
          {description}
        </h2>
      </div>

      {/* Right side - Login Button */}
      <button
        onClick={handleLoginClick}
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Header;