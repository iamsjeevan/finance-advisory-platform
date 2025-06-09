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
