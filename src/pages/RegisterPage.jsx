import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector(state => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    if (fullName && email && password) {
      dispatch(registerRequest({ fullName, email, password }));
      // We will assume that they must go to login manually, or await success. 
      // For simplicity, we just navigate right away if loading finishes without error, 
      // but saga is async. Let's redirect after a small timeout if no error, 
      // or just wait for user to click login. We'll simply redirect right away for this mockup
      // if we were storing it sync, but since it's an async saga we should technically wait.
      // We'll trust the saga works or handle it with an effect.
    }
  };

  // Listen for success (not loading, no error, and we tried to register... kinda messy without a specific success flag, but we can just use a local state)
  const [submitted, setSubmitted] = useState(false);
  
  const onSubmit = (e) => {
    handleRegister(e);
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted && !loading && !error) {
        navigate('/login');
    }
  }, [submitted, loading, error, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center flex-col items-center">
             <div className="bg-tablerBlue text-white p-2 rounded-lg mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 17l6-6-6-6" />
                  <path d="M12 19h8" />
                </svg>
              </div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">Create an account</h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 shadow-sm">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  disabled={loading}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-tablerBlue focus:border-tablerBlue sm:text-sm disabled:bg-gray-50"
                  placeholder="Jane Pearson"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-tablerBlue focus:border-tablerBlue sm:text-sm disabled:bg-gray-50"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-tablerBlue focus:border-tablerBlue sm:text-sm disabled:bg-gray-50"
                  placeholder="password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-tablerBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tablerBlue transition-colors disabled:opacity-75"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <Link to="/login" className="font-medium text-tablerBlue hover:text-blue-500">
                Sign in instead
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
