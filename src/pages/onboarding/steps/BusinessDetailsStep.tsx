import React from "react";
import { BusinessDetails } from "../../../types";

interface BusinessDetailsStepProps {
  data: BusinessDetails;
  onChange: (data: BusinessDetails) => void;
  districts: string[];
}

const BusinessDetailsStep: React.FC<BusinessDetailsStepProps> = ({
  data,
  onChange,
  districts,
}) => {
  const handleChange = (
    field: keyof BusinessDetails,
    value: string | number
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const businessSizes = ["Small", "Medium", "Large", "Enterprise"];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Step 2: Business Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            value={data.businessName}
            onChange={(e) => handleChange("businessName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your business name"
            required
          />
        </div>

        {/* Business Address */}
        <div className="md:col-span-2">
          <label
            htmlFor="businessAddress"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Business Address *
          </label>
          <textarea
            id="businessAddress"
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your business address"
            required
          />
        </div>

        {/* Business State */}
        <div>
          <label
            htmlFor="businessState"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Business State *
          </label>
          <input
            type="text"
            id="businessState"
            value={data.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter business state"
            required
          />
        </div>

        {/* Business District */}
        <div>
          <label
            htmlFor="businessDistrict"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Business District *
          </label>
          <select
            id="businessDistrict"
            value={data.district}
            onChange={(e) => handleChange("district", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Business Phone */}
        <div>
          <label
            htmlFor="businessPhone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Business Phone Number *
          </label>
          <input
            type="tel"
            id="businessPhone"
            value={data.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter business phone number"
            pattern="[6-9][0-9]{9}"
            title="Please enter a valid 10-digit phone number starting with 6-9"
            required
          />
        </div>

        {/* GST Number */}
        <div>
          <label
            htmlFor="gstNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            GST Number (Optional)
          </label>
          <input
            type="text"
            id="gstNumber"
            value={data.gstNumber || ""}
            onChange={(e) =>
              handleChange("gstNumber", e.target.value.toUpperCase())
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter GST number (e.g., 22AAAAA0000A1Z5)"
            pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
            title="Please enter a valid GST number"
          />
        </div>

        {/* Business Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="businessDescription"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Business Description *
          </label>
          <textarea
            id="businessDescription"
            value={data.businessDescription}
            onChange={(e) =>
              handleChange("businessDescription", e.target.value)
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Describe your business, products/services, target market, etc."
            required
          />
        </div>

        {/* Business Size */}
        <div>
          <label
            htmlFor="businessSize"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Business Size *
          </label>
          <select
            id="businessSize"
            value={data.businessSize}
            onChange={(e) =>
              handleChange(
                "businessSize",
                e.target.value as BusinessDetails["businessSize"]
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            {businessSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Years of Business */}
        <div>
          <label
            htmlFor="yearsOfBusiness"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Years of Business *
          </label>
          <input
            type="number"
            id="yearsOfBusiness"
            value={data.yearsOfBusiness}
            onChange={(e) =>
              handleChange("yearsOfBusiness", parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter years in business"
            min="0"
            max="100"
            required
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <p className="text-xs text-green-800 dark:text-green-200 mb-2">
          <strong>Business Size Guide:</strong>
        </p>
        <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
          <li>
            <strong>Small:</strong> 1-50 employees, local/regional presence
          </li>
          <li>
            <strong>Medium:</strong> 51-250 employees, regional/national
            presence
          </li>
          <li>
            <strong>Large:</strong> 251-1000 employees, national presence
          </li>
          <li>
            <strong>Enterprise:</strong> 1000+ employees, multinational presence
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BusinessDetailsStep;
