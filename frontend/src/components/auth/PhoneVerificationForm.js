import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const PhoneVerificationForm = ({ phoneNumber, onSuccess, onBack }) => {
  const { verifyPhone, sendVerificationCode } = useAuth();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(phoneNumber ? 'verify' : 'phone');
  
  // Phone number validation schema
  const phoneSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be valid')
      .required('Phone number is required'),
  });
  
  // Verification code validation schema
  const verificationSchema = Yup.object({
    code: Yup.string()
      .matches(/^\d{6}$/, 'Verification code must be 6 digits')
      .required('Verification code is required'),
  });
  
  // Start countdown after sending verification code
  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    
    return () => clearTimeout(timer);
  }, [countdown, canResend]);
  
  // Handle phone number submission
  const phoneFormik = useFormik({
    initialValues: {
      phoneNumber: phoneNumber || '',
    },
    validationSchema: phoneSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        // Send verification code to the phone number
        const result = await sendVerificationCode(values.phoneNumber);
        
        if (result.success) {
          setStep('verify');
          setCountdown(60);
          setCanResend(false);
        } else {
          setError(result.error || 'Failed to send verification code');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while sending verification code');
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  
  // Handle verification code submission
  const verificationFormik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: verificationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      
      try {
        // Verify the code
        const result = await verifyPhone(phoneFormik.values.phoneNumber, values.code);
        
        if (result.success) {
          onSuccess();
        } else {
          setError(result.error || 'Invalid verification code');
        }
      } catch (err) {
        setError(err.message || 'An error occurred during verification');
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  
  // Handle resend verification code
  const handleResendCode = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await sendVerificationCode(phoneFormik.values.phoneNumber);
      
      if (result.success) {
        setCountdown(60);
        setCanResend(false);
      } else {
        setError(result.error || 'Failed to resend verification code');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while resending verification code');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Phone number input screen
  if (step === 'phone') {
    return (
      <form onSubmit={phoneFormik.handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-md text-sm text-danger">
            {error}
          </div>
        )}
        
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-sm text-secondary flex items-center"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to sign up options
        </button>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Verify your phone number</h3>
          <p className="text-gray-400 text-sm">
            We'll send you a one-time verification code to confirm your phone number.
          </p>
        </div>
        
        <Input
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          value={phoneFormik.values.phoneNumber}
          onChange={phoneFormik.handleChange}
          onBlur={phoneFormik.handleBlur}
          error={phoneFormik.touched.phoneNumber && phoneFormik.errors.phoneNumber}
          placeholder="+1 555 123 4567"
          required
          autoComplete="tel"
        />
        
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending code...' : 'Send Verification Code'}
        </Button>
      </form>
    );
  }
  
  // Verification code input screen
  return (
    <form onSubmit={verificationFormik.handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-md text-sm text-danger">
          {error}
        </div>
      )}
      
      <button
        type="button"
        onClick={() => setStep('phone')}
        className="mb-4 text-sm text-secondary flex items-center"
      >
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Change phone number
      </button>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Enter verification code</h3>
        <p className="text-gray-400 text-sm">
          We've sent a 6-digit code to {phoneFormik.values.phoneNumber}
        </p>
      </div>
      
      <Input
        label="Verification Code"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        name="code"
        value={verificationFormik.values.code}
        onChange={verificationFormik.handleChange}
        onBlur={verificationFormik.handleBlur}
        error={verificationFormik.touched.code && verificationFormik.errors.code}
        placeholder="123456"
        maxLength={6}
        required
        autoComplete="one-time-code"
      />
      
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Verifying...' : 'Verify Code'}
      </Button>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          {canResend ? (
            <button
              type="button"
              className="text-secondary hover:underline"
              onClick={handleResendCode}
              disabled={isSubmitting}
            >
              Resend code
            </button>
          ) : (
            `Resend code in ${countdown}s`
          )}
        </p>
      </div>
    </form>
  );
};
