import { api } from "./api";
import {
  Onboarding,
  OnboardingResponse,
  OnboardingStats,
  PersonalDetails,
  BusinessDetails,
  PlanDetails,
  PaymentDetails,
  ApiResponse,
} from "../types";

export const onboardingService = {
  // Get Tamil Nadu districts
  getDistricts: async (): Promise<string[]> => {
    const response = await api.get<ApiResponse<string[]>>(
      "/onboarding/districts"
    );
    return response.data.data;
  },

  // Create new onboarding
  createOnboarding: async (data: Partial<Onboarding>): Promise<Onboarding> => {
    const response = await api.post<ApiResponse<Onboarding>>(
      "/onboarding",
      data
    );
    return response.data.data;
  },

  // Get all onboardings (Admin only)
  getAllOnboardings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<OnboardingResponse> => {
    const response = await api.get<ApiResponse<OnboardingResponse>>(
      "/onboarding",
      { params }
    );
    return response.data.data;
  },

  // Get onboarding by ID
  getOnboardingById: async (id: string): Promise<Onboarding> => {
    const response = await api.get<ApiResponse<Onboarding>>(
      `/onboarding/${id}`
    );
    return response.data.data;
  },

  // Update onboarding
  updateOnboarding: async (
    id: string,
    data: Partial<Onboarding>
  ): Promise<Onboarding> => {
    const response = await api.put<ApiResponse<Onboarding>>(
      `/onboarding/${id}`,
      data
    );
    return response.data.data;
  },

  // Update specific step
  updateOnboardingStep: async (
    id: string,
    stepNumber: number,
    data:
      | PersonalDetails
      | BusinessDetails
      | PlanDetails
      | PaymentDetails
      | { notes: string }
  ): Promise<Onboarding> => {
    const response = await api.put<ApiResponse<Onboarding>>(
      `/onboarding/${id}/step/${stepNumber}`,
      data
    );
    return response.data.data;
  },

  // Submit onboarding
  submitOnboarding: async (id: string): Promise<Onboarding> => {
    const response = await api.post<ApiResponse<Onboarding>>(
      `/onboarding/${id}/submit`
    );
    return response.data.data;
  },

  // Update onboarding status (Admin only)
  updateOnboardingStatus: async (
    id: string,
    status: string
  ): Promise<Onboarding> => {
    const response = await api.put<ApiResponse<Onboarding>>(
      `/onboarding/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  // Add admin note (Admin only)
  addAdminNote: async (id: string, note: string): Promise<Onboarding> => {
    const response = await api.post<ApiResponse<Onboarding>>(
      `/onboarding/${id}/notes`,
      { note }
    );
    return response.data.data;
  },

  // Delete onboarding (Admin only)
  deleteOnboarding: async (id: string): Promise<void> => {
    await api.delete(`/onboarding/${id}`);
  },

  // Get onboarding statistics (Admin only)
  getOnboardingStats: async (): Promise<OnboardingStats> => {
    const response = await api.get<ApiResponse<OnboardingStats>>(
      "/onboarding/stats"
    );
    return response.data.data;
  },
};

export default onboardingService;
