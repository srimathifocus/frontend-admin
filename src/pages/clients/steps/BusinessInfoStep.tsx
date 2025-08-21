import React from "react";
import { ClientBusinessInfo } from "../../../types";

interface BusinessInfoStepProps {
  data: ClientBusinessInfo;
  onChange: (data: ClientBusinessInfo) => void;
}

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const businessTypes = [
    { value: "jewellery", label: "Jewellery" },
    { value: "pawn", label: "Pawn" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        STEP 2: Business Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Type *
          </label>
          <select
            value={data.businessType}
            onChange={(e) => handleChange("businessType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            {businessTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Business Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Category
          </label>
          <input
            type="text"
            value={data.businessCategory || ""}
            onChange={(e) => handleChange("businessCategory", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g., Fast Food, Clothing Store, Consulting"
          />
        </div>
      </div>

      {/* Business Description */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Business Description
        </label>
        <textarea
          value={data.businessDescription || ""}
          onChange={(e) => handleChange("businessDescription", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Describe the business, its services, target audience, etc."
          maxLength={1000}
        />
        <p className="text-xs text-gray-500 mt-1">
          {(data.businessDescription || "").length}/1000 characters
        </p>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
