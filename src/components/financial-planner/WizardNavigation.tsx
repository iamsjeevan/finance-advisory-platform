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
