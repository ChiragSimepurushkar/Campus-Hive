import React, { useState, useRef, useEffect, useContext } from 'react';
// import OtpBox from '../../components/OtpBox';
import { useNavigate } from 'react-router-dom';
// keep as-is if your context is exported from App
import { postData } from '../utils/api';
import { MyContext } from '../App';

const OTPVerification = () => {
  const DIGITS = 6;

  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  // OTP as an array of single-character strings
  const [otp, setOtp] = useState(() => Array(DIGITS).fill(''));

  const history = useNavigate();
  const context = useContext(MyContext);

  // read email from localStorage (you show it in UI)
  const userEmail = localStorage.getItem('userEmail') || '';

  // Form submit (verify)
  const verifyOTP = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== DIGITS) {
      context.openAlertBox('error', `Please enter the ${DIGITS}-digit code.`);
      return;
    }

    setIsLoading(true);

    try {
      const actionType = localStorage.getItem('actionType');
      if (actionType !== 'forgot-password') {
        const res = await postData('/api/user/verifyEmail', {
          email: userEmail,
          otp: otpValue,
        });
        if (res?.success === true) {
          context.openAlertBox('success', res?.message);
          localStorage.removeItem('userEmail');
          history('/login');
        } else {
          context.openAlertBox('error', res?.message || 'Verification failed');
        }
      } else {
        const res = await postData('/api/user/verify-forgot-password-otp', {
          email: userEmail,
          otp: otpValue,
        });
        if (res?.success === true) {
          context.openAlertBox('success', res?.message);
          history('/forgot-password');
        } else {
          context.openAlertBox('error', res?.message || 'Verification failed');
        }
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      context.openAlertBox('error', 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // focus first input on mount
    if (inputRefs.current[0]) inputRefs.current[0].focus();

    // resend timer
    setCanResend(false);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    // only allow digits
    if (!/^\d*$/.test(value)) return;

    // create copy and set only last digit typed
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // keep last character
    setOtp(newOtp);

    // if a digit was entered, auto-focus next
    if (value && index < DIGITS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        // clear current
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // move to previous and clear it
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < DIGITS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = (e.clipboardData || window.clipboardData).getData('text').slice(0, DIGITS);
    if (!/^\d+$/.test(pastedData)) return;
    const newOtp = pastedData.split('').concat(Array(DIGITS).fill('')).slice(0, DIGITS);
    setOtp(newOtp);
    // focus the next empty or last filled index
    const nextIndex = Math.min(pastedData.length, DIGITS - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  // Resend handler (you can call your resend API here)
  const handleResend = async () => {
  if (!canResend) return;
  setCanResend(false);
  setResendTimer(60);

  try {
    const res = await postData('/api/user/resend-otp', { email: userEmail });
    if (res?.success) {
      context.openAlertBox('success', res.message || 'OTP resent');
    } else {
      context.openAlertBox('error', res?.message || 'Failed to resend OTP');
    }
  } catch (err) {
    console.error('Resend error', err);
    context.openAlertBox('error', 'Something went wrong while resending OTP');
  }

};


  const isComplete = otp.every((d) => d !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              {/* icon */}
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Campus Hive
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              {/* mail icon */}
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
            <p className="text-gray-600 mb-1">We've sent a 6-digit verification code to</p>
            <p className="font-semibold text-indigo-600">{localStorage.getItem("userEmail")}</p>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isLoading}
                  className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              ))}
            </div>
          </div>

          <form onSubmit={verifyOTP}>
            <button
              type="submit"
              disabled={!isComplete || isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] mb-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
            {canResend ? (
              <button onClick={handleResend} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Resend Code
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Resend available in <span className="font-semibold text-indigo-600">{resendTimer}s</span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Having trouble?{' '}
            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Contact Support
            </button>
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Your information is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
