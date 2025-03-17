
import { Target } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const FinancialGoalsStep = ({ 
  formData, 
  handleInputChange
}: StepComponentProps) => {
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
            <Label htmlFor="targetDate">Target Year</Label>
            <Input 
              id="targetDate"
              name="targetDate"
              type="number"
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 50}
              placeholder={new Date().getFullYear().toString()}
              value={formData.targetDate instanceof Date ? formData.targetDate.getFullYear() : ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
