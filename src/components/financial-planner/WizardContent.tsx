
import { Card, CardContent } from "@/components/ui/card";
import { PersonalDetailsStep } from "./PersonalDetailsStep";
import { IncomeDetailsStep } from "./IncomeDetailsStep";
import { ExpenseDetailsStep } from "./ExpenseDetailsStep";
import { InvestmentsStep } from "./InvestmentsStep";
import { FinancialGoalsStep } from "./FinancialGoalsStep";
import { DocumentsStep } from "./DocumentsStep";
import { WizardNavigation } from "./WizardNavigation";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";

export const WizardContent = () => {
  const { 
    currentStep, 
    formData, 
    handleInputChange, 
    handleSelectChange, 
    handleSliderChange, 
    handleDateChange,
    formatCurrency,
    getRiskLevel
  } = useFinancialPlanner();
  
  const stepProps = {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSliderChange,
    handleDateChange,
    formatCurrency,
    getRiskLevel
  };
  
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        {currentStep === 0 && <PersonalDetailsStep {...stepProps} />}
        {currentStep === 1 && <IncomeDetailsStep {...stepProps} />}
        {currentStep === 2 && <ExpenseDetailsStep {...stepProps} />}
        {currentStep === 3 && <InvestmentsStep {...stepProps} />}
        {currentStep === 4 && <FinancialGoalsStep {...stepProps} />}
        {currentStep === 5 && <DocumentsStep {...stepProps} />}
        
        <WizardNavigation />
      </CardContent>
    </Card>
  );
};
