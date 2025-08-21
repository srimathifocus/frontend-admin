import React from "react";
import { ClientServiceSupport } from "../../../types";

interface ServiceSupportStepProps {
  data: ClientServiceSupport;
  onChange: (data: ClientServiceSupport) => void;
}

const ServiceSupportStep: React.FC<ServiceSupportStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        STEP 6: Service & Support Logs
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Tickets Raised */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Support Tickets Raised (Count)
          </label>
          <input
            type="number"
            value={data.supportTicketsCount || 0}
            onChange={(e) =>
              handleChange("supportTicketsCount", parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
          />
        </div>

        {/* Link to Ticket System */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Link to Ticket System
          </label>
          <input
            type="url"
            value={data.ticketSystemLink || ""}
            onChange={(e) => handleChange("ticketSystemLink", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://support.company.com/client-tickets"
          />
        </div>

        {/* Last Support Request Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Support Request Date
          </label>
          <input
            type="date"
            value={data.lastSupportRequestDate || ""}
            onChange={(e) =>
              handleChange("lastSupportRequestDate", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Service Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Service Level
          </label>
          <select
            value={data.serviceLevel || "basic"}
            onChange={(e) => handleChange("serviceLevel", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

      {/* Custom Features Requested */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Custom Features Requested
        </label>
        <textarea
          value={data.customFeaturesRequested || ""}
          onChange={(e) =>
            handleChange("customFeaturesRequested", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="List any custom features or modifications requested by the client"
          maxLength={1000}
        />
        <p className="text-xs text-gray-500 mt-1">
          {(data.customFeaturesRequested || "").length}/1000 characters
        </p>
      </div>

      {/* Previous Issues & Fixes History */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Previous Issues & Fixes History
        </label>
        <textarea
          value={data.previousIssuesHistory || ""}
          onChange={(e) =>
            handleChange("previousIssuesHistory", e.target.value)
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Document past issues, their solutions, and resolution dates"
          maxLength={2000}
        />
        <p className="text-xs text-gray-500 mt-1">
          {(data.previousIssuesHistory || "").length}/2000 characters
        </p>
      </div>

      {/* Ongoing Issues */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ongoing Issues
        </label>
        <textarea
          value={data.ongoingIssues || ""}
          onChange={(e) => handleChange("ongoingIssues", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="List current unresolved issues and their priority levels"
          maxLength={1000}
        />
        <p className="text-xs text-gray-500 mt-1">
          {(data.ongoingIssues || "").length}/1000 characters
        </p>
      </div>

      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2">
          Support & Service Information
        </h4>
        <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
          <li>
            • <strong>Basic:</strong> Email support, standard response time
          </li>
          <li>
            • <strong>Premium:</strong> Priority support, faster response, phone
            support
          </li>
          <li>
            • <strong>Custom:</strong> Dedicated support, custom SLA, on-site
            assistance
          </li>
          <li>• All support interactions are tracked and documented</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceSupportStep;
