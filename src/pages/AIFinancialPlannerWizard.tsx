import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  Upload, 
  ChevronRight, 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  BarChart, 
  DollarSign, 
  PiggyBank, 
  Target, 
  Home, 
  FileText 
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 'personal',
    title: 'Personal Details',
    description: 'Tell us about yourself',
    icon: <Home className="h-5 w-5" />
  },
  {
    id: 'income',
    title: 'Income Details',
    description: 'Your monthly earnings',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    id: 'expenses',
    title: 'Expense Details',
    description: 'Your monthly spending',
    icon: <BarChart className="h-5 w-5" />
  },
  {
    id: 'investments',
    title: 'Investment & Savings',
    description: 'Your financial assets',
    icon: <PiggyBank className="h-5 w-5" />
  },
  {
    id: 'goals',
    title: 'Financial Goals',
    description: 'What you want to achieve',
    icon: <Target className="h-5 w-5" />
  },
  {
    id: 'documents',
    title: 'Documents & Information',
    description: 'Additional details that help us',
    icon: <FileText className="h-5 w-5" />
  }
];

const AIFinancialPlannerWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
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
    targetDate: undefined as Date | undefined,
    
    additionalComments: ''
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
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
    setFormData({
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
      targetDate: undefined,
      additionalComments: ''
    });
    setFile(null);
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
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

  return (
    <MainLayout>
      <div className="container max-w-4xl px-4 pt-24 pb-16 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">AI Financial Planner</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Complete this step-by-step form to receive a personalized financial plan tailored to your goals and situation.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="hidden sm:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10",
                    currentStep === index 
                      ? "border-primary bg-primary text-primary-foreground" 
                      : index < currentStep 
                        ? "border-primary bg-primary/20 text-primary" 
                        : "border-muted bg-muted text-muted-foreground"
                  )}
                >
                  {index < currentStep ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-2 font-medium",
                  currentStep === index ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          
          <div className="sm:hidden flex items-center justify-between mb-4">
            <div className="flex items-center">
              {steps[currentStep].icon}
              <div className="ml-2">
                <h3 className="font-medium">{steps[currentStep].title}</h3>
                <p className="text-xs text-muted-foreground">{steps[currentStep].description}</p>
              </div>
            </div>
            <div className="text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          <div className="w-full bg-muted h-2 rounded-full mt-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="shadow-sm">
          <CardContent className="p-6">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Personal Details</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age" className="mb-2 block">
                      Age: {formData.age}
                    </Label>
                    <Slider 
                      id="age"
                      min={18}
                      max={100}
                      step={1}
                      defaultValue={[formData.age]}
                      onValueChange={(value) => handleSliderChange('age', value)}
                      showValue
                      formatValue={(value) => `${value} years`}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('maritalStatus', value)}
                      value={formData.maritalStatus}
                    >
                      <SelectTrigger id="maritalStatus" className="mt-1">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Income Details</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="primaryIncome" className="mb-2 block">
                      Primary Income (Monthly): {formatCurrency(formData.primaryIncome)}
                    </Label>
                    <Slider 
                      id="primaryIncome"
                      min={500}
                      max={10000}
                      step={100}
                      defaultValue={[formData.primaryIncome]}
                      onValueChange={(value) => handleSliderChange('primaryIncome', value)}
                      showValue
                      formatValue={formatCurrency}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="additionalIncome">Additional Income (Optional)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input 
                        id="additionalIncome"
                        name="additionalIncome"
                        className="pl-8"
                        value={formData.additionalIncome}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="salaryFrequency">Salary Frequency</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('salaryFrequency', value)}
                      value={formData.salaryFrequency}
                    >
                      <SelectTrigger id="salaryFrequency" className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Expense Details</h2>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Monthly Fixed Expenses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rent">Rent/Mortgage</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          id="rent"
                          name="rent"
                          className="pl-8"
                          value={formData.rent}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="utilities">Utilities</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          id="utilities"
                          name="utilities"
                          className="pl-8"
                          value={formData.utilities}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="loans">Loan Repayments</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          id="loans"
                          name="loans"
                          className="pl-8"
                          value={formData.loans}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-base font-medium pt-2">Monthly Variable Expenses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="groceries">Groceries</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          id="groceries"
                          name="groceries"
                          className="pl-8"
                          value={formData.groceries}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="entertainment">Entertainment</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          id="entertainment"
                          name="entertainment"
                          className="pl-8"
                          value={formData.entertainment}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Label htmlFor="hasDebt">Do you have any debt?</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('hasDebt', value)}
                      value={formData.hasDebt ? 'true' : 'false'}
                    >
                      <SelectTrigger id="hasDebt" className="mt-1">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.hasDebt && (
                    <div>
                      <Label htmlFor="debtDetails">Debt Details</Label>
                      <Textarea 
                        id="debtDetails"
                        name="debtDetails"
                        value={formData.debtDetails}
                        onChange={handleInputChange}
                        placeholder="List your debts (credit cards, loans) with amounts"
                        className="min-h-[100px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Investment & Savings</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentSavings">Current Savings</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input 
                        id="currentSavings"
                        name="currentSavings"
                        className="pl-8"
                        value={formData.currentSavings}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="currentInvestments">Current Investments</Label>
                    <Textarea 
                      id="currentInvestments"
                      name="currentInvestments"
                      value={formData.currentInvestments}
                      onChange={handleInputChange}
                      placeholder="List your current investments (stocks, mutual funds, real estate)"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="investmentAmount">Investment Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input 
                        id="investmentAmount"
                        name="investmentAmount"
                        className="pl-8"
                        value={formData.investmentAmount}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="riskTolerance" className="mb-2 block">
                      Risk Tolerance: {formData.riskTolerance} - {getRiskLevel(formData.riskTolerance)}
                    </Label>
                    <Slider 
                      id="riskTolerance"
                      min={1}
                      max={10}
                      step={1}
                      defaultValue={[formData.riskTolerance]}
                      onValueChange={(value) => handleSliderChange('riskTolerance', value)}
                      showValue
                      formatValue={(value) => `${value}/10 (${getRiskLevel(value)})`}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Financial Goals</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shortTermGoals">Short-term Goals (< 1 year)</Label>
                    <Textarea 
                      id="shortTermGoals"
                      name="shortTermGoals"
                      value={formData.shortTermGoals}
                      onChange={handleInputChange}
                      placeholder="Describe your immediate financial goals"
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mediumTermGoals">Medium-term Goals (1-5 years)</Label>
                    <Textarea 
                      id="mediumTermGoals"
                      name="mediumTermGoals"
                      value={formData.mediumTermGoals}
                      onChange={handleInputChange}
                      placeholder="Describe your medium-term financial goals"
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="longTermGoals">Long-term Goals (5+ years)</Label>
                    <Textarea 
                      id="longTermGoals"
                      name="longTermGoals"
                      value={formData.longTermGoals}
                      onChange={handleInputChange}
                      placeholder="Describe your long-term financial goals"
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <Label htmlFor="targetAmount">Target Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          id="targetAmount"
                          name="targetAmount"
                          className="pl-8"
                          value={formData.targetAmount}
                          onChange={handleInputChange}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="targetDate">Target Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="targetDate"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1",
                              !formData.targetDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.targetDate ? format(formData.targetDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.targetDate}
                            onSelect={handleDateChange}
                            initialFocus
                            className="p-3"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Documents & Additional Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="passbook" className="flex items-center gap-2 mb-2">
                      <Upload className="h-4 w-4" />
                      Passbook Upload
                    </Label>
                    <div className="border-2 border-dashed rounded-md px-6 py-8 text-center">
                      <Input 
                        id="passbook" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="mb-1 font-medium">Drag and drop or click to upload</p>
                        <p className="text-sm text-muted-foreground mb-4">Upload your 6-month passbook (PDF, JPEG, PNG)</p>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => document.getElementById('passbook')?.click()}
                        >
                          Select File
                        </Button>
                        {file && (
                          <div className="mt-4 px-4 py-2 bg-muted rounded-md flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          </div>
                        )}
                        {fileError && (
                          <p className="mt-2 text-sm text-destructive">{fileError}</p>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Max file size: 5MB. Accepted formats: PDF, JPEG, PNG
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="additionalComments">Additional Comments</Label>
                    <Textarea 
                      id="additionalComments"
                      name="additionalComments"
                      value={formData.additionalComments}
                      onChange={handleInputChange}
                      placeholder="Any additional information that might help us create a better financial plan for you"
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-blue-600 text-white"
                >
                  Generate Financial Plan
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AIFinancialPlannerWizard;
