import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Building,
  User,
} from "lucide-react";
import { api } from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { format } from "date-fns";

interface Demo {
  _id: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  businessType:
    | "retail-store"
    | "restaurant"
    | "service-business"
    | "e-commerce"
    | "manufacturing"
    | "healthcare"
    | "education"
    | "real-estate"
    | "construction"
    | "consulting"
    | "other";
  currentSoftware: "none" | "excel" | "tally" | "quickbooks" | "zoho" | "other";
  preferredTime: string;
  status:
    | "pending"
    | "demo_scheduled"
    | "demo_completed"
    | "demo_accepted"
    | "on_proceed"
    | "converted"
    | "rejected";
  priority: "low" | "medium" | "high";
  demoDate?: string;
  demoNotes?: string;
  assignedTo?: {
    _id: string;
    username: string;
    email: string;
  };
  customerResponse: "pending" | "okay" | "not_okay";
  customerFeedback?: string;
  conversionValue?: number;
  followUpDate?: string;
  adminNotes: Array<{
    _id: string;
    note: string;
    addedBy: {
      _id: string;
      username: string;
      email: string;
    };
    addedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface DemosResponse {
  demos: Demo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  statusCounts: {
    [key: string]: number;
  };
  businessTypeCounts: {
    [key: string]: number;
  };
}

const DemoList: React.FC = () => {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    businessType: "",
    customerResponse: "",
  });

  useEffect(() => {
    fetchDemos();
  }, [pagination.page, filters]);

  const fetchDemos = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.businessType && { businessType: filters.businessType }),
        ...(filters.customerResponse && {
          customerResponse: filters.customerResponse,
        }),
      });

      const response = await api.get(`/demo?${params}`);
      const data: DemosResponse = response.data.data;

      setDemos(data.demos);
      setPagination(data.pagination);
    } catch (error) {
      toast.error("Failed to fetch demo requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this demo request?"))
      return;

    try {
      await api.delete(`/demo/${id}`);
      toast.success("Demo request deleted successfully");
      fetchDemos();
    } catch (error) {
      toast.error("Failed to delete demo request");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "demo_scheduled":
        return <Calendar className="w-4 h-4 text-yellow-500" />;
      case "demo_completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "demo_accepted":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "on_proceed":
        return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case "converted":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "demo_scheduled":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "demo_completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "demo_accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "on_proceed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "converted":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Demo Requests
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer demo requests and track conversion
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search demos..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="demo_scheduled">Demo Scheduled</option>
            <option value="demo_completed">Demo Completed</option>
            <option value="demo_accepted">Demo Accepted</option>
            <option value="on_proceed">On Proceed</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priority: e.target.value }))
            }
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filters.businessType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, businessType: e.target.value }))
            }
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Business Types</option>
            <option value="retail-store">Retail Store</option>
            <option value="restaurant">Restaurant</option>
            <option value="e-commerce">E-commerce</option>
            <option value="service-business">Service Business</option>
            <option value="other">Other</option>
          </select>

          <button
            onClick={fetchDemos}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Apply
          </button>
        </div>
      </div>

      {/* Demos Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="large" />
          </div>
        ) : demos.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No demo requests found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No demo requests match your current filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {demos.map((demo) => (
                  <tr
                    key={demo._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {demo.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {demo.email}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {demo.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {demo.businessType
                              ?.replace("-", " ")
                              .toUpperCase() || "Not specified"}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {demo.business}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(demo.status)}
                        <span
                          className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            demo.status
                          )}`}
                        >
                          {demo.status.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          demo.priority
                        )}`}
                      >
                        {demo.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(demo.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <Link
                          to={`/demos/${demo._id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(demo._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      page: Math.max(1, prev.page - 1),
                    }))
                  }
                  disabled={pagination.page === 1}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      page: Math.min(prev.pages, prev.page + 1),
                    }))
                  }
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoList;
