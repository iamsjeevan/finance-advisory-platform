#!/bin/bash

echo "🚀 Starting to overwrite AI Financial Planner files with the latest corrected code..."
echo "This will replace the contents of 15 files. Your git history will allow you to revert."
echo "------------------------------------------------------------------------------------"

# 1. Type Definitions
echo "✅ Overwriting src/types/financialPlanner.ts..."
cat << 'EOF' > src/types/financialPlanner.ts
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
EOF

# 2. Step Constants
echo "✅ Overwriting src/constants/financialPlannerSteps.tsx..."
cat << 'EOF' > src/constants/financialPlannerSteps.tsx
import { 
  BarChart, 
  DollarSign, 
  FileText, 
  Home, 
  PiggyBank, 
  Target 
} from "lucide-react";
import { WizardStep } from "@/types/financialPlanner";

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'personal',
    title: 'Personal',
    description: 'Tell us about yourself',
    icon: <Home className="h-5 w-5" />
  },
  {
    id: 'income',
    title: 'Income',
    description: 'Your monthly earnings',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    id: 'expenses',
    title: 'Expenses',
    description: 'Your monthly spending',
    icon: <BarChart className="h-5 w-5" />
  },
  {
    id: 'investments',
    title: 'Investments',
    description: 'Your financial assets',
    icon: <PiggyBank className="h-5 w-5" />
  },
  {
    id: 'goals',
    title: 'Goals',
    description: 'What you want to achieve',
    icon: <Target className="h-5 w-5" />
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Additional details',
    icon: <FileText className="h-5 w-5" />
  }
];
EOF

# 3. Context
echo "✅ Overwriting src/context/FinancialPlannerContext.tsx..."
cat << 'EOF' > src/context/FinancialPlannerContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";
import { FormData, WizardContextType } from "../types/financialPlanner";
import { useToast } from "@/hooks/use-toast";
import { WIZARD_STEPS } from "@/constants/financialPlannerSteps";

const FinancialPlannerContext = createContext<WizardContextType | undefined>(undefined);

const defaultFormData: FormData = {
  fullName: '',
  age: 30,
  maritalStatus: 'Single',
  
  primaryIncome: 5000,
  additionalIncome: '0',
  salaryFrequency: 'Monthly',
  
  rent: '1500',
  utilities: '250',
  loans: '300',
  groceries: '400',
  entertainment: '150',
  hasDebt: false,
  debtDetails: '',
  
  currentSavings: '10000',
  currentInvestments: '',
  investmentAmount: '500',
  riskTolerance: 5,
  
  shortTermGoals: '',
  mediumTermGoals: '',
  longTermGoals: '',
  targetAmount: '25000',
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
    return `$${Number(value || 0).toLocaleString()}`;
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
EOF

# 4. Wizard Step Components
echo "✅ Overwriting Step Components..."
cat << 'EOF' > src/components/financial-planner/StepHeader.tsx
import { ReactNode } from "react";

interface StepHeaderProps {
  icon: ReactNode;
  title: string;
}

export const StepHeader = ({ icon, title }: StepHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};
EOF

cat << 'EOF' > src/components/financial-planner/PersonalDetailsStep.tsx
import { Home } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const PersonalDetailsStep = ({ formData, handleInputChange, handleSelectChange, handleSliderChange }: StepComponentProps) => {
  return (
    <div className="space-y-6">
      <StepHeader icon={<Home className="h-5 w-5 text-primary" />} title="Personal Details" />
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" />
        </div>
        <div>
          <Label htmlFor="age" className="mb-2 block">Age: {formData.age}</Label>
          <Slider id="age" min={18} max={100} step={1} value={[formData.age]} onValueChange={(value) => handleSliderChange('age', value)} />
        </div>
        <div>
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select onValueChange={(value) => handleSelectChange('maritalStatus', value)} value={formData.maritalStatus}>
            <SelectTrigger id="maritalStatus"><SelectValue placeholder="Select marital status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > src/components/financial-planner/IncomeDetailsStep.tsx
import { DollarSign } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const IncomeDetailsStep = ({ formData, handleInputChange, handleSelectChange, handleSliderChange, formatCurrency }: StepComponentProps) => {
  return (
    <div className="space-y-6">
      <StepHeader icon={<DollarSign className="h-5 w-5 text-primary" />} title="Income Details" />
      <div className="space-y-4">
        <div>
          <Label htmlFor="primaryIncome" className="mb-2 block">Primary Income (Monthly): {formatCurrency(formData.primaryIncome)}</Label>
          <Slider id="primaryIncome" min={500} max={25000} step={100} value={[formData.primaryIncome]} onValueChange={(value) => handleSliderChange('primaryIncome', value)} />
        </div>
        <div>
          <Label htmlFor="additionalIncome">Additional Income (Monthly)</Label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span><Input id="additionalIncome" name="additionalIncome" className="pl-8" type="number" value={formData.additionalIncome} onChange={handleInputChange} placeholder="0"/></div>
        </div>
        <div>
          <Label htmlFor="salaryFrequency">Salary Frequency</Label>
          <Select onValueChange={(value) => handleSelectChange('salaryFrequency', value)} value={formData.salaryFrequency}>
            <SelectTrigger id="salaryFrequency"><SelectValue placeholder="Select frequency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > src/components/financial-planner/ExpenseDetailsStep.tsx
import { BarChart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const ExpenseDetailsStep = ({ formData, handleInputChange, handleSelectChange }: StepComponentProps) => {
  return (
    <div className="space-y-6">
      <StepHeader 
        icon={<BarChart className="h-5 w-5 text-primary" />} 
        title="Expense Details" 
      />
      <div className="space-y-4">
        <h3 className="text-base font-medium">Monthly Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rent">Rent/Mortgage</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="rent" name="rent" className="pl-8" type="number" value={formData.rent} onChange={handleInputChange} placeholder="0"/>
            </div>
          </div>
          <div>
            <Label htmlFor="utilities">Utilities</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="utilities" name="utilities" className="pl-8" type="number" value={formData.utilities} onChange={handleInputChange} placeholder="0"/>
            </div>
          </div>
          <div>
            <Label htmlFor="loans">Loan Repayments</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="loans" name="loans" className="pl-8" type="number" value={formData.loans} onChange={handleInputChange} placeholder="0"/>
            </div>
          </div>
          <div>
            <Label htmlFor="groceries">Groceries</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="groceries" name="groceries" className="pl-8" type="number" value={formData.groceries} onChange={handleInputChange} placeholder="0"/>
            </div>
          </div>
          <div>
            <Label htmlFor="entertainment">Entertainment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="entertainment" name="entertainment" className="pl-8" type="number" value={formData.entertainment} onChange={handleInputChange} placeholder="0"/>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <Label htmlFor="hasDebt">Do you have any other debt (e.g., credit cards)?</Label>
          <Select onValueChange={(value) => handleSelectChange('hasDebt', value)} value={String(formData.hasDebt)}>
            <SelectTrigger id="hasDebt"><SelectValue placeholder="Select option" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.hasDebt && (
          <div>
            <Label htmlFor="debtDetails">Debt Details</Label>
            <Textarea id="debtDetails" name="debtDetails" value={formData.debtDetails} onChange={handleInputChange} placeholder="List your debts with amounts and interest rates" />
          </div>
        )}
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > src/components/financial-planner/InvestmentsStep.tsx
import { PiggyBank } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const InvestmentsStep = ({ formData, handleInputChange, handleSliderChange, getRiskLevel }: StepComponentProps) => {
  return (
    <div className="space-y-6">
      <StepHeader 
        icon={<PiggyBank className="h-5 w-5 text-primary" />} 
        title="Investment & Savings" 
      />
      <div className="space-y-4">
        <div>
          <Label htmlFor="currentSavings">Current Savings</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input id="currentSavings" name="currentSavings" type="number" className="pl-8" value={formData.currentSavings} onChange={handleInputChange} placeholder="0"/>
          </div>
        </div>
        <div>
          <Label htmlFor="investmentAmount">Amount to Invest Monthly</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input id="investmentAmount" name="investmentAmount" type="number" className="pl-8" value={formData.investmentAmount} onChange={handleInputChange} placeholder="0"/>
          </div>
        </div>
        <div>
          <Label htmlFor="currentInvestments">Current Investments</Label>
          <Textarea id="currentInvestments" name="currentInvestments" value={formData.currentInvestments} onChange={handleInputChange} placeholder="List current investments (stocks, mutual funds, real estate)" />
        </div>
        <div>
          <Label htmlFor="riskTolerance" className="mb-2 block">Risk Tolerance: {getRiskLevel(formData.riskTolerance)} ({formData.riskTolerance}/10)</Label>
          <Slider id="riskTolerance" min={1} max={10} step={1} value={[formData.riskTolerance]} onValueChange={(value) => handleSliderChange('riskTolerance', value)} />
        </div>
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > src/components/financial-planner/FinancialGoalsStep.tsx
import { Target } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const FinancialGoalsStep = ({ formData, handleInputChange }: StepComponentProps) => {
  return (
    <div className="space-y-6">
      <StepHeader 
        icon={<Target className="h-5 w-5 text-primary" />} 
        title="Financial Goals" 
      />
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="shortTermGoals">Short-term Goals (< 1 year)</Label>
          <Textarea 
            id="shortTermGoals" 
            name="shortTermGoals" 
            value={formData.shortTermGoals} 
            onChange={handleInputChange} 
            placeholder="e.g., Build an emergency fund, go on a vacation" 
          />
        </div>
        
        <div>
          <Label htmlFor="mediumTermGoals">Medium-term Goals (1-5 years)</Label>
          <Textarea 
            id="mediumTermGoals" 
            name="mediumTermGoals" 
            value={formData.mediumTermGoals} 
            onChange={handleInputChange} 
            placeholder="e.g., Save for a car, home down payment" 
          />
        </div>
        
        <div>
          <Label htmlFor="longTermGoals">Long-term Goals (5+ years)</Label>
          <Textarea 
            id="longTermGoals" 
            name="longTermGoals" 
            value={formData.longTermGoals} 
            onChange={handleInputChange} 
            placeholder="e.g., Retirement, child's education" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <Label htmlFor="targetAmount">Primary Goal Target Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input 
                id="targetAmount" 
                name="targetAmount" 
                type="number" 
                className="pl-8" 
                value={formData.targetAmount} 
                onChange={handleInputChange} 
                placeholder="0"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="targetDate">Primary Goal Target Year</Label>
            <Input 
              id="targetDate" 
              name="targetDate" 
              type="number" 
              min={new Date().getFullYear()} 
              max={new Date().getFullYear() + 50} 
              placeholder={String(new Date().getFullYear() + 5)} 
              value={formData.targetDate instanceof Date ? formData.targetDate.getFullYear() : formData.targetDate} 
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
EOF

cat << 'EOF' > src/components/financial-planner/DocumentsStep.tsx
import { FileText, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";
import React from "react";

export const DocumentsStep = ({ formData, handleInputChange }: StepComponentProps) => {
  const { file, fileError, handleFileChange } = useFinancialPlanner();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <StepHeader icon={<FileText className="h-5 w-5 text-primary" />} title="Documents & Additional Information" />
      <div className="space-y-4">
        <div>
          <Label htmlFor="passbook" className="flex items-center gap-2 mb-2">Passbook/Bank Statement (Optional)</Label>
          <div className="border-2 border-dashed rounded-md px-6 py-8 text-center">
            <Input ref={fileInputRef} id="passbook" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"/>
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="mb-1 font-medium">Drag & drop or click to upload</p>
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>Select File</Button>
              {file && (<div className="mt-4 px-4 py-2 bg-muted rounded-md flex items-center"><FileText className="h-4 w-4 mr-2" /><span className="text-sm truncate max-w-[200px]">{file.name}</span></div>)}
              {fileError && (<p className="mt-2 text-sm text-destructive">{fileError}</p>)}
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="additionalComments">Additional Comments</Label>
          <Textarea id="additionalComments" name="additionalComments" value={formData.additionalComments} onChange={handleInputChange} placeholder="Anything else we should know?"/>
        </div>
      </div>
    </div>
  );
};
EOF

# 5. Wizard UI and Navigation
echo "✅ Overwriting Wizard UI components..."
cat << 'EOF' > src/components/financial-planner/WizardProgress.tsx
import { cn } from "@/lib/utils";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { WIZARD_STEPS } from "@/constants/financialPlannerSteps";

export const WizardProgress = () => {
  const { currentStep } = useFinancialPlanner();
  
  return (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {WIZARD_STEPS.map((step, index) => (
          <li key={step.id} className={cn("flex w-full items-center", { "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block": index !== WIZARD_STEPS.length - 1, "after:border-primary": index < currentStep, "after:border-muted": index >= currentStep })}>
            <div className="flex flex-col items-center">
              <span className={cn("flex items-center justify-center w-10 h-10 rounded-full shrink-0", { "bg-primary text-primary-foreground": currentStep === index, "bg-primary/20 text-primary": index < currentStep, "bg-muted text-muted-foreground": index > currentStep })}>
                {step.icon}
              </span>
              <span className={cn("text-xs mt-2 font-medium text-center", { "text-primary": currentStep >= index, "text-muted-foreground": currentStep < index })}>{step.title}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
EOF

cat << 'EOF' > src/components/financial-planner/WizardNavigation.tsx
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { WIZARD_STEPS } from "@/constants/financialPlannerSteps";

export const WizardNavigation = () => {
  const { currentStep, nextStep, prevStep, handleSubmit } = useFinancialPlanner();
  
  return (
    <div className="flex justify-between pt-8 mt-4 border-t">
      <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
        <ChevronLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      {currentStep < WIZARD_STEPS.length - 1 ? (
        <Button type="button" onClick={nextStep}>
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button type="button" onClick={handleSubmit}>
          Generate Summary <Sparkles className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
EOF

# 6. Results Page
echo "✅ Overwriting PlannerResults.tsx..."
cat << 'EOF' > src/components/financial-planner/PlannerResults.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, PiggyBank, DollarSign, Target, Home, BarChart, FileText } from "lucide-react";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { Separator } from "@/components/ui/separator";

export const PlannerResults = () => {
  const { formData, resetForm, getRiskLevel, formatCurrency } = useFinancialPlanner();

  // --- Calculations based purely on user input ---
  const totalIncome = (formData.primaryIncome || 0) + (Number(formData.additionalIncome) || 0);
  const totalExpenses = 
    (Number(formData.rent) || 0) + (Number(formData.utilities) || 0) + (Number(formData.loans) || 0) +
    (Number(formData.groceries) || 0) + (Number(formData.entertainment) || 0);
  const monthlySavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((monthlySavings / totalIncome) * 100).toFixed(0) : 0;

  // --- Display helper functions ---
  const renderField = (label: string, value: string | number | boolean | Date) => {
    const displayValue = value === '' || value === null || value === undefined ? <span className="text-muted-foreground">Not Provided</span> : String(value);
    return (<div className="flex justify-between items-center text-sm"><p className="text-muted-foreground">{label}</p><p className="font-medium text-right">{displayValue}</p></div>);
  };
  const renderTextArea = (label: string, value: string) => (<div className="text-sm"><p className="font-medium text-muted-foreground mb-1">{label}</p><p className="p-3 bg-muted rounded-md whitespace-pre-wrap">{value || <span className="text-muted-foreground/70">Not Provided</span>}</p></div>);

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h2 className="text-2xl font-bold tracking-tight">Your Financial Summary</h2><p className="text-muted-foreground">A summary of the information you provided.</p></div>
        <div className="flex gap-2"><Button variant="outline" size="sm" onClick={resetForm}><ArrowLeft className="h-4 w-4 mr-1" />Start Over</Button><Button size="sm" onClick={() => alert("PDF download not implemented yet.")}><Download className="h-4 w-4 mr-1" />Download</Button></div>
      </div>
      <Card>
        <CardHeader><CardTitle>Key Metrics</CardTitle><CardDescription>A quick overview based on your inputs.</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg"><div className="text-sm font-medium text-muted-foreground">Total Monthly Income</div><div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div></div>
            <div className="p-4 bg-muted rounded-lg"><div className="text-sm font-medium text-muted-foreground">Total Monthly Expenses</div><div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div></div>
            <div className="p-4 bg-muted rounded-lg"><div className="text-sm font-medium text-muted-foreground">Monthly Savings Rate</div><div className="text-2xl font-bold">{savingsRate}%</div><div className="text-xs text-muted-foreground">({formatCurrency(monthlySavings)} / month)</div></div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Home className="h-5 w-5 text-primary" /> Personal & Income</CardTitle></CardHeader><CardContent className="space-y-3">{renderField("Full Name", formData.fullName)}{renderField("Age", formData.age)}{renderField("Marital Status", formData.maritalStatus)}<Separator />{renderField("Primary Income", formatCurrency(formData.primaryIncome))}{renderField("Additional Income", formatCurrency(Number(formData.additionalIncome)))}{renderField("Salary Frequency", formData.salaryFrequency)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-primary" /> Expenses</CardTitle></CardHeader><CardContent className="space-y-3">{renderField("Rent/Mortgage", formatCurrency(Number(formData.rent)))}{renderField("Utilities", formatCurrency(Number(formData.utilities)))}{renderField("Loan Repayments", formatCurrency(Number(formData.loans)))}{renderField("Groceries", formatCurrency(Number(formData.groceries)))}{renderField("Entertainment", formatCurrency(Number(formData.entertainment)))}<Separator/>{renderField("Has Other Debt?", formData.hasDebt ? 'Yes' : 'No')}{formData.hasDebt && renderTextArea("Debt Details", formData.debtDetails)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><PiggyBank className="h-5 w-5 text-primary" /> Investments & Savings</CardTitle></CardHeader><CardContent className="space-y-3">{renderField("Current Savings", formatCurrency(Number(formData.currentSavings)))}{renderField("Monthly Investment", formatCurrency(Number(formData.investmentAmount)))}{renderField("Risk Tolerance", `${formData.riskTolerance}/10 (${getRiskLevel(formData.riskTolerance)})`)}<Separator/>{renderTextArea("Current Investments", formData.currentInvestments)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Financial Goals</CardTitle></CardHeader><CardContent className="space-y-4">{renderField("Primary Goal Target", formatCurrency(Number(formData.targetAmount)))}{renderField("Primary Goal Year", formData.targetDate instanceof Date ? formData.targetDate.getFullYear() : formData.targetDate)}<Separator/>{renderTextArea("Short-term Goals", formData.shortTermGoals)}{renderTextArea("Medium-term Goals", formData.mediumTermGoals)}{renderTextArea("Long-term Goals", formData.longTermGoals)}</CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Additional Information</CardTitle></CardHeader><CardContent>{renderTextArea("Additional Comments", formData.additionalComments)}</CardContent></Card>
      </div>
    </div>
  );
};
EOF

# 7. Main Content and Page Wrappers
echo "✅ Overwriting main wizard content and page..."
cat << 'EOF' > src/components/financial-planner/WizardContent.tsx
import { Card, CardContent } from "@/components/ui/card";
import { PersonalDetailsStep } from "./PersonalDetailsStep";
import { IncomeDetailsStep } from "./IncomeDetailsStep";
import { ExpenseDetailsStep } from "./ExpenseDetailsStep";
import { InvestmentsStep } from "./InvestmentsStep";
import { FinancialGoalsStep } from "./FinancialGoalsStep";
import { DocumentsStep } from "./DocumentsStep";
import { PlannerResults } from "./PlannerResults";
import { WizardNavigation } from "./WizardNavigation";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";

export const WizardContent = () => {
  const { currentStep, showResults, ...stepProps } = useFinancialPlanner();
  
  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalDetailsStep {...stepProps} />;
      case 1: return <IncomeDetailsStep {...stepProps} />;
      case 2: return <ExpenseDetailsStep {...stepProps} />;
      case 3: return <InvestmentsStep {...stepProps} />;
      case 4: return <FinancialGoalsStep {...stepProps} />;
      case 5: return <DocumentsStep {...stepProps} />;
      default: return <PersonalDetailsStep {...stepProps} />;
    }
  };

  if (showResults) {
    return <PlannerResults />;
  }
  
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 md:p-8">
        {renderStep()}
        <WizardNavigation />
      </CardContent>
    </Card>
  );
};
EOF

cat << 'EOF' > src/pages/AIFinancialPlannerWizard.tsx
import MainLayout from "../layouts/MainLayout";
import { WizardProgress } from "@/components/financial-planner/WizardProgress";
import { WizardContent } from "@/components/financial-planner/WizardContent";
import { FinancialPlannerProvider } from "@/context/FinancialPlannerContext";

const AIFinancialPlannerWizard = () => {
  return (
    <MainLayout>
      <FinancialPlannerProvider>
        <div className="container max-w-4xl px-4 pt-24 pb-16 mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">AI Financial Planner</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
              Follow these steps to generate a personalized financial summary.
            </p>
          </div>
          <WizardProgress />
          <WizardContent />
        </div>
      </FinancialPlannerProvider>
    </MainLayout>
  );
};

export default AIFinancialPlannerWizard;
EOF

echo "------------------------------------------------------------------------------------"
echo "🎉 Success! All 15 AI Financial Planner files have been updated."
echo "You may need to restart your development server for all changes to take effect."