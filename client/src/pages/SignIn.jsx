import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';

//import styling:
import '../styles/Auth.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already signed in when component loads
  useEffect(() => {
    const checkUser = async () => {
      console.log('🔍 Checking if user is signed in...');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('🔍 User data:', user);
      if (user) {
        console.log('✅ User is signed in, redirecting to homepage...');
        navigate('/');
      } else {
        console.log('❌ No user found, staying on signin page');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      console.log('🚀 Attempting sign in...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('✅ Sign in successful!', data);
      console.log('🏠 Navigating to homepage...');
      // Navigate to homepage on successful sign in
      navigate('/home');
    } catch (error) {
      console.error('❌ Sign in failed:', error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back Chef 🫡</h2>
        <p className="auth-subtitle">Sign in to keep cooking</p>
        
        <form onSubmit={handleSignIn} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {errorMsg && <div className="error-message">{errorMsg}</div>}

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;