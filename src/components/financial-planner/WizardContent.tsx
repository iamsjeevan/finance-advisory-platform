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
