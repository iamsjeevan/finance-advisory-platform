import { Dispatch, SetStateAction } from "react";

export interface FormData {
  // Personal
  fullName: string;
  age: number;
  maritalStatus: string;
  
  // Income
  primaryIncome: number;
  additionalIncome: string;
  salaryFrequency: string;
  
  // Expenses
  rent: string;
  utilities: string;
  loans: string;
  groceries: string;
  entertainment: string;
  hasDebt: boolean;
  debtDetails: string;
  
  // Investments
  currentSavings: string;
  currentInvestments: string;
  investmentAmount: string;
  riskTolerance: number;
  
  // Goals
  shortTermGoals: string;
  mediumTermGoals: string;
  longTermGoals: string;
  targetAmount: string;
  targetDate: string | Date;
  
  // Documents
  additionalComments: string;
}

export interface StepComponentProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSliderChange: (name: string, value: number[]) => void;
  handleDateChange: (date: Date | undefined) => void;
  formatCurrency: (value: number) => string;
  getRiskLevel: (value: number) => string;
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface WizardContextType {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  fileError: string | null;
  setFileError: Dispatch<SetStateAction<string | null>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSliderChange: (name: string, value: number[]) => void;
  handleDateChange: (date: Date | undefined) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  resetForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  formatCurrency: (value: number) => string;
  getRiskLevel: (value: number) => string;
}
