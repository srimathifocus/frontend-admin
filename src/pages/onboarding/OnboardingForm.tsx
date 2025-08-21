import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Onboarding,
  PersonalDetails,
  BusinessDetails,
  PlanDetails,
  PaymentDetails,
} from "../../types";
import onboardingService from "../../services/onboardingService";
import LoadingSpinner from "../../components/LoadingSpinner";

// Step components
import PersonalDetailsStep from "./steps/PersonalDetailsStep";
import BusinessDetailsStep from "./steps/BusinessDetailsStep";
import PlanDetailsStep from "./steps/PlanDetailsStep";
import PaymentDetailsStep from "./steps/PaymentDetailsStep";
import NotesStep from "./steps/NotesStep";

const OnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [onboarding, setOnboarding] = useState<Onboarding | null>(null);
  const [districts, setDistricts] = useState<string[]>([]);

  // Form data states
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: "",
    fatherName: "",
    address: "",
    state: "Tamil Nadu",
    district: "",
    phoneNumber1: "",
    phoneNumber2: "",
    nomineeName: "",
  });

  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    businessName: "",
    address: "",
    state: "",
    district: "",
    phoneNumber: "",
    gstNumber: "",
    businessDescription: "",
    businessSize: "Small",
    yearsOfBusiness: 0,
  });

  const [planDetails, setPlanDetails] = useState<PlanDetails>({
    accessType: "Lifetime Access",
    maintenanceFrequency: "Yearly",
    customPricing: false,
    pricingData: {
      customFeatures: "",
      expectedUsers: "",
      expectedTransactions: "",
      specialRequirements: "",
    },
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    planPrice: 0,
    projectPrice: 0,
    hostingYearlyPrice: 0,
    additionalCosts: {
      constant: 0,
      hosting: 0,
      domain: 0,
      storage: 0,
      maintenance: 0,
      websiteCost: 0,
    },
    totalAmount: 0,
  });

  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadDistricts();
    if (id) {
      loadOnboarding();
    }
  }, [id]);

  const loadDistricts = async () => {
    try {
      const districtsData = await onboardingService.getDistricts();
      setDistricts(districtsData);
    } catch (error) {
      console.error("Error loading districts:", error);
      toast.error("Failed to load districts");
    }
  };

  const loadOnboarding = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const data = await onboardingService.getOnboardingById(id);
      setOnboarding(data);
      setCurrentStep(data.currentStep);

      // Populate form data
      if (data.personalDetails) setPersonalDetails(data.personalDetails);
      if (data.businessDetails) setBusinessDetails(data.businessDetails);
      if (data.planDetails) setPlanDetails(data.planDetails);
      if (data.paymentDetails) setPaymentDetails(data.paymentDetails);
      if (data.notes) setNotes(data.notes);
    } catch (error) {
      console.error("Error loading onboarding:", error);
      toast.error("Failed to load onboarding data");
      navigate("/onboarding");
    } finally {
      setLoading(false);
    }
  };

  const saveStep = async (stepNumber: number, stepData: any) => {
    setSaving(true);
    try {
      let response: Onboarding;

      if (id) {
        // Update existing onboarding step
        response = await onboardingService.updateOnboardingStep(
          id,
          stepNumber,
          stepData
        );
      } else {
        // Create new onboarding
        const newOnboardingData = {
          personalDetails: stepNumber === 1 ? stepData : personalDetails,
          businessDetails: stepNumber === 2 ? stepData : businessDetails,
          planDetails: stepNumber === 3 ? stepData : planDetails,
          paymentDetails: stepNumber === 4 ? stepData : paymentDetails,
          notes: stepNumber === 5 ? stepData.notes : notes,
          currentStep: stepNumber,
          completedSteps: [stepNumber],
        };

        response = await onboardingService.createOnboarding(newOnboardingData);
        // Update URL to edit mode without navigating away from form
        navigate(`/onboarding/${response._id}/edit`, { replace: true });
      }

      setOnboarding(response);
      toast.success(`Step ${stepNumber} saved successfully`);
      return response;
    } catch (error: any) {
      console.error("Error saving step:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to save step";
      toast.error(errorMessage);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const nextStep = async () => {
    try {
      let stepData: any;

      switch (currentStep) {
        case 1:
          stepData = personalDetails;
          break;
        case 2:
          stepData = businessDetails;
          break;
        case 3:
          stepData = planDetails;
          break;
        case 4:
          stepData = paymentDetails;
          break;
        case 5:
          stepData = { notes };
          break;
        default:
          return;
      }

      await saveStep(currentStep, stepData);

      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      // Error already handled in saveStep
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitOnboarding = async () => {
    if (!id) {
      toast.error("Please save your progress first");
      return;
    }

    setSaving(true);
    try {
      await onboardingService.submitOnboarding(id);
      toast.success("Onboarding submitted successfully!");
      navigate("/onboarding/success");
    } catch (error: any) {
      console.error("Error submitting onboarding:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit onboarding";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const calculateTotal = () => {
    const { planPrice, projectPrice, hostingYearlyPrice, additionalCosts } =
      paymentDetails;
    const additionalTotal = Object.values(additionalCosts).reduce(
      (sum, cost) => sum + (cost || 0),
      0
    );
    return planPrice + projectPrice + hostingYearlyPrice + additionalTotal;
  };

  useEffect(() => {
    const total = calculateTotal();
    if (total !== paymentDetails.totalAmount) {
      setPaymentDetails((prev) => ({ ...prev, totalAmount: total }));
    }
  }, [
    paymentDetails.planPrice,
    paymentDetails.projectPrice,
    paymentDetails.hostingYearlyPrice,
    paymentDetails.additionalCosts,
  ]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const steps = [
    {
      number: 1,
      title: "Personal Details",
      completed: onboarding?.completedSteps.includes(1) || false,
    },
    {
      number: 2,
      title: "Business Details",
      completed: onboarding?.completedSteps.includes(2) || false,
    },
    {
      number: 3,
      title: "Plan Details",
      completed: onboarding?.completedSteps.includes(3) || false,
    },
    {
      number: 4,
      title: "Payment Details",
      completed: onboarding?.completedSteps.includes(4) || false,
    },
    {
      number: 5,
      title: "Notes (Optional)",
      completed: onboarding?.completedSteps.includes(5) || false,
    },
  ];

  const canSubmit =
    onboarding?.completedSteps.includes(1) &&
    onboarding?.completedSteps.includes(2) &&
    onboarding?.completedSteps.includes(3) &&
    onboarding?.completedSteps.includes(4);

  return (
    <div className="py-4">
      <div className="max-w-4xl mx-auto px-3 lg:px-4">
        {/* Header (smaller) */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Client Onboarding
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Complete all steps to submit your onboarding request
          </p>
        </div>

        {/* Progress Steps (compact) */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                    step.number === currentStep
                      ? "border-blue-500 bg-blue-500 text-white"
                      : step.completed
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {step.completed ? (
                    <svg
                      className="w-4 h-4"
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
                <div className="ml-2 hidden sm:block">
                  <p
                    className={`text-xs font-medium ${
                      step.number === currentStep
                        ? "text-blue-600 dark:text-blue-400"
                        : step.completed
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 h-px bg-gray-300 dark:bg-gray-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content - Step by Step */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          {currentStep === 1 && (
            <PersonalDetailsStep
              data={personalDetails}
              onChange={setPersonalDetails}
              districts={districts}
            />
          )}

          {currentStep === 2 && (
            <BusinessDetailsStep
              data={businessDetails}
              onChange={setBusinessDetails}
              districts={districts}
            />
          )}

          {currentStep === 3 && (
            <PlanDetailsStep data={planDetails} onChange={setPlanDetails} />
          )}

          {currentStep === 4 && (
            <PaymentDetailsStep
              data={paymentDetails}
              onChange={setPaymentDetails}
              planDetails={planDetails}
            />
          )}

          {currentStep === 5 && <NotesStep data={notes} onChange={setNotes} />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={saving}
                  className="px-3 py-2 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save & Continue"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => saveStep(5, { notes })}
                    disabled={saving}
                    className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    {saving ? "Saving..." : "Save Notes"}
                  </button>
                  <button
                    type="button"
                    onClick={submitOnboarding}
                    disabled={!canSubmit || saving}
                    className="px-3 py-2 text-xs font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Submitting..." : "Submit Onboarding"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status Information (compact) */}
        {onboarding && (
          <div className="mt-4 rounded-lg p-3 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Status:</strong> {onboarding.status} |{" "}
              <strong>Completed Steps:</strong>{" "}
              {onboarding.completedSteps.length}/4 required
              {onboarding.status === "Draft" && !canSubmit && (
                <span className="ml-2 text-orange-600 dark:text-orange-400">
                  (Complete all required steps to submit)
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;
