import React from "react";
import { ClientDomainHosting } from "../../../types";

interface DomainHostingStepProps {
  data: ClientDomainHosting;
  onChange: (data: ClientDomainHosting) => void;
}

const DomainHostingStep: React.FC<DomainHostingStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        STEP 3: Domain & Hosting Info
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subdomain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subdomain *
          </label>
          <div className="flex">
            <input
              type="text"
              value={data.subdomain}
              onChange={(e) =>
                handleChange("subdomain", e.target.value.toLowerCase())
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="clientname"
              pattern="[a-z0-9-]+"
              required
            />
            <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-600 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300">
              .yourdomain.com
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Only lowercase letters, numbers, and hyphens allowed
          </p>
        </div>

        {/* DNS Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            DNS Status
          </label>
          <select
            value={data.dnsStatus || "pending"}
            onChange={(e) => handleChange("dnsStatus", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Frontend Hosting Platform */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Frontend Hosting Platform
          </label>
          <select
            value={data.frontendHostingPlatform || "netlify"}
            onChange={(e) =>
              handleChange("frontendHostingPlatform", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="netlify">Netlify</option>
            <option value="render">Render</option>
          </select>
        </div>

        {/* Backend Hosting Platform */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Backend Hosting Platform
          </label>
          <select
            value={data.backendHostingPlatform || "render"}
            onChange={(e) =>
              handleChange("backendHostingPlatform", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="render">Render</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* SSL Certificate Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SSL Certificate Status
          </label>
          <select
            value={data.sslCertificateStatus || "pending"}
            onChange={(e) =>
              handleChange("sslCertificateStatus", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
            <option value="not_configured">Not Configured</option>
          </select>
        </div>

        {/* Website UI Theme/Template */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website UI Theme/Template Used
          </label>
          <input
            type="text"
            value={data.websiteTheme || ""}
            onChange={(e) => handleChange("websiteTheme", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g., Modern Business, Restaurant Theme, Custom Design"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
          Multiple Design Options Available
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          We offer various website themes and templates. The selected theme will
          be customized according to your business requirements and branding.
        </p>
      </div>
    </div>
  );
};

export default DomainHostingStep;
