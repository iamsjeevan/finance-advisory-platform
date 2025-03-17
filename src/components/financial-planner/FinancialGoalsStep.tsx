
import { Target, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const FinancialGoalsStep = ({ 
  formData, 
  handleInputChange, 
  handleDateChange 
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
  );
};
