import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Onboarding } from "../../types";
import onboardingService from "../../services/onboardingService";
import LoadingSpinner from "../../components/LoadingSpinner";

const OnboardingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [onboarding, setOnboarding] = useState<Onboarding | null>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    if (id) {
      loadOnboarding();
    }
  }, [id]);

  const loadOnboarding = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const data = await onboardingService.getOnboardingById(id);
      setOnboarding(data);
    } catch (error) {
      console.error("Error loading onboarding:", error);
      toast.error("Failed to load onboarding details");
      navigate("/onboarding");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;

    try {
      await onboardingService.updateOnboardingStatus(id, newStatus);
      toast.success("Status updated successfully");
      loadOnboarding();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newNote.trim()) return;

    setAddingNote(true);
    try {
      await onboardingService.addAdminNote(id, newNote.trim());
      toast.success("Note added successfully");
      setNewNote("");
      loadOnboarding();
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    } finally {
      setAddingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !onboarding) return;

    if (
      window.confirm(
        `Are you sure you want to delete the onboarding for ${onboarding.personalDetails.name}?`
      )
    ) {
      try {
        await onboardingService.deleteOnboarding(id);
        toast.success("Onboarding deleted successfully");
        navigate("/onboarding");
      } catch (error) {
        console.error("Error deleting onboarding:", error);
        toast.error("Failed to delete onboarding");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "Submitted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!onboarding) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Onboarding not found
        </h3>
        <Link
          to="/onboarding"
          className="mt-2 text-blue-600 hover:text-blue-500"
        >
          Back to Onboarding List
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3">
            <Link
              to="/onboarding"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {onboarding.personalDetails.name}
            </h1>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                onboarding.status
              )}`}
            >
              {onboarding.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {onboarding.businessDetails.businessName} • Created{" "}
            {formatDate(onboarding.createdAt)}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/onboarding/${id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Status Management */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Status Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Current Status
            </label>
            <select
              id="status"
              value={onboarding.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Completed Steps
            </label>
            <p className="text-sm text-gray-900 dark:text-white">
              {onboarding.completedSteps.length}/4 required steps completed
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Submitted
            </label>
            <p className="text-sm text-gray-900 dark:text-white">
              {onboarding.submittedAt
                ? formatDate(onboarding.submittedAt)
                : "Not submitted"}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.personalDetails.name}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Father's Name
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.personalDetails.fatherName}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.personalDetails.address}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              State
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.personalDetails.state}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              District
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.personalDetails.district}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number 1
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.personalDetails.phoneNumber1}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number 2
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.personalDetails.phoneNumber2 || "Not provided"}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nominee Name
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.personalDetails.nomineeName}
            </p>
          </div>
        </div>
      </div>

      {/* Business Details */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Business Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Name
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.businessName}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Address
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.address}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              State
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.state}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              District
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.district}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.phoneNumber}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GST Number
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.gstNumber || "Not provided"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Size
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.businessSize}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Years of Business
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.yearsOfBusiness} years
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Description
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.businessDetails.businessDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Plan Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Access Type
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.planDetails.accessType}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Maintenance Frequency
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.planDetails.maintenanceFrequency}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Custom Pricing
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {onboarding.planDetails.customPricing ? "Yes" : "No"}
            </p>
          </div>
          {onboarding.planDetails.customPricing &&
            onboarding.planDetails.pricingData && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Custom Pricing Details
                </label>
                <div className="mt-1 text-sm text-gray-900 dark:text-white space-y-1">
                  {onboarding.planDetails.pricingData.customFeatures && (
                    <p>
                      <strong>Features:</strong>{" "}
                      {onboarding.planDetails.pricingData.customFeatures}
                    </p>
                  )}
                  {onboarding.planDetails.pricingData.expectedUsers && (
                    <p>
                      <strong>Expected Users:</strong>{" "}
                      {onboarding.planDetails.pricingData.expectedUsers}
                    </p>
                  )}
                  {onboarding.planDetails.pricingData.dataVolume && (
                    <p>
                      <strong>Data Volume:</strong>{" "}
                      {onboarding.planDetails.pricingData.dataVolume}
                    </p>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Payment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Plan Price
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatCurrency(onboarding.paymentDetails.planPrice)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Price
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatCurrency(onboarding.paymentDetails.projectPrice)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Hosting (Yearly)
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatCurrency(onboarding.paymentDetails.hostingYearlyPrice)}
            </p>
          </div>

          {/* Additional Costs */}
          {Object.entries(onboarding.paymentDetails.additionalCosts).some(
            ([_, value]) => value > 0
          ) && (
            <>
              <div className="md:col-span-3">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                  Additional Costs
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(
                    onboarding.paymentDetails.additionalCosts
                  ).map(([key, value]) => {
                    if (value > 0) {
                      return (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key === "websiteCost" ? "Website Cost" : key}
                          </label>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {formatCurrency(value)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </>
          )}

          <div className="md:col-span-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                Total Amount:
              </span>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(onboarding.paymentDetails.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {onboarding.notes && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Client Notes
          </h3>
          <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
            {onboarding.notes}
          </p>
        </div>
      )}

      {/* Admin Notes */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Admin Notes
        </h3>

        {/* Add Note Form */}
        <form onSubmit={handleAddNote} className="mb-6">
          <div className="flex space-x-3">
            <div className="flex-1">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Add a note..."
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={addingNote || !newNote.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingNote ? "Adding..." : "Add Note"}
              </button>
            </div>
          </div>
        </form>

        {/* Notes List */}
        <div className="space-y-4">
          {onboarding.adminNotes.length > 0 ? (
            onboarding.adminNotes.map((note) => (
              <div
                key={note._id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {note.addedBy.username}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(note.addedAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {note.note}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              No admin notes yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingDetail;
