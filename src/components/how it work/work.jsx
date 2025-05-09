import { useState } from 'react';
import {
  FaUserCheck,
  FaSearch,
  FaBriefcase,
  FaRocket,
  FaShieldAlt,
  FaThumbsUp,
  FaQuestionCircle,
} from 'react-icons/fa';

const steps = [
  {
    title: '1. Create an Account',
    icon: <FaUserCheck className="text-indigo-600 text-3xl" />,
    description: 'Sign up quickly with your email or social account to begin.',
  },
  {
    title: '2. Browse Jobs or Services',
    icon: <FaSearch className="text-indigo-600 text-3xl" />,
    description: 'Explore job listings or post your own to connect with others.',
  },
  {
    title: '3. Apply or Post',
    icon: <FaBriefcase className="text-indigo-600 text-3xl" />,
    description: 'Apply to jobs or receive applications seamlessly through your dashboard.',
  },
  {
    title: '4. Get Hired or Hire',
    icon: <FaRocket className="text-indigo-600 text-3xl" />,
    description: 'Finalize your connection and move ahead confidently.',
  },
];

const features = [
  {
    icon: <FaShieldAlt className="text-green-600 text-3xl" />,
    title: 'Secure & Reliable',
    text: 'All your data and transactions are protected with top-tier security.',
  },
  {
    icon: <FaThumbsUp className="text-blue-600 text-3xl" />,
    title: 'Trusted by Thousands',
    text: 'Our community is growing with happy users every day.',
  },
];

const faqs = [
  {
    question: 'Is this platform free to use?',
    answer: 'Yes! Basic usage is completely free. Premium features may require a subscription.',
  },
  {
    question: 'Can I hire freelancers directly?',
    answer: 'Absolutely. You can view profiles, send messages, and hire directly through the platform.',
  },
];

export default function HowItWorks() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="bg-gray-50 text-gray-800 px-6 py-16 space-y-24">
      {/* Section 1: How It Works */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-4">How It Works</h2>
        <p className="text-gray-600 mb-12 text-lg">Follow these simple steps to get started:</p>

        <div className="grid md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl shadow hover:shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">{step.icon}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Why Choose Us */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Why Choose Us</h2>
        <p className="text-gray-600 mb-10 text-lg">We provide value beyond the basics.</p>

        <div className="grid sm:grid-cols-2 gap-10">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-lg">
              <div className="mb-4">{f.icon}</div>
              <h4 className="text-xl font-bold mb-2">{f.title}</h4>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: FAQs */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Frequently Asked Questions</h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border rounded-lg bg-white shadow-sm transition-all"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left text-lg font-medium hover:bg-blue-50"
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex items-center gap-2">
                <FaQuestionCircle className="text-blue-600" />
                {faq.question}
              </span>
              <span className="text-xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
