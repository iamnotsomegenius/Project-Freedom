import React, { useState } from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../../utils/validation';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

// Social Login Icons (same as in SignUpForm)
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </svg>
);

const SignInForm = ({ onSuccess, switchMode }) => {
  const { login, socialLogin } = useAuth();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInMethod, setSignInMethod] = useState(null); // null, 'email', 'google', 'linkedin'
  
  const handleSocialSignIn = async (provider) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const result = await socialLogin(provider);
      
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || `Failed to sign in with ${provider}`);
      }
    } catch (err) {
      setError(err.message || `An error occurred during ${provider} sign in`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        const result = await login(values.email, values.password);
        
        if (result.success) {
          onSuccess();
        } else {
          setError(result.error || 'Failed to sign in');
        }
      } catch (err) {
        setError(err.message || 'An error occurred during sign in');
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  
  // Show Email Sign In Form if user selected email sign in method
  if (signInMethod === 'email') {
    return (
      <form onSubmit={formik.handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-md text-sm text-danger">
            {error}
          </div>
        )}
        
        <button
          type="button"
          onClick={() => setSignInMethod(null)}
          className="mb-4 text-sm text-secondary flex items-center"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to sign in options
        </button>
        
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          placeholder="name@example.com"
          required
        />
        
        <Input
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          placeholder="••••••••"
          required
        />
        
        <div className="flex justify-between items-center mt-2 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="h-4 w-4 rounded border-gray-700 text-secondary focus:ring-secondary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-secondary hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
        
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-secondary hover:underline"
              onClick={switchMode}
            >
              Create an account
            </button>
          </p>
        </div>
      </form>
    );
  }
  
  // Show sign in method selection (default view)
  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-md text-sm text-danger">
          {error}
        </div>
      )}
      
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => handleSocialSignIn('google')}
          disabled={isSubmitting}
        >
          <GoogleIcon />
          Continue with Google
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => handleSocialSignIn('linkedin')}
          disabled={isSubmitting}
        >
          <LinkedInIcon />
          Continue with LinkedIn
        </Button>
        
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => setSignInMethod('email')}
          disabled={isSubmitting}
        >
          <EmailIcon />
          Continue with Email
        </Button>
      </div>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-secondary hover:underline"
            onClick={switchMode}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;