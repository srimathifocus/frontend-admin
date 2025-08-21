import React from "react";
import { ClientDatabaseSystem } from "../../../types";

interface DatabaseSystemStepProps {
  data: ClientDatabaseSystem;
  onChange: (data: ClientDatabaseSystem) => void;
}

const DatabaseSystemStep: React.FC<DatabaseSystemStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        STEP 4: Database & System Info
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Database Name *
          </label>
          <input
            type="text"
            value={data.databaseName}
            onChange={(e) => handleChange("databaseName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="client_database_name"
            required
          />
        </div>

        {/* Database Backup Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Database Backup Frequency
          </label>
          <select
            value={data.backupFrequency || "weekly"}
            onChange={(e) => handleChange("backupFrequency", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Last Backup Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Backup Date
          </label>
          <input
            type="date"
            value={data.lastBackupDate || ""}
            onChange={(e) => handleChange("lastBackupDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Server Environment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Server Environment (Node.js version)
          </label>
          <input
            type="text"
            value={data.serverEnvironment || ""}
            onChange={(e) => handleChange("serverEnvironment", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Node.js 18.x, Production"
          />
        </div>

        {/* Storage Usage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Storage Usage (MongoDB usage stats)
          </label>
          <input
            type="text"
            value={data.storageUsage || ""}
            onChange={(e) => handleChange("storageUsage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g., 250MB / 512MB, 1.2GB used"
          />
        </div>

        {/* Separate Backend Repo Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Separate Backend Repo Link (GitHub/GitLab)
          </label>
          <input
            type="url"
            value={data.backendRepoLink || ""}
            onChange={(e) => handleChange("backendRepoLink", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://github.com/username/client-backend"
          />
        </div>
      </div>

      {/* Database Connection URI */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Database Connection URI *
        </label>
        <input
          type="text"
          value={data.connectionUri}
          onChange={(e) => handleChange("connectionUri", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="mongodb://username:password@host:port/database"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Secure connection string for the client's database
        </p>
      </div>

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">
          System Information
        </h4>
        <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
          <li>• Each client gets a dedicated database instance</li>
          <li>• Automated backups ensure data security</li>
          <li>• Separate backend repositories for custom features</li>
          <li>• Real-time storage monitoring and alerts</li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseSystemStep;
