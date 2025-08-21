import React from "react";

interface NotesStepProps {
  data: string;
  onChange: (data: string) => void;
}

const NotesStep: React.FC<NotesStepProps> = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Step 5: Additional Notes (Optional)
      </h2>

      <div className="space-y-4">
        {/* Notes Input */}
        <div>
          <label
            htmlFor="notes"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Additional Notes or Requirements
          </label>
          <textarea
            id="notes"
            value={data}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Please provide any additional information, special requirements, or notes that would help us better understand your needs..."
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              Optional field - you can leave this blank if you have no
              additional notes
            </span>
            <span>{data.length}/1000</span>
          </div>
        </div>

        {/* Helpful Prompts */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            What can you include here?
          </h4>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <div className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Special Requirements:</strong> Any unique business
                processes or compliance needs
              </span>
            </div>
            <div className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Timeline Preferences:</strong> When you'd like to start
                or any important deadlines
              </span>
            </div>
            <div className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Integration Needs:</strong> Existing systems you need to
                connect with
              </span>
            </div>
            <div className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Training Requirements:</strong> Team training needs or
                support preferences
              </span>
            </div>
            <div className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Budget Constraints:</strong> Any budget considerations
                or payment preferences
              </span>
            </div>
            <div className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                <strong>Questions or Concerns:</strong> Anything you'd like to
                discuss or clarify
              </span>
            </div>
          </div>
        </div>

        {/* Example Notes */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Example Notes
          </h4>
          <div className="text-xs text-gray-600 dark:text-gray-400 italic">
            <p className="mb-2">
              "We need integration with our existing Tally system for seamless
              data migration. Our team would require comprehensive training as
              most staff are not tech-savvy. We prefer to go live by the end of
              next quarter to align with our financial year."
            </p>
            <p>
              "We have specific compliance requirements for data security as we
              handle sensitive customer information. Would like to discuss
              backup and disaster recovery options. Also interested in mobile
              app access for field staff."
            </p>
          </div>
        </div>

        {/* Final Review Reminder */}
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h4 className="text-xs font-medium text-green-800 dark:text-green-200 mb-1">
            Ready to Submit?
          </h4>
          <p className="text-xs text-green-700 dark:text-green-300">
            Once you submit your onboarding request, our team will review all
            the information and get back to you within 2-3 business days.
          </p>
        </div>

        {/* Character Count Warning */}
        {data.length > 800 && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  You're approaching the character limit. Consider keeping your
                  notes concise while including all important information.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesStep;
