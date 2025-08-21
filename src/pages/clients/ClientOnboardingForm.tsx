import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ClientBasicInfo,
  ClientBusinessInfo,
  ClientDomainHosting,
  ClientDatabaseSystem,
  ClientBilling,
  ClientServiceSupport,
  ClientAutomationNotifications,
  ClientAttachmentsNotes,
  Client,
} from "../../types";
import clientService from "../../services/clientService";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../contexts/AuthContext";

// Step components
import BasicInfoStep from "./steps/BasicInfoStep";
import BusinessInfoStep from "./steps/BusinessInfoStep";
import DomainHostingStep from "./steps/DomainHostingStep";
import DatabaseSystemStep from "./steps/DatabaseSystemStep";
import BillingStep from "./steps/BillingStep";
import ServiceSupportStep from "./steps/ServiceSupportStep";
import AutomationNotificationsStep from "./steps/AutomationNotificationsStep";
import AttachmentsNotesStep from "./steps/AttachmentsNotesStep";

const ClientOnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { admin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [client, setClient] = useState<Client | null>(null);

  // Form data states for all 8 steps - WITH DEFAULT TEST DATA
  const [basicInfo, setBasicInfo] = useState<ClientBasicInfo>({
    businessName: "Test Business Ltd",
    ownerContactName: "John Doe",
    email: "john@testbusiness.com",
    phone: "9876543210",
    businessAddress: {
      street: "123 Test Street",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
      country: "India",
    },
    onboardingDate: new Date().toISOString().split("T")[0],
    assignedSalesRep: "689c44ae69e93dae4ba84a95", // Test admin ID
  });

  const [businessInfo, setBusinessInfo] = useState<ClientBusinessInfo>({
    businessType: "jewellery",
    businessCategory: "Gold Jewellery Store",
    businessDescription:
      "A traditional gold jewellery store specializing in custom designs and precious metals.",
  });

  const [domainHosting, setDomainHosting] = useState<ClientDomainHosting>({
    subdomain: "testbusiness",
    dnsStatus: "active",
    frontendHostingPlatform: "netlify",
    backendHostingPlatform: "render",
    sslCertificateStatus: "active",
    websiteTheme: "Modern E-commerce Theme",
  });

  const [databaseSystem, setDatabaseSystem] = useState<ClientDatabaseSystem>({
    databaseName: "testbusiness_db",
    connectionUri:
      "mongodb+srv://user:pass@cluster.mongodb.net/testbusiness_db",
    backupFrequency: "weekly",
    lastBackupDate: new Date().toISOString().split("T")[0],
    serverEnvironment: "Node.js 18.x",
    storageUsage: "2.5 GB",
    backendRepoLink: "https://github.com/testuser/testbusiness-backend",
  });

  const [billing, setBilling] = useState<ClientBilling>({
    setupCost: {
      paid: true,
      amount: 15000,
    },
    maintenanceFee: {
      amount: 2500,
      currency: "INR",
    },
    billingCycle: "monthly",
    lastPaymentDate: new Date().toISOString().split("T")[0],
    nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paymentMethod: "upi",
    pendingDues: {
      amount: 0,
      description: "No pending dues",
    },
  });

  const [serviceSupport, setServiceSupport] = useState<ClientServiceSupport>({
    supportTicketsCount: 3,
    ticketSystemLink: "https://support.testbusiness.com",
    lastSupportRequestDate: new Date().toISOString().split("T")[0],
    serviceLevel: "premium",
    customFeaturesRequested:
      "Custom payment gateway integration, Advanced analytics dashboard",
    previousIssuesHistory:
      "Minor SSL certificate renewal issue resolved in Q1 2024",
    ongoingIssues: "",
  });

  const [automationNotifications, setAutomationNotifications] =
    useState<ClientAutomationNotifications>({
      autoEmailAlerts: true,
      backupCompleted: true,
      paymentReminder: true,
      sslExpiry: true,
      domainRenewal: true,
      supportSlaReminder: true,
    });

  const [attachmentsNotes, setAttachmentsNotes] =
    useState<ClientAttachmentsNotes>({
      contractPdf: "/contracts/testbusiness_contract_2024.pdf",
      customDesignFiles:
        "Logo files, brand guidelines, custom icons stored in /assets/testbusiness/",
      clientSpecificInstructions:
        "Client prefers blue color scheme, requires mobile-first design approach",
      internalNotes:
        "High-priority client, excellent payment history, potential for upselling premium features",
    });

  useEffect(() => {
    if (id) {
      loadClient();
    }
  }, [id]);

  // Set assignedSalesRep when admin is available
  useEffect(() => {
    if (admin && !id) {
      setBasicInfo((prev) => ({
        ...prev,
        assignedSalesRep: admin._id,
      }));
    }
  }, [admin, id]);

  const loadClient = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const clientData = await clientService.getClientById(id);
      setClient(clientData);

      // Populate form data
      setBasicInfo({
        businessName: clientData.businessName,
        ownerContactName: clientData.ownerContactName,
        email: clientData.email,
        phone: clientData.phone,
        businessAddress: clientData.businessAddress,
        onboardingDate: clientData.onboardingDate?.split("T")[0] || "",
        assignedSalesRep: clientData.assignedSalesRep?._id || "",
      });

      setBusinessInfo({
        businessType: clientData.businessType,
        businessCategory: clientData.businessCategory || "",
        businessDescription: clientData.businessDescription || "",
      });

      setDomainHosting({
        subdomain: clientData.domainHosting.subdomain,
        dnsStatus: clientData.domainHosting.dnsStatus,
        frontendHostingPlatform:
          clientData.domainHosting.frontendHostingPlatform,
        backendHostingPlatform: clientData.domainHosting.backendHostingPlatform,
        sslCertificateStatus: clientData.domainHosting.sslCertificateStatus,
        websiteTheme: clientData.domainHosting.websiteTheme || "",
      });

      setDatabaseSystem({
        databaseName: clientData.databaseSystem.databaseName,
        connectionUri: clientData.databaseSystem.connectionUri,
        backupFrequency: clientData.databaseSystem.backupFrequency,
        lastBackupDate:
          clientData.databaseSystem.lastBackupDate?.split("T")[0] || "",
        serverEnvironment: clientData.databaseSystem.serverEnvironment || "",
        storageUsage: clientData.databaseSystem.storageUsage || "",
        backendRepoLink: clientData.databaseSystem.backendRepoLink || "",
      });

      setBilling({
        setupCost: clientData.billing.setupCost,
        maintenanceFee: clientData.billing.maintenanceFee,
        billingCycle: clientData.billing.billingCycle,
        lastPaymentDate:
          clientData.billing.lastPaymentDate?.split("T")[0] || "",
        nextPaymentDate:
          clientData.billing.nextPaymentDate?.split("T")[0] || "",
        paymentMethod: clientData.billing.paymentMethod,
        pendingDues: clientData.billing.pendingDues,
      });

      setServiceSupport({
        supportTicketsCount:
          clientData.serviceSupport.supportTicketsRaised.count,
        ticketSystemLink:
          clientData.serviceSupport.supportTicketsRaised.ticketSystemLink || "",
        lastSupportRequestDate:
          clientData.serviceSupport.lastSupportRequestDate?.split("T")[0] || "",
        serviceLevel: clientData.serviceSupport.serviceLevel,
        customFeaturesRequested:
          clientData.serviceSupport.customFeaturesRequested
            .map((f) => f.feature)
            .join(", "),
        previousIssuesHistory: clientData.serviceSupport.issuesHistory
          .map((i) => i.issue)
          .join(", "),
        ongoingIssues: clientData.serviceSupport.ongoingIssues
          .map((i) => i.issue)
          .join(", "),
      });

      setAutomationNotifications(clientData.automationNotifications);

      setAttachmentsNotes({
        contractPdf: clientData.attachmentsNotes.contractPdf?.filename || "",
        customDesignFiles: clientData.attachmentsNotes.customDesignFiles
          .map((f) => f.filename)
          .join(", "),
        clientSpecificInstructions:
          clientData.attachmentsNotes.clientSpecificInstructions || "",
        internalNotes: clientData.attachmentsNotes.internalNotes
          .map((n) => n.note)
          .join("\n"),
      });
    } catch (error) {
      console.error("Error loading client:", error);
      toast.error("Failed to load client data");
      navigate("/clients");
    } finally {
      setLoading(false);
    }
  };

  const saveClient = async () => {
    // Check if user is authenticated
    if (!admin) {
      toast.error("You must be logged in to save client data");
      return;
    }

    setSaving(true);
    try {
      const clientData = {
        // STEP 1: Basic Information
        businessName: basicInfo.businessName,
        ownerContactName: basicInfo.ownerContactName,
        email: basicInfo.email,
        phone: basicInfo.phone,
        businessAddress: basicInfo.businessAddress,
        onboardingDate: basicInfo.onboardingDate,
        assignedSalesRep: basicInfo.assignedSalesRep,

        // STEP 2: Business Information
        businessType: businessInfo.businessType,
        businessCategory: businessInfo.businessCategory,
        businessDescription: businessInfo.businessDescription,

        // STEP 3: Domain & Hosting Info
        domainHosting: domainHosting,

        // STEP 4: Database & System Info
        databaseSystem: databaseSystem,

        // STEP 5: Billing & Payment Info
        billing: billing,

        // STEP 6: Service & Support
        serviceSupport: serviceSupport,

        // STEP 7: Automation & Notifications
        automationNotifications: automationNotifications,

        // STEP 8: Attachments & Notes
        attachmentsNotes: attachmentsNotes,
      };

      let response: Client;
      if (id) {
        response = await clientService.updateClient(id, clientData);
        toast.success("Client updated successfully");
      } else {
        response = await clientService.createClient(clientData);
        toast.success("Client created successfully");
        navigate(`/clients/${response._id}/edit`, { replace: true });
      }

      setClient(response);
      return response;
    } catch (error: any) {
      console.error("Error saving client:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to save client";
      toast.error(errorMessage);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  // Validation functions for each step
  const validateStep1 = (): boolean => {
    const errors: string[] = [];
    if (!basicInfo.businessName.trim())
      errors.push("Business name is required");
    if (!basicInfo.ownerContactName.trim())
      errors.push("Owner/Contact name is required");
    if (!basicInfo.email.trim()) errors.push("Email is required");
    if (!basicInfo.phone.trim()) errors.push("Phone number is required");
    if (!basicInfo.businessAddress.street.trim())
      errors.push("Street address is required");
    if (!basicInfo.businessAddress.city.trim()) errors.push("City is required");
    if (!basicInfo.businessAddress.state.trim())
      errors.push("State is required");
    if (!basicInfo.businessAddress.pincode.trim())
      errors.push("Pincode is required");
    if (!basicInfo.onboardingDate) errors.push("Onboarding date is required");
    if (!basicInfo.assignedSalesRep)
      errors.push("Assigned sales rep is required");

    if (errors.length > 0) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    const errors: string[] = [];
    if (!businessInfo.businessType) errors.push("Business type is required");
    if (!businessInfo.businessCategory.trim())
      errors.push("Business category is required");
    if (!businessInfo.businessDescription.trim())
      errors.push("Business description is required");

    if (errors.length > 0) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    const errors: string[] = [];
    if (!domainHosting.subdomain.trim()) errors.push("Subdomain is required");
    if (!domainHosting.dnsStatus) errors.push("DNS status is required");
    if (!domainHosting.frontendHostingPlatform)
      errors.push("Frontend hosting platform is required");
    if (!domainHosting.backendHostingPlatform)
      errors.push("Backend hosting platform is required");
    if (!domainHosting.sslCertificateStatus)
      errors.push("SSL certificate status is required");
    if (!domainHosting.websiteTheme.trim())
      errors.push("Website theme is required");

    if (errors.length > 0) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep4 = (): boolean => {
    const errors: string[] = [];
    if (!databaseSystem.databaseName.trim())
      errors.push("Database name is required");
    if (!databaseSystem.connectionUri.trim())
      errors.push("Database connection URI is required");
    if (!databaseSystem.backupFrequency)
      errors.push("Backup frequency is required");
    if (!databaseSystem.lastBackupDate)
      errors.push("Last backup date is required");
    if (!databaseSystem.serverEnvironment.trim())
      errors.push("Server environment is required");
    if (!databaseSystem.storageUsage.trim())
      errors.push("Storage usage is required");
    if (!databaseSystem.backendRepoLink.trim())
      errors.push("Backend repository link is required");

    if (errors.length > 0) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep5 = (): boolean => {
    const errors: string[] = [];
    if (billing.setupCost.paid === undefined)
      errors.push("Setup cost paid status is required");
    if (!billing.setupCost.amount && billing.setupCost.amount !== 0)
      errors.push("Setup cost amount is required");
    if (!billing.maintenanceFee.amount && billing.maintenanceFee.amount !== 0)
      errors.push("Maintenance fee amount is required");
    if (!billing.billingCycle) errors.push("Billing cycle is required");
    if (!billing.lastPaymentDate) errors.push("Last payment date is required");
    if (!billing.nextPaymentDate) errors.push("Next payment date is required");
    if (!billing.paymentMethod) errors.push("Payment method is required");
    if (billing.pendingDues.amount === undefined)
      errors.push("Pending dues amount is required");

    if (errors.length > 0) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep6 = (): boolean => {
    const errors: string[] = [];
    if (serviceSupport.supportTicketsCount === undefined)
      errors.push("Support tickets count is required");
    if (!serviceSupport.ticketSystemLink.trim())
      errors.push("Ticket system link is required");
    if (!serviceSupport.lastSupportRequestDate)
      errors.push("Last support request date is required");
    if (!serviceSupport.serviceLevel) errors.push("Service level is required");
    if (!serviceSupport.customFeaturesRequested.trim())
      errors.push("Custom features requested is required");
    if (!serviceSupport.previousIssuesHistory.trim())
      errors.push("Previous issues history is required");

    if (errors.length > 0) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep7 = (): boolean => {
    const errors: string[] = [];
    if (automationNotifications.autoEmailAlerts === undefined)
      errors.push("Auto email alerts setting is required");
    if (automationNotifications.backupCompleted === undefined)
      errors.push("Backup completed notification setting is required");
    if (automationNotifications.paymentReminder === undefined)
      errors.push("Payment reminder setting is required");
    if (automationNotifications.sslExpiry === undefined)
      errors.push("SSL expiry notification setting is required");
    if (automationNotifications.domainRenewal === undefined)
      errors.push("Domain renewal notification setting is required");
    if (automationNotifications.supportSlaReminder === undefined)
      errors.push("Support SLA reminder setting is required");

    if (errors.length > 0) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const validateStep8 = (): boolean => {
    const errors: string[] = [];
    if (!attachmentsNotes.contractPdf.trim())
      errors.push("Contract PDF is required");
    if (!attachmentsNotes.customDesignFiles.trim())
      errors.push("Custom design files info is required");
    if (!attachmentsNotes.clientSpecificInstructions.trim())
      errors.push("Client specific instructions are required");
    if (!attachmentsNotes.internalNotes.trim())
      errors.push("Internal notes are required");

    if (errors.length > 0) {
      toast.error(`Please fill all required fields: ${errors.join(", ")}`);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      case 5:
        isValid = validateStep5();
        break;
      case 6:
        isValid = validateStep6();
        break;
      case 7:
        isValid = validateStep7();
        break;
      case 8:
        isValid = validateStep8();
        break;
      default:
        isValid = true;
    }

    if (isValid && currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitClient = async () => {
    try {
      await saveClient();
      toast.success("Client onboarding completed successfully!");
      navigate("/clients");
    } catch (error) {
      // Error already handled in saveClient
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const steps = [
    { number: 1, title: "Basic Information" },
    { number: 2, title: "Business Information" },
    { number: 3, title: "Domain & Hosting" },
    { number: 4, title: "Database & System" },
    { number: 5, title: "Billing & Payment" },
    { number: 6, title: "Service & Support" },
    { number: 7, title: "Automation & Notifications" },
    { number: 8, title: "Attachments & Notes" },
  ];

  return (
    <div className="py-4">
      <div className="max-w-6xl mx-auto px-3 lg:px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {id ? "Edit Client" : "Client Onboarding"}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Complete all 8 steps for comprehensive client management
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer ${
                    step.number === currentStep
                      ? "border-blue-500 bg-blue-500 text-white"
                      : step.number < currentStep
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  {step.number < currentStep ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      step.number === currentStep
                        ? "text-blue-600 dark:text-blue-400"
                        : step.number < currentStep
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 h-px bg-gray-300 dark:bg-gray-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          {currentStep === 1 && (
            <BasicInfoStep data={basicInfo} onChange={setBasicInfo} />
          )}

          {currentStep === 2 && (
            <BusinessInfoStep data={businessInfo} onChange={setBusinessInfo} />
          )}

          {currentStep === 3 && (
            <DomainHostingStep
              data={domainHosting}
              onChange={setDomainHosting}
            />
          )}

          {currentStep === 4 && (
            <DatabaseSystemStep
              data={databaseSystem}
              onChange={setDatabaseSystem}
            />
          )}

          {currentStep === 5 && (
            <BillingStep data={billing} onChange={setBilling} />
          )}

          {currentStep === 6 && (
            <ServiceSupportStep
              data={serviceSupport}
              onChange={setServiceSupport}
            />
          )}

          {currentStep === 7 && (
            <AutomationNotificationsStep
              data={automationNotifications}
              onChange={setAutomationNotifications}
            />
          )}

          {currentStep === 8 && (
            <AttachmentsNotesStep
              data={attachmentsNotes}
              onChange={setAttachmentsNotes}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={saveClient}
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                {saving ? "Saving..." : "Save Draft"}
              </button>

              {currentStep < 8 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitClient}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Submitting..." : "Complete Onboarding"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOnboardingForm;
