import React from "react";
import { Link } from "react-router-dom";

const OnboardingSuccess: React.FC = () => {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
          <svg
            className="h-6 w-6 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Onboarding Submitted Successfully!
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Thank you for completing your onboarding request.
        </p>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
