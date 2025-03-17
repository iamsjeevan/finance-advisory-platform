
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { WIZARD_STEPS } from "@/constants/financialPlannerSteps";

export const WizardProgress = () => {
  const { currentStep } = useFinancialPlanner();
  
  return (
    <div className="mb-8">
      <div className="hidden sm:flex items-center justify-between">
        {WIZARD_STEPS.map((step, index) => (
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
          {WIZARD_STEPS[currentStep].icon}
          <div className="ml-2">
            <h3 className="font-medium">{WIZARD_STEPS[currentStep].title}</h3>
            <p className="text-xs text-muted-foreground">{WIZARD_STEPS[currentStep].description}</p>
          </div>
        </div>
        <div className="text-sm font-medium">
          Step {currentStep + 1} of {WIZARD_STEPS.length}
        </div>
      </div>
      
      <div className="w-full bg-muted h-2 rounded-full mt-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / (WIZARD_STEPS.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
