import React, { useState } from 'react';

const Payment: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Payment & Billing</h1>
          <p className="text-gray-300 mt-2">Manage your subscription and payment methods</p>
        </div>
        
        {/* Subscription Plans */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Subscription Plans</h2>
          
          {/* Plan Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-lg p-1 rounded-lg border border-white/20">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPlan === 'monthly'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPlan === 'yearly'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border-2 border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$0</span>
                <span className="text-gray-300 ml-2">/ month</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  5 credits per month
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  720p video quality
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Basic templates
                </li>
              </ul>
              <button className="w-full bg-white/10 text-gray-300 py-2 px-4 rounded cursor-not-allowed">
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Recommended</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">
                  ${selectedPlan === 'monthly' ? '29' : '24'}
                </span>
                <span className="text-gray-300 ml-2">/ month</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  100 credits per month
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  1080p video quality
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Premium templates
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border-2 border-white/20">
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">
                  ${selectedPlan === 'monthly' ? '99' : '79'}
                </span>
                <span className="text-gray-300 ml-2">/ month</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Unlimited credits
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  4K video quality
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Custom templates
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  24/7 support
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  Team collaboration
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Payment Methods</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
            <p className="text-gray-300 text-center">No payment methods added yet.</p>
            <div className="mt-4 text-center">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Add Payment Method
              </button>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Billing History</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
            <div className="p-6">
              <p className="text-gray-300 text-center">No billing history yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
