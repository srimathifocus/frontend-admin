import React from "react";
import { ClientAttachmentsNotes } from "../../../types";

interface AttachmentsNotesStepProps {
  data: ClientAttachmentsNotes;
  onChange: (data: ClientAttachmentsNotes) => void;
}

const AttachmentsNotesStep: React.FC<AttachmentsNotesStepProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        STEP 8: Attachments & Notes
      </h3>

      <div className="space-y-6">
        {/* Contract PDF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contract PDF
          </label>
          <input
            type="text"
            value={data.contractPdf || ""}
            onChange={(e) => handleChange("contractPdf", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="contract_client_name.pdf or file path/URL"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload or specify the path to the signed contract document
          </p>
        </div>

        {/* Custom Design Files */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Design Files
          </label>
          <textarea
            value={data.customDesignFiles || ""}
            onChange={(e) => handleChange("customDesignFiles", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="List custom design files, logos, brand assets, mockups, etc."
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1">
            Include file names, paths, or descriptions of custom design assets (
            {(data.customDesignFiles || "").length}/1000)
          </p>
        </div>

        {/* Client-Specific Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Client-Specific Instructions
          </label>
          <textarea
            value={data.clientSpecificInstructions || ""}
            onChange={(e) =>
              handleChange("clientSpecificInstructions", e.target.value)
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Special requirements, preferences, business rules, or specific instructions from the client"
            maxLength={2000}
          />
          <p className="text-xs text-gray-500 mt-1">
            Document any special requirements or client preferences (
            {(data.clientSpecificInstructions || "").length}/2000)
          </p>
        </div>

        {/* Internal Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Internal Notes (Admin Only)
          </label>
          <textarea
            value={data.internalNotes || ""}
            onChange={(e) => handleChange("internalNotes", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Internal team notes, observations, technical details, or administrative comments"
            maxLength={2000}
          />
          <p className="text-xs text-gray-500 mt-1">
            These notes are only visible to admin team members (
            {(data.internalNotes || "").length}/2000)
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Management Tips */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
            File Management Tips
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Use consistent naming conventions</li>
            <li>• Store files in organized folders</li>
            <li>• Keep backup copies of important documents</li>
            <li>• Update file paths when files are moved</li>
          </ul>
        </div>

        {/* Documentation Guidelines */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">
            Documentation Guidelines
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
            <li>• Be specific and detailed in instructions</li>
            <li>• Include dates and version numbers</li>
            <li>• Document any special requirements</li>
            <li>• Update notes as project evolves</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-300 mb-2">
          Privacy & Security
        </h4>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          <strong>Internal Notes</strong> are only visible to admin team members
          and are not shared with clients. Use this section for sensitive
          information, technical details, or internal observations that should
          remain confidential.
        </p>
      </div>
    </div>
  );
};

export default AttachmentsNotesStep;
