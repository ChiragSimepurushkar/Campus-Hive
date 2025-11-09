import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../App';
import { postData } from '../utils/api';

const SignUp = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    college: "",
    branch: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const branches = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "IT",
    "Other",
  ];
  const years = [
    { label: '1st Year', value: 1 },
    { label: '2nd Year', value: 2 },
    { label: '3rd Year', value: 3 },
    { label: '4th Year', value: 4 },
    { label: 'Postgraduate', value: 5 },
  ];



  const onChangeInput = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setTermsAccepted(checked);
      return;
    }
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Helper for quick validation
    const validateField = (field, message) => {
      if (!formFields[field] || formFields[field].trim() === "") {
        context.openAlertBox("error", message);
        setIsLoading(false);
        return false;
      }
      return true;
    };

    // Step 1: Validate required fields
    if (!validateField("name", "Please enter your full name.")) return;
    if (!validateField("email", "Please enter your email.")) return;
    if (!validateField("college", "Please enter your college or university name.")) return;
    if (!validateField("branch", "Please select your branch or department.")) return;
    if (!validateField("year", "Please select your current year of study.")) return;
    if (!validateField("password", "Please enter your password.")) return;
    if (!validateField("confirmPassword", "Please confirm your password.")) return;

    // Step 2: Password checks
    if (formFields.password.length < 8) {
      context.openAlertBox("error", "Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (formFields.password !== formFields.confirmPassword) {
      context.openAlertBox("error", "Passwords do not match. Please re-enter.");
      setIsLoading(false);
      return;
    }

    // Step 3: Terms and conditions
    if (!termsAccepted) {
      context.openAlertBox("error", "You must accept the Terms and Conditions to continue.");
      setIsLoading(false);
      return;
    }

    // Step 4: Prepare backend payload
    const payload = {
      name: formFields.name.trim(),
      email: formFields.email.trim(),
      password: formFields.password,
      college: formFields.college.trim(),
      college_branch: formFields.branch,
      graduation_year: Number(formFields.year),
    };

    try {
      const res = await postData("/api/user/register", payload);
      console.log(res);

      if (res?.success === true) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message || "Registration successful!");
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          name: "",
          email: "",
          college: "",
          branch: "",
          year: "",
          password: "",
          confirmPassword: "",
        });
        setTermsAccepted(false);
        history("/verify-otp");
      } else {
        context.openAlertBox("error", res?.message || "Registration failed.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Signup error:", err);
      context.openAlertBox("error", "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const isFormValid =
    formFields.name &&
    formFields.email &&
    formFields.college &&
    formFields.branch &&
    formFields.year &&
    formFields.password &&
    formFields.confirmPassword &&
    termsAccepted;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Campus Hive
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Campus Hive</h2>
          <p className="text-gray-600">Start your collaboration journey today</p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
          <div className="space-y-6">
            {/* Social Sign Up */}
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">GitHub</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formFields.name}
                      onChange={onChangeInput}
                      disabled={isLoading}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none disabled:bg-gray-50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formFields.email}
                      onChange={onChangeInput}
                      disabled={isLoading}
                      placeholder="john@college.edu"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none disabled:bg-gray-50"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Academic Details</h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="college" className="block text-sm font-semibold text-gray-700 mb-2">
                    College/University *
                  </label>
                  <input
                    id="college"
                    name="college"
                    type="text"
                    value={formFields.college}
                    onChange={onChangeInput}
                    disabled={isLoading}
                    placeholder="MIT"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none disabled:bg-gray-50"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="branch" className="block text-sm font-semibold text-gray-700 mb-2">
                    Branch/Department *
                  </label>
                  <div className="relative">
                    <select
                      id="branch"
                      name="branch"
                      value={formFields.branch}
                      onChange={onChangeInput}
                      className="form-control w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none disabled:bg-gray-50"
                    >
                      <option value="">Select Branch</option>
                      {branches.map((b, index) => (
                        <option key={index} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>


                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
                    Year *
                  </label>
                  <div className="relative">
                    <select
                      id="year"
                      name="year"
                      value={formFields.year}
                      onChange={onChangeInput}
                      className="form-control w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none disabled:bg-gray-50"
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y.value.toString()} value={y.value}>
                          {y.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={isPasswordShow ? "text" : "password"}
                      value={formFields.password}
                      onChange={onChangeInput}
                      disabled={isLoading}
                      placeholder="Create strong password"
                      className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none disabled:bg-gray-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordShow(!isPasswordShow)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {isPasswordShow ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={isConfirmPasswordShow ? "text" : "password"}
                      value={formFields.confirmPassword}
                      onChange={onChangeInput}
                      disabled={isLoading}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none disabled:bg-gray-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setIsConfirmPasswordShow(!isConfirmPasswordShow)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {isConfirmPasswordShow ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <button type="button" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button type="button" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;