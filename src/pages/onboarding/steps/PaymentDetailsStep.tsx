import React from "react";
import { PaymentDetails, PlanDetails } from "../../../types";

interface PaymentDetailsStepProps {
  data: PaymentDetails;
  onChange: (data: PaymentDetails) => void;
  planDetails: PlanDetails;
}

const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({
  data,
  onChange,
  planDetails,
}) => {
  const handleChange = (field: keyof PaymentDetails, value: number) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleAdditionalCostChange = (
    field: keyof PaymentDetails["additionalCosts"],
    value: number
  ) => {
    onChange({
      ...data,
      additionalCosts: {
        ...data.additionalCosts,
        [field]: value,
      },
    });
  };

  const calculateTotal = () => {
    const { planPrice, projectPrice, hostingYearlyPrice, additionalCosts } =
      data;
    const additionalTotal = Object.values(additionalCosts).reduce(
      (sum, cost) => sum + (cost || 0),
      0
    );
    return planPrice + projectPrice + hostingYearlyPrice + additionalTotal;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Step 4: Payment Details
      </h2>

      <div className="space-y-4">
        {/* Plan Information */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
            Selected Plan
          </h4>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p>
              <strong>Access Type:</strong> {planDetails.accessType}
            </p>
            <p>
              <strong>Maintenance:</strong> {planDetails.maintenanceFrequency}
            </p>
            {planDetails.customPricing && (
              <p>
                <strong>Custom Pricing:</strong> Enabled
              </p>
            )}
          </div>
        </div>

        {/* Core Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan Price */}
          <div>
            <label
              htmlFor="planPrice"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Plan Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                ₹
              </span>
              <input
                type="number"
                id="planPrice"
                value={data.planPrice || ""}
                onChange={(e) =>
                  handleChange("planPrice", parseFloat(e.target.value) || 0)
                }
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Base plan price from plan details
            </p>
          </div>

          {/* Project Price */}
          <div>
            <label
              htmlFor="projectPrice"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Project Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                ₹
              </span>
              <input
                type="number"
                id="projectPrice"
                value={data.projectPrice || ""}
                onChange={(e) =>
                  handleChange("projectPrice", parseFloat(e.target.value) || 0)
                }
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              One-time project setup cost
            </p>
          </div>

          {/* Hosting Yearly Price */}
          <div>
            <label
              htmlFor="hostingYearlyPrice"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Hosting (Yearly)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                ₹
              </span>
              <input
                type="number"
                id="hostingYearlyPrice"
                value={data.hostingYearlyPrice || ""}
                onChange={(e) =>
                  handleChange(
                    "hostingYearlyPrice",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Annual hosting charges
            </p>
          </div>
        </div>

        {/* Additional Costs */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Additional Costs (Optional)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Constant */}
            <div>
              <label
                htmlFor="constant"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Constant
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="constant"
                  value={data.additionalCosts.constant || ""}
                  onChange={(e) =>
                    handleAdditionalCostChange(
                      "constant",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Hosting */}
            <div>
              <label
                htmlFor="additionalHosting"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Additional Hosting
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="additionalHosting"
                  value={data.additionalCosts.hosting || ""}
                  onChange={(e) =>
                    handleAdditionalCostChange(
                      "hosting",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Domain */}
            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Domain
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="domain"
                  value={data.additionalCosts.domain || ""}
                  onChange={(e) =>
                    handleAdditionalCostChange(
                      "domain",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Storage */}
            <div>
              <label
                htmlFor="storage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Storage
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="storage"
                  value={data.additionalCosts.storage || ""}
                  onChange={(e) =>
                    handleAdditionalCostChange(
                      "storage",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Maintenance */}
            <div>
              <label
                htmlFor="maintenance"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Maintenance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="maintenance"
                  value={data.additionalCosts.maintenance || ""}
                  onChange={(e) =>
                    handleAdditionalCostChange(
                      "maintenance",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Website Cost */}
            <div>
              <label
                htmlFor="websiteCost"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Website Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="websiteCost"
                  value={data.additionalCosts.websiteCost || ""}
                  onChange={(e) =>
                    handleAdditionalCostChange(
                      "websiteCost",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Calculation */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Summary
          </h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Plan Price:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(data.planPrice)}
              </span>
            </div>

            {data.projectPrice > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Project Price:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(data.projectPrice)}
                </span>
              </div>
            )}

            {data.hostingYearlyPrice > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Hosting (Yearly):
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(data.hostingYearlyPrice)}
                </span>
              </div>
            )}

            {Object.entries(data.additionalCosts).map(([key, value]) => {
              if (value > 0) {
                return (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {key === "websiteCost" ? "Website Cost" : key}:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(value)}
                    </span>
                  </div>
                );
              }
              return null;
            })}

            <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-white">
                  Total Amount:
                </span>
                <span className="text-green-600 dark:text-green-400">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
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
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Payment Terms & Conditions
              </h4>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    All prices are in Indian Rupees (INR) and inclusive of
                    applicable taxes
                  </li>
                  <li>
                    Payment terms will be discussed and finalized during the
                    review process
                  </li>
                  <li>Hosting charges are recurring annually</li>
                  <li>
                    Maintenance charges are based on the selected frequency
                  </li>
                  <li>
                    Additional costs are one-time unless specified otherwise
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsStep;
