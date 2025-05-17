import React, { useState } from 'react';
import { useFormik } from 'formik';
import { registerSchema } from '../../utils/validation';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const SignUpForm = ({ onSuccess, switchMode }) => {
  const { register } = useAuth();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: registerSchema.omit(['user_type']),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        const result = await register({
          email: values.email,
          password: values.password,
        });
        
        if (result.success) {
          onSuccess();
        } else {
          setError(result.error || 'Failed to create account');
        }
      } catch (err) {
        setError(err.message || 'An error occurred during registration');
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-md text-sm text-danger">
          {error}
        </div>
      )}
      
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
      
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            className="text-secondary hover:underline"
            onClick={switchMode}
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
