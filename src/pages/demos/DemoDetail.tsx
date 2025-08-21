import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Building,
  Plus,
  Edit,
  Save,
  X,
  User,
  Users,
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
  // Optional nested shapes used by the UI
  customerDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  businessDetails?: {
    businessType?: string;
    currentSoftware?: string;
    teamSize?: number;
    requirements?: string;
  };
}

const DemoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [demo, setDemo] = useState<Demo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  const [editForm, setEditForm] = useState({
    status: "",
    priority: "",
    scheduledDate: "",
    followUpDate: "",
    customerResponse: "",
  });

  useEffect(() => {
    if (id) {
      fetchDemo(id);
    }
  }, [id]);

  const fetchDemo = async (demoId: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/demo/${demoId}`);
      const demoData = response.data.data.demo;
      setDemo(demoData);
      setEditForm({
        status: demoData.status,
        priority: demoData.priority,
        scheduledDate: demoData.demoDate ? demoData.demoDate.split("T")[0] : "",
        followUpDate: demoData.followUpDate
          ? demoData.followUpDate.split("T")[0]
          : "",
        customerResponse: demoData.customerResponse || "",
      });
    } catch (error) {
      toast.error("Failed to fetch demo details");
      navigate("/demos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDemo = async () => {
    if (!demo) return;

    // Build payload that matches backend validation
    const payload: any = {};
    if (editForm.status) payload.status = editForm.status;
    if (editForm.priority) payload.priority = editForm.priority; // allowed: low, medium, high
    if (editForm.scheduledDate) payload.demoDate = editForm.scheduledDate; // backend expects demoDate (ISO)
    if (editForm.followUpDate) payload.followUpDate = editForm.followUpDate; // ISO date
    if (editForm.customerResponse)
      payload.customerResponse = editForm.customerResponse; // pending | okay | not_okay

    try {
      await api.put(`/demo/${demo._id}`, payload);
      toast.success("Demo updated successfully");
      setIsEditing(false);
      fetchDemo(demo._id);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Failed to update demo";
      toast.error(msg);
    }
  };

  const handleAddNote = async () => {
    const trimmed = newNote.trim();
    if (!demo || trimmed.length < 5) {
      toast.error("Note must be at least 5 characters");
      return;
    }

    try {
      setIsAddingNote(true);
      await api.post(`/demo/${demo._id}/notes`, { note: trimmed });
      toast.success("Note added successfully");
      setNewNote("");
      fetchDemo(demo._id);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Failed to add note";
      toast.error(msg);
    } finally {
      setIsAddingNote(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!demo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Demo not found</p>
      </div>
    );
  }

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
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/demos")}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Demo Request Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage demo request information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demo Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Customer Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <p className="text-gray-900 dark:text-white">
                  {demo.customerDetails?.name ?? demo.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">
                    {demo.customerDetails?.email ?? demo.email}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">
                    {demo.customerDetails?.phone ?? demo.phone}
                  </p>
                </div>
              </div>

              {(demo.customerDetails?.company ?? demo.business) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">
                      {demo.customerDetails?.company ?? demo.business}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Created
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">
                    {format(new Date(demo.createdAt), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Business Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Business Type
                </label>
                <p className="text-gray-900 dark:text-white">
                  {demo.businessDetails?.businessType ?? demo.businessType}
                </p>
              </div>

              {(demo.businessDetails?.currentSoftware ??
                demo.currentSoftware) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Software
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {demo.businessDetails?.currentSoftware ??
                      demo.currentSoftware}
                  </p>
                </div>
              )}

              {(demo.businessDetails?.teamSize ?? null) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Team Size
                  </label>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">
                      {demo.businessDetails?.teamSize} members
                    </p>
                  </div>
                </div>
              )}
            </div>

            {demo.businessDetails?.requirements && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Requirements
                </label>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {demo.businessDetails?.requirements}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Admin Notes
            </h2>

            {/* Add Note Form */}
            <div className="mb-6">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim() || isAddingNote}
                className="mt-2 flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isAddingNote ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Add Note
              </button>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              {demo.adminNotes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No notes added yet
                </p>
              ) : (
                demo.adminNotes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {note.addedBy.username}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(note.addedAt), "MMM dd, yyyy HH:mm")}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {note.note}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Status & Schedule */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Status & Details
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Edit className="w-4 h-4" />
                )}
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="demo_scheduled">Demo Scheduled</option>
                    <option value="demo_completed">Demo Completed</option>
                    <option value="demo_accepted">Demo Accepted</option>
                    <option value="on_proceed">On Proceed</option>
                    <option value="converted">Converted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={editForm.priority}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    value={editForm.scheduledDate}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        scheduledDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={editForm.followUpDate}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        followUpDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Customer Response
                  </label>
                  <select
                    value={editForm.customerResponse}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        customerResponse: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Not Set</option>
                    <option value="okay">Okay</option>
                    <option value="not_okay">Not Okay</option>
                  </select>
                </div>

                <button
                  onClick={handleUpdateDemo}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      demo.status
                    )}`}
                  >
                    {demo.status.replace("_", " ")}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                      demo.priority
                    )}`}
                  >
                    {demo.priority}
                  </span>
                </div>

                {demo.demoDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Scheduled Date
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {format(new Date(demo.demoDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                )}

                {demo.followUpDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Follow-up Date
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {format(new Date(demo.followUpDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                )}

                {demo.customerResponse && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Customer Response
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        demo.customerResponse === "okay"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {demo.customerResponse.replace("_", " ")}
                    </span>
                  </div>
                )}

                {demo.assignedTo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Assigned To
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {demo.assignedTo.username}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDetail;
