// A temporary, minimal version to reset the compiler
import { StepHeader } from "./StepHeader";
import { Target } from "lucide-react";

export const FinancialGoalsStep = () => {
  return (
    <div>
        <StepHeader 
            icon={<Target className="h-5 w-5 text-primary" />} 
            title="Financial Goals" 
        />
        <p>This is the goals step.</p>
    </div>
  );
};

export default FinancialGoalsStep;