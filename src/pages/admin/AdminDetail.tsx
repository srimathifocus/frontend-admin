import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Shield, 
  Edit,
  Save,
  X,
  UserCheck,
  UserX
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface AdminDetail {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { admin: currentAdmin } = useAuth();
  const [admin, setAdmin] = useState<AdminDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    role: 'admin' as 'admin' | 'super_admin',
    isActive: true,
    password: '',
  });

  useEffect(() => {
    if (currentAdmin?.role !== 'super_admin') {
      toast.error('Access denied. Super admin privileges required.');
      navigate('/admins');
      return;
    }

    if (id === 'new') {
      setIsCreating(true);
      setIsEditing(true);
      setIsLoading(false);
    } else if (id) {
      fetchAdmin(id);
    }
  }, [id, currentAdmin, navigate]);

  const fetchAdmin = async (adminId: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/admin/admins/${adminId}`);
      const adminData = response.data.data;
      setAdmin(adminData);
      setEditForm({
        username: adminData.username,
        email: adminData.email,
        role: adminData.role,
        isActive: adminData.isActive,
        password: '',
      });
    } catch (error) {
      toast.error('Failed to fetch admin details');
      navigate('/admins');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        if (!editForm.password) {
          toast.error('Password is required for new admin');
          return;
        }
        await api.post('/admin/admins', editForm);
        toast.success('Admin created successfully');
        navigate('/admins');
      } else if (admin) {
        const updateData = { ...editForm };
        if (!updateData.password) {
          delete updateData.password;
        }
        await api.put(`/admin/admins/${admin._id}`, updateData);
        toast.success('Admin updated successfully');
        setIsEditing(false);
        fetchAdmin(admin._id);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save admin');
    }
  };

  if (currentAdmin?.role !== 'super_admin') {
    return (
      <div className="text-center py-12">
        <Shield className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Access Denied</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Super admin privileges required to access this page.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!admin && !isCreating) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Admin not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/admins')}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isCreating ? 'Create Admin' : 'Admin Details'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isCreating ? 'Add a new administrator to the system' : 'View and manage administrator information'}
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        {/* Admin Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isCreating ? 'Admin Information' : 'Admin Details'}
            </h2>
            {!isCreating && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            )}
          </div>

          {isEditing || isCreating ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value as 'admin' | 'super_admin' }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isCreating ? 'Password' : 'New Password (leave blank to keep current)'}
                </label>
                <input
                  type="password"
                  value={editForm.password}
                  onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required={isCreating}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editForm.isActive}
                  onChange={(e) => setEditForm(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Active Status
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{isCreating ? 'Create Admin' : 'Save Changes'}</span>
                </button>
                {isCreating && (
                  <button
                    onClick={() => navigate('/admins')}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : admin ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16">
                  <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xl font-medium text-white">
                      {admin.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{admin.username}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      admin.role === 'super_admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <div className="flex items-center space-x-2">
                    {admin.isActive ? (
                      <UserCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <UserX className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      admin.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {admin.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">{admin.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">
                      {format(new Date(admin.createdAt), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
              </div>

              {admin.updatedAt !== admin.createdAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Updated</label>
                  <p className="text-gray-900 dark:text-white">
                    {format(new Date(admin.updatedAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminDetail;