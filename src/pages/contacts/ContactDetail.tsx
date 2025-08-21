import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Plus,
  Edit,
  Save,
  X,
} from "lucide-react";
import { api } from "../../services/api";
import { Contact } from "../../types";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { format } from "date-fns";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: {
    _id: string;
    username: string;
    email: string;
  };
  customerResponse: "pending" | "satisfied" | "not_satisfied";
  customerFeedback?: string;
  issueSolved: boolean;
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

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  const [editForm, setEditForm] = useState({
    status: "",
    priority: "",
    assignedTo: "",
    customerResponse: "",
    issueSolved: false,
  });

  useEffect(() => {
    if (id) {
      fetchContact(id);
    }
  }, [id]);

  const fetchContact = async (contactId: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/contact/${contactId}`);
      const contactData = response.data.data.contact;
      setContact(contactData);
      setEditForm({
        status: contactData.status,
        priority: contactData.priority,
        assignedTo: contactData.assignedTo?._id || "",
        customerResponse: contactData.customerResponse || "",
        issueSolved: contactData.issueSolved || false,
      });
    } catch (error) {
      toast.error("Failed to fetch contact details");
      navigate("/contacts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateContact = async () => {
    if (!contact) return;

    try {
      await api.put(`/contact/${contact._id}`, editForm);
      toast.success("Contact updated successfully");
      setIsEditing(false);
      fetchContact(contact._id);
    } catch (error) {
      toast.error("Failed to update contact");
    }
  };

  const handleAddNote = async () => {
    if (!contact || !newNote.trim()) return;

    try {
      setIsAddingNote(true);
      await api.post(`/contact/${contact._id}/notes`, { note: newNote });
      toast.success("Note added successfully");
      setNewNote("");
      fetchContact(contact._id);
    } catch (error) {
      toast.error("Failed to add note");
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

  if (!contact) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Contact not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
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
          onClick={() => navigate("/contacts")}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contact Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage contact information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contact Information
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <p className="text-gray-900 dark:text-white">{contact.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">
                    {contact.email}
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
                    {contact.phone}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Created
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">
                    {format(new Date(contact.createdAt), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <p className="text-gray-900 dark:text-white font-medium">
                {contact.subject}
              </p>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Notes
              </h2>
            </div>

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
              {contact.adminNotes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No notes added yet
                </p>
              ) : (
                contact.adminNotes.map((note) => (
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

        {/* Sidebar - Status & Priority */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Status & Priority
            </h2>

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
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
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
                    <option value="urgent">Urgent</option>
                  </select>
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
                    <option value="satisfied">Satisfied</option>
                    <option value="not_satisfied">Not Satisfied</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="issueSolved"
                    checked={editForm.issueSolved}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        issueSolved: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="issueSolved"
                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                  >
                    Issue Solved
                  </label>
                </div>

                <button
                  onClick={handleUpdateContact}
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
                      contact.status
                    )}`}
                  >
                    {contact.status.replace("_", " ")}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                      contact.priority
                    )}`}
                  >
                    {contact.priority}
                  </span>
                </div>

                {contact.customerResponse && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Customer Response
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        contact.customerResponse === "satisfied"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {contact.customerResponse.replace("_", " ")}
                    </span>
                  </div>
                )}

                {contact.issueSolved !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Issue Status
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        contact.issueSolved
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {contact.issueSolved ? "Solved" : "Unsolved"}
                    </span>
                  </div>
                )}

                {contact.assignedTo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Assigned To
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {contact.assignedTo.username}
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

export default ContactDetail;
