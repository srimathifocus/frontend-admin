import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Calendar,
  Users,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import { api } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardStats {
  contacts: {
    totalContacts: number;
    newContacts: number;
    inProgressContacts: number;
    resolvedContacts: number;
    closedContacts: number;
  };
  demos: {
    totalDemos: number;
    pendingDemos: number;
    scheduledDemos: number;
    completedDemos: number;
    acceptedDemos: number;
    convertedDemos: number;
    totalConversionValue: number;
  };
  onboarding: {
    totalOnboardings: number;
    draftOnboardings: number;
    submittedOnboardings: number;
    underReviewOnboardings: number;
    approvedOnboardings: number;
    rejectedOnboardings: number;
    totalOnboardingValue: number;
  };
  recentActivities: {
    contacts: Array<{
      _id: string;
      name: string;
      email: string;
      subject: string;
      status: string;
      createdAt: string;
    }>;
    demos: Array<{
      _id: string;
      name: string;
      business: string;
      email: string;
      status: string;
      createdAt: string;
    }>;
    onboardings: Array<{
      _id: string;
      personalDetails: { name: string };
      businessDetails: { businessName: string };
      status: string;
      createdAt: string;
    }>;
  };
  businessTypeStats: Array<{
    _id: string;
    count: number;
  }>;
  clients: {
    totalClients: number;
    activeClients: number;
  };
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Failed to load dashboard data
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Contacts
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.contacts?.totalContacts || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Demo Requests
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.demos?.totalDemos || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Converted Demos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.demos?.convertedDemos || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Conversion Value
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${stats?.demos?.totalConversionValue || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserPlus className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Onboarding Requests
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.onboarding?.totalOnboardings || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Status Distribution
          </h3>
          {(stats?.contacts?.totalContacts || 0) > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "New", value: stats?.contacts?.newContacts || 0 },
                    {
                      name: "In Progress",
                      value: stats?.contacts?.inProgressContacts || 0,
                    },
                    {
                      name: "Resolved",
                      value: stats?.contacts?.resolvedContacts || 0,
                    },
                    {
                      name: "Closed",
                      value: stats?.contacts?.closedContacts || 0,
                    },
                  ].filter((item) => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    {
                      name: "New",
                      value: stats?.contacts?.newContacts || 0,
                      color: "#3B82F6",
                    },
                    {
                      name: "In Progress",
                      value: stats?.contacts?.inProgressContacts || 0,
                      color: "#F59E0B",
                    },
                    {
                      name: "Resolved",
                      value: stats?.contacts?.resolvedContacts || 0,
                      color: "#10B981",
                    },
                    {
                      name: "Closed",
                      value: stats?.contacts?.closedContacts || 0,
                      color: "#6B7280",
                    },
                  ]
                    .filter((item) => item.value > 0)
                    .map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  labelFormatter={() => ""}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No contact data available
                </p>
              </div>
            </div>
          )}
          {/* Status Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">
                New: {stats?.contacts?.newContacts || 0}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">
                In Progress: {stats?.contacts?.inProgressContacts || 0}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Resolved: {stats?.contacts?.resolvedContacts || 0}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Closed: {stats?.contacts?.closedContacts || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Status and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demo Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Demo Status Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { status: "Pending", count: stats?.demos?.pendingDemos || 0 },
                {
                  status: "Scheduled",
                  count: stats?.demos?.scheduledDemos || 0,
                },
                {
                  status: "Completed",
                  count: stats?.demos?.completedDemos || 0,
                },
                { status: "Accepted", count: stats?.demos?.acceptedDemos || 0 },
                {
                  status: "Converted",
                  count: stats?.demos?.convertedDemos || 0,
                },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="status" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            This Week's Activity
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Contact Forms This Week */}
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stats?.contacts?.totalContacts || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Contact Forms
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                This Week
              </div>
            </div>

            {/* Demos This Week */}
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Calendar className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stats?.demos?.totalDemos || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Demo Requests
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                This Week
              </div>
            </div>
          </div>

          {/* Additional Weekly Metrics */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  New Clients:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats?.clients?.totalClients || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Active Projects:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats?.clients?.activeClients || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
