
import { createContext, ReactNode, useContext, useState } from "react";
import { FormData, WizardContextType } from "../types/financialPlanner";
import { useToast } from "@/hooks/use-toast";

const FinancialPlannerContext = createContext<WizardContextType | undefined>(undefined);

const defaultFormData: FormData = {
  fullName: '',
  age: 30,
  maritalStatus: '',
  
  primaryIncome: 3000,
  additionalIncome: '',
  salaryFrequency: '',
  
  rent: '',
  utilities: '',
  loans: '',
  groceries: '',
  entertainment: '',
  hasDebt: false,
  debtDetails: '',
  
  currentSavings: '',
  currentInvestments: '',
  investmentAmount: '',
  riskTolerance: 5,
  
  shortTermGoals: '',
  mediumTermGoals: '',
  longTermGoals: '',
  targetAmount: '',
  targetDate: '',
  
  additionalComments: ''
};

export const FinancialPlannerProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'maritalStatus' && value === 'Single') {
      setCurrentStep(1);
    }
    
    if (name === 'hasDebt' && value === 'false') {
      setFormData(prev => ({ ...prev, hasDebt: false }));
    } else if (name === 'hasDebt' && value === 'true') {
      setFormData(prev => ({ ...prev, hasDebt: true }));
    }
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, targetDate: date }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);
    
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError("Please upload a PDF or image file (JPEG, PNG)");
      setFile(null);
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB");
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  };
  
  const handleSubmit = () => {
    if (!file) {
      setFileError("Please upload your passbook");
      return;
    }
    
    console.log("Form data:", formData);
    console.log("File:", file);
    
    toast({
      title: "Financial plan request submitted",
      description: "Our AI is now processing your information. We'll notify you when your personalized plan is ready.",
    });
    
    setCurrentStep(0);
    setFormData(defaultFormData);
    setFile(null);
  };
  
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };
  
  const getRiskLevel = (value: number) => {
    if (value <= 3) return "Low Risk";
    if (value <= 7) return "Medium Risk";
    return "High Risk";
  };

  const value: WizardContextType = {
    formData,
    setFormData,
    file,
    setFile,
    fileError,
    setFileError,
    currentStep,
    setCurrentStep,
    handleInputChange,
    handleSelectChange,
    handleSliderChange,
    handleDateChange,
    handleFileChange,
    handleSubmit,
    nextStep,
    prevStep,
    formatCurrency,
    getRiskLevel
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
