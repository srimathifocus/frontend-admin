import React from "react";
import { PersonalDetails } from "../../../types";

interface PersonalDetailsStepProps {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
  districts: string[];
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({
  data,
  onChange,
  districts,
}) => {
  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Step 1: Personal Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Father Name */}
        <div>
          <label
            htmlFor="fatherName"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Father's Name *
          </label>
          <input
            type="text"
            id="fatherName"
            value={data.fatherName}
            onChange={(e) => handleChange("fatherName", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter father's name"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label
            htmlFor="address"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Address *
          </label>
          <textarea
            id="address"
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
            rows={2}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your complete address"
            required
          />
        </div>

        {/* State */}
        <div>
          <label
            htmlFor="state"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            State *
          </label>
          <input
            type="text"
            id="state"
            value={data.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="State"
            required
          />
        </div>

        {/* District */}
        <div>
          <label
            htmlFor="district"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            District *
          </label>
          <select
            id="district"
            value={data.district}
            onChange={(e) => handleChange("district", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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

        {/* Phone Number 1 */}
        <div>
          <label
            htmlFor="phoneNumber1"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone Number 1 *
          </label>
          <input
            type="tel"
            id="phoneNumber1"
            value={data.phoneNumber1}
            onChange={(e) => handleChange("phoneNumber1", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter primary phone number"
            pattern="[6-9][0-9]{9}"
            title="Please enter a valid 10-digit phone number starting with 6-9"
            required
          />
        </div>

        {/* Phone Number 2 */}
        <div>
          <label
            htmlFor="phoneNumber2"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone Number 2 (Optional)
          </label>
          <input
            type="tel"
            id="phoneNumber2"
            value={data.phoneNumber2 || ""}
            onChange={(e) => handleChange("phoneNumber2", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter secondary phone number (optional)"
            pattern="[6-9][0-9]{9}"
            title="Please enter a valid 10-digit phone number starting with 6-9"
          />
        </div>

        {/* Nominee Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="nomineeName"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Nominee Name *
          </label>
          <input
            type="text"
            id="nomineeName"
            value={data.nomineeName}
            onChange={(e) => handleChange("nomineeName", e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter nominee name"
            required
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> All fields marked with * are required. Please
          ensure all information is accurate as it will be used for official
          documentation.
        </p>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
