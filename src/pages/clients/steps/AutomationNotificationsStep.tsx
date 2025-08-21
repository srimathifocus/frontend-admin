import React from "react";
import { ClientAutomationNotifications } from "../../../types";

interface AutomationNotificationsStepProps {
  data: ClientAutomationNotifications;
  onChange: (data: ClientAutomationNotifications) => void;
}

const AutomationNotificationsStep: React.FC<
  AutomationNotificationsStepProps
> = ({ data, onChange }) => {
  const handleChange = (field: string, value: boolean) => {
    onChange({ ...data, [field]: value });
  };

  const notificationOptions = [
    {
      key: "autoEmailAlerts",
      title: "Auto Email Alerts",
      description:
        "Automated email notifications for system events and updates",
    },
    {
      key: "backupCompleted",
      title: "Backup Completed",
      description:
        "Notifications when database backups are successfully completed",
    },
    {
      key: "paymentReminder",
      title: "Payment Reminder",
      description: "Automated reminders before payment due dates",
    },
    {
      key: "sslExpiry",
      title: "SSL Expiry",
      description: "Alerts when SSL certificates are about to expire",
    },
    {
      key: "domainRenewal",
      title: "Domain Renewal",
      description: "Notifications for domain renewal requirements",
    },
    {
      key: "supportSlaReminder",
      title: "Support SLA Reminder",
      description: "Alerts when support response time is overdue",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        STEP 7: Automation & Notifications
      </h3>

      <div className="space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Configure automated notifications and alerts for this client. These
          settings help ensure timely communication and proactive issue
          management.
        </p>

        {notificationOptions.map((option) => (
          <div
            key={option.key}
            className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center h-5">
              <input
                id={option.key}
                type="checkbox"
                checked={
                  data[option.key as keyof ClientAutomationNotifications] ||
                  false
                }
                onChange={(e) => handleChange(option.key, e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor={option.key}
                className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
              >
                {option.title}
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-indigo-900 dark:text-indigo-300 mb-2">
          Automation Benefits
        </h4>
        <ul className="text-sm text-indigo-700 dark:text-indigo-400 space-y-1">
          <li>
            • <strong>Proactive Monitoring:</strong> Get notified before issues
            become critical
          </li>
          <li>
            • <strong>Payment Management:</strong> Automated reminders reduce
            payment delays
          </li>
          <li>
            • <strong>Security Alerts:</strong> SSL and domain expiry
            notifications ensure continuous security
          </li>
          <li>
            • <strong>SLA Compliance:</strong> Support response time tracking
            maintains service quality
          </li>
          <li>
            • <strong>System Health:</strong> Backup notifications confirm data
            protection
          </li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
          Notification Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {notificationOptions.map((option) => (
            <div key={option.key} className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  data[option.key as keyof ClientAutomationNotifications]
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></div>
              <span
                className={
                  data[option.key as keyof ClientAutomationNotifications]
                    ? "text-green-700 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {option.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutomationNotificationsStep;
