
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { WIZARD_STEPS } from "@/constants/financialPlannerSteps";

export const WizardNavigation = () => {
  const { currentStep, nextStep, prevStep, handleSubmit } = useFinancialPlanner();
  
  return (
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
      
      {currentStep < WIZARD_STEPS.length - 1 ? (
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
  );
};
