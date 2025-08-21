import React from "react";
import { PlanDetails } from "../../../types";

interface PlanDetailsStepProps {
  data: PlanDetails;
  onChange: (data: PlanDetails) => void;
}

const PlanDetailsStep: React.FC<PlanDetailsStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof PlanDetails, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const maintenanceFrequencies = [
    {
      value: "Monthly",
      label: "Monthly",
      description: "Regular monthly maintenance and updates",
    },
    {
      value: "Quarterly",
      label: "Quarterly",
      description: "Maintenance every 3 months",
    },
    {
      value: "Half Yearly",
      label: "Half Yearly",
      description: "Maintenance every 6 months",
    },
    {
      value: "Yearly",
      label: "Yearly",
      description: "Annual maintenance and updates",
    },
  ];

  const handlePricingDataChange = (key: string, value: any) => {
    onChange({
      ...data,
      pricingData: {
        ...(data.pricingData || {}),
        [key]: value,
      },
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Step 3: Plan Details
      </h2>

      <div className="space-y-4">
        {/* Access Type */}
        <div>
          <label
            htmlFor="accessType"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Access Type
          </label>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center">
              <input
                type="radio"
                id="lifetimeAccess"
                name="accessType"
                value="Lifetime Access"
                checked={data.accessType === "Lifetime Access"}
                onChange={(e) => handleChange("accessType", e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor="lifetimeAccess"
                className="ml-3 block text-sm font-medium text-blue-800 dark:text-blue-200"
              >
                Lifetime Access (Default)
              </label>
            </div>
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              One-time payment for lifetime access to the software with regular
              maintenance included.
            </p>
          </div>
        </div>

        {/* Maintenance Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Maintenance Frequency *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maintenanceFrequencies.map((frequency) => (
              <div
                key={frequency.value}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  data.maintenanceFrequency === frequency.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
                onClick={() =>
                  handleChange("maintenanceFrequency", frequency.value)
                }
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={frequency.value}
                    name="maintenanceFrequency"
                    value={frequency.value}
                    checked={data.maintenanceFrequency === frequency.value}
                    onChange={(e) =>
                      handleChange("maintenanceFrequency", e.target.value)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor={frequency.value}
                    className="ml-3 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {frequency.label}
                  </label>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {frequency.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Pricing */}
        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="customPricing"
              checked={data.customPricing}
              onChange={(e) => handleChange("customPricing", e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="customPricing"
              className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enable Custom Pricing
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Check this if you need custom pricing based on specific
            requirements.
          </p>
        </div>

        {/* Custom Pricing Data */}
        {data.customPricing && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Custom Pricing Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Custom Features */}
              <div className="md:col-span-2">
                <label
                  htmlFor="customFeatures"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Custom Features Required
                </label>
                <textarea
                  id="customFeatures"
                  value={data.pricingData?.customFeatures || ""}
                  onChange={(e) =>
                    handlePricingDataChange("customFeatures", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Describe any custom features or modifications needed"
                />
              </div>

              {/* Expected Users */}
              <div>
                <label
                  htmlFor="expectedUsers"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Expected Number of Users
                </label>
                <input
                  type="number"
                  id="expectedUsers"
                  value={data.pricingData?.expectedUsers || ""}
                  onChange={(e) =>
                    handlePricingDataChange(
                      "expectedUsers",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Number of users"
                  min="1"
                />
              </div>

              {/* Data Volume */}
              <div>
                <label
                  htmlFor="dataVolume"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Expected Data Volume
                </label>
                <select
                  id="dataVolume"
                  value={data.pricingData?.dataVolume || ""}
                  onChange={(e) =>
                    handlePricingDataChange("dataVolume", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select data volume</option>
                  <option value="low">Low (&lt; 10GB)</option>
                  <option value="medium">Medium (10GB - 100GB)</option>
                  <option value="high">High (100GB - 1TB)</option>
                  <option value="enterprise">Enterprise (&gt; 1TB)</option>
                </select>
              </div>

              {/* Integration Requirements */}
              <div className="md:col-span-2">
                <label
                  htmlFor="integrations"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Third-party Integrations
                </label>
                <textarea
                  id="integrations"
                  value={data.pricingData?.integrations || ""}
                  onChange={(e) =>
                    handlePricingDataChange("integrations", e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="List any third-party systems that need integration (e.g., payment gateways, CRM, etc.)"
                />
              </div>

              {/* Special Requirements */}
              <div className="md:col-span-2">
                <label
                  htmlFor="specialRequirements"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Special Requirements
                </label>
                <textarea
                  id="specialRequirements"
                  value={data.pricingData?.specialRequirements || ""}
                  onChange={(e) =>
                    handlePricingDataChange(
                      "specialRequirements",
                      e.target.value
                    )
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Any special requirements, compliance needs, or unique business processes"
                />
              </div>
            </div>
          </div>
        )}

        {/* Plan Summary */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h4 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
            Plan Summary
          </h4>
          <div className="text-sm text-green-700 dark:text-green-300">
            <p>
              <strong>Access Type:</strong> {data.accessType}
            </p>
            <p>
              <strong>Maintenance:</strong> {data.maintenanceFrequency}
            </p>
            <p>
              <strong>Custom Pricing:</strong>{" "}
              {data.customPricing ? "Yes" : "No"}
            </p>
            {data.customPricing && data.pricingData?.expectedUsers && (
              <p>
                <strong>Expected Users:</strong>{" "}
                {data.pricingData?.expectedUsers}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsStep;
