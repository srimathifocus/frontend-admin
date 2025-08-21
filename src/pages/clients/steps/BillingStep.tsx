import React from "react";
import { ClientBilling } from "../../../types";

interface BillingStepProps {
  data: ClientBilling;
  onChange: (data: ClientBilling) => void;
}

const BillingStep: React.FC<BillingStepProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      onChange({
        ...data,
        [parent]: {
          ...(data as any)[parent],
          [child]: value,
        },
      });
    } else {
      onChange({ ...data, [field]: value });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        STEP 5: Billing & Payment Info
      </h3>

      {/* Setup Cost */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Setup Cost
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Setup Cost Paid
            </label>
            <select
              value={data.setupCost.paid ? "true" : "false"}
              onChange={(e) =>
                handleChange("setupCost.paid", e.target.value === "true")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Setup Cost Amount (₹)
            </label>
            <input
              type="number"
              value={data.setupCost.amount || 0}
              onChange={(e) =>
                handleChange(
                  "setupCost.amount",
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Maintenance Fee */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Maintenance Fee
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Maintenance Fee Amount (₹) *
            </label>
            <input
              type="number"
              value={data.maintenanceFee.amount}
              onChange={(e) =>
                handleChange(
                  "maintenanceFee.amount",
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Billing Cycle *
            </label>
            <select
              value={data.billingCycle}
              onChange={(e) => handleChange("billingCycle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Dates */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Payment Dates
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Payment Date
            </label>
            <input
              type="date"
              value={data.lastPaymentDate || ""}
              onChange={(e) => handleChange("lastPaymentDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Next Payment Date *
            </label>
            <input
              type="date"
              value={data.nextPaymentDate}
              onChange={(e) => handleChange("nextPaymentDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Payment Method *
        </label>
        <select
          value={data.paymentMethod}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        >
          <option value="upi">UPI</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="card">Card</option>
        </select>
      </div>

      {/* Pending Dues */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Pending Dues (if any)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pending Amount (₹)
            </label>
            <input
              type="number"
              value={data.pendingDues?.amount || 0}
              onChange={(e) =>
                handleChange(
                  "pendingDues.amount",
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              value={data.pendingDues?.description || ""}
              onChange={(e) =>
                handleChange("pendingDues.description", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Reason for pending dues"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">
          Payment Information
        </h4>
        <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>• Setup cost is a one-time payment for initial development</li>
          <li>• Maintenance fee covers ongoing support and hosting</li>
          <li>• Payment reminders are sent automatically before due dates</li>
          <li>• Multiple payment methods supported for convenience</li>
        </ul>
      </div>
    </div>
  );
};

export default BillingStep;
