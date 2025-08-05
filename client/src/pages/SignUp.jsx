import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { createUserProfile } from '../api/profiles';
//import styling:
import '../styles/Auth.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Test Supabase connection first
    console.log('🔍 Environment variables:');
    console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    console.log('Key length:', import.meta.env.VITE_SUPABASE_ANON_KEY?.length);
    
    
    // Debug check
    console.log('Environment check:', {
      url: import.meta.env.VITE_SUPABASE_URL,
      hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
    });
    
    setLoading(true);
    setErrorMsg('');

    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const userId = data?.user?.id;

      if (!userId) {
        throw new Error("Failed to create user account");
      }

      // Debug: Log the userId we got
      console.log('🔍 About to create profile for userId:', userId);
      console.log('🔍 Username:', username);

      // Create user profile with the correct format
      const profileData = {
        id: userId,
        username: username,
        display_name: username,
        bio: null,
        avatar_url: null,
        dark_mode: false,
        is_verified: false
      };

      console.log('🔍 Profile data to insert:', profileData);

      try {
        await createUserProfile(profileData);
        console.log('✅ Profile creation completed successfully!');
      } catch (profileError) {
        console.error('❌ Detailed profile error:', profileError);
        console.error('❌ Error message:', profileError.message);
        console.error('❌ Error details:', profileError.details);
        throw profileError; // Re-throw so your existing error handling works
      }

      // Show success message and redirect to sign in
      alert('Account created successfully! Please check your email for verification.');
      navigate('/signin');
      
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us today</p>
        
        <form onSubmit={handleSignUp} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
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
              placeholder="Password (minimum 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          {errorMsg && <div className="error-message">{errorMsg}</div>}

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;