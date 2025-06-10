import { createContext, ReactNode, useContext, useState } from "react";
import { FormData, WizardContextType } from "../types/financialPlanner";
import { useToast } from "@/hooks/use-toast";
import { WIZARD_STEPS } from "@/constants/financialPlannerSteps";

const FinancialPlannerContext = createContext<WizardContextType | undefined>(undefined);

const defaultFormData: FormData = {
  fullName: '',
  age: 30,
  maritalStatus: 'Single',
  
  primaryIncome: 50000,  // Changed to Indian amount
  additionalIncome: '0',
  salaryFrequency: 'Monthly',
  
  rent: '15000',         // Changed to Indian amount
  utilities: '2500',     // Changed to Indian amount
  loans: '8000',         // Changed to Indian amount
  groceries: '6000',     // Changed to Indian amount
  entertainment: '3000', // Changed to Indian amount
  hasDebt: false,
  debtDetails: '',
  
  currentSavings: '200000',    // Changed to Indian amount
  currentInvestments: '',
  investmentAmount: '10000',   // Changed to Indian amount
  riskTolerance: 5,
  
  shortTermGoals: '',
  mediumTermGoals: '',
  longTermGoals: '',
  targetAmount: '500000',      // Changed to Indian amount
  targetDate: '',
  
  additionalComments: ''
};

export const FinancialPlannerProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    const isBool = value === 'true' || value === 'false';
    setFormData(prev => ({ 
      ...prev, 
      [name]: isBool ? (value === 'true') : value 
    }));
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, targetDate: date || '' }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);
    if (!selectedFile) {
      setFile(null);
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB");
      return;
    }
    setFile(selectedFile);
  };
  
  const handleSubmit = () => {
    console.log("Final Form Data Submitted:", formData);
    setShowResults(true);
    toast({
      title: "Summary Generated",
      description: "Review your financial information below.",
    });
  };
  
  const resetForm = () => {
    setCurrentStep(0);
    setFormData(defaultFormData);
    setFile(null);
    setShowResults(false);
  };
  
  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };
  
  const getRiskLevel = (value: number) => {
    if (value <= 3) return "Low";
    if (value <= 7) return "Medium";
    return "High";
  };

  const value: WizardContextType = {
    formData, setFormData,
    file, setFile,
    fileError, setFileError,
    currentStep, setCurrentStep,
    showResults, setShowResults,
    handleInputChange, handleSelectChange, handleSliderChange,
    handleDateChange, handleFileChange,
    handleSubmit, resetForm,
    nextStep, prevStep,
    formatCurrency, getRiskLevel
  };

  return (
    <FinancialPlannerContext.Provider value={value}>
      {children}
    </FinancialPlannerContext.Provider>
  );
};

export const useFinancialPlanner = () => {
  const context = useContext(FinancialPlannerContext);
  if (context === undefined) {
    throw new Error('useFinancialPlanner must be used within a FinancialPlannerProvider');
  }
  return context;
};
