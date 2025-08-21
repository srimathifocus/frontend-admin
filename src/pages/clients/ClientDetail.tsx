import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Client } from "../../types";
import clientService from "../../services/clientService";
import LoadingSpinner from "../../components/LoadingSpinner";

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadClient();
    }
  }, [id]);

  const loadClient = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const clientData = await clientService.getClientById(id);
      setClient(clientData);
    } catch (error) {
      console.error("Error loading client:", error);
      toast.error("Failed to load client data");
      navigate("/clients");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      terminated: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          statusColors[status as keyof typeof statusColors] ||
          statusColors.inactive
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Client not found
        </h3>
        <Link
          to="/clients"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Back to Clients
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {client.businessName}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Client ID: {client.clientId}
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/clients/${client._id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              Edit Client
            </Link>
            <Link
              to="/clients"
              className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700"
            >
              Back to List
            </Link>
          </div>
        </div>

        {/* Client Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Status & Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Status:
                </span>
                {getStatusBadge(client.status)}
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Business Type:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {client.businessType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Onboarding Date:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(client.onboardingDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Billing Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Maintenance Fee:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(client.billing.maintenanceFee.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Billing Cycle:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {client.billing.billingCycle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Next Payment:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(client.billing.nextPaymentDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Technical Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Subdomain:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {client.domainHosting.subdomain}.yourdomain.com
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  DNS Status:
                </span>
                <span
                  className={`text-sm font-medium ${
                    client.domainHosting.dnsStatus === "active"
                      ? "text-green-600 dark:text-green-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {client.domainHosting.dnsStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  SSL Status:
                </span>
                <span
                  className={`text-sm font-medium ${
                    client.domainHosting.sslCertificateStatus === "active"
                      ? "text-green-600 dark:text-green-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {client.domainHosting.sslCertificateStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium text-sm">
                Contact Information
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Contact Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Owner/Contact Name
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {client.ownerContactName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Email
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {client.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {client.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Business Address
                </h4>
                <div className="text-sm text-gray-900 dark:text-white">
                  {client.businessAddress.street && (
                    <p>{client.businessAddress.street}</p>
                  )}
                  <p>
                    {client.businessAddress.city},{" "}
                    {client.businessAddress.state}
                  </p>
                  {client.businessAddress.pincode && (
                    <p>{client.businessAddress.pincode}</p>
                  )}
                  <p>{client.businessAddress.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
