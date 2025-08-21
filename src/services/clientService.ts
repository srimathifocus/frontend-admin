import { api } from "./api";
import {
  Client,
  ClientsResponse,
  ClientDashboardStats,
  ApiResponse,
} from "../types";

const clientService = {
  // Create a new client
  createClient: async (clientData: any): Promise<Client> => {
    const response = await api.post(`/client`, clientData);
    return response.data.data.client;
  },

  // Get all clients with filters and pagination
  getAllClients: async (
    params: {
      page?: number;
      limit?: number;
      status?: string;
      businessType?: string;
      serviceLevel?: string;
      assignedSalesRep?: string;
      dnsStatus?: string;
      billingCycle?: string;
      search?: string;
      sortBy?: string;
      order?: string;
    } = {}
  ): Promise<ClientsResponse> => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    const response = await api.get(`/client?${queryParams.toString()}`);
    return response.data.data;
  },

  // Get client by ID
  getClientById: async (id: string): Promise<Client> => {
    const response = await api.get(`/client/${id}`);
    return response.data.data.client;
  },

  // Get client by client ID (custom ID)
  getClientByClientId: async (clientId: string): Promise<Client> => {
    const response = await api.get(`/client/client-id/${clientId}`);
    return response.data.data.client;
  },

  // Update client
  updateClient: async (id: string, updateData: any): Promise<Client> => {
    const response = await api.put(`/client/${id}`, updateData);
    return response.data.data.client;
  },

  // Add internal note
  addInternalNote: async (
    id: string,
    note: string,
    isPrivate: boolean = true
  ): Promise<Client> => {
    const response = await api.post(`/client/${id}/notes`, {
      note,
      isPrivate,
    });
    return response.data.data.client;
  },

  // Add ongoing issue
  addOngoingIssue: async (
    id: string,
    issue: string,
    priority: string = "medium",
    assignedTo?: string
  ): Promise<Client> => {
    const response = await api.post(`/client/${id}/issues`, {
      issue,
      priority,
      assignedTo,
    });
    return response.data.data.client;
  },

  // Update payment information
  updatePayment: async (
    id: string,
    paymentData: {
      amount?: number;
      paymentDate?: string;
      paymentMethod?: string;
      nextPaymentDate?: string;
    }
  ): Promise<Client> => {
    const response = await api.put(`/client/${id}/payment`, paymentData);
    return response.data.data.client;
  },

  // Get dashboard statistics
  getDashboardStats: async (): Promise<ClientDashboardStats> => {
    const response = await api.get(`/client/dashboard-stats`);
    return response.data.data;
  },
};

export default clientService;
