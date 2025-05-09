import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    // Add your password reset logic here (e.g., Firebase, API)
    setMessage(`If ${email} is registered, a reset link has been sent.`);
    setEmail('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-200 to-indigo-300">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700">Reset Password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleReset} className="mt-6 space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-green-600 text-center">{message}</p>}
      </div>
    </div>
  );
}
