
import { Target, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

export const FinancialGoalsStep = ({ 
  formData, 
  handleInputChange, 
  handleDateChange,
  formatCurrency 
}: StepComponentProps) => {
  const selectedDate = formData.targetDate instanceof Date ? formData.targetDate : undefined;

  return (
    <div className="space-y-6">
      <StepHeader 
        icon={<Target className="h-5 w-5 text-primary" />} 
        title="Financial Goals" 
      />
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="targetAmount">Primary Financial Goal Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input 
                id="targetAmount" 
                name="targetAmount" 
                type="number" 
                className="pl-8" 
                value={formData.targetAmount} 
                onChange={handleInputChange} 
                placeholder="500000"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current value: {formatCurrency(Number(formData.targetAmount) || 0)}
            </p>
          </div>
          <div>
            <Label htmlFor="targetDate">Target Achievement Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div>
          <Label htmlFor="shortTermGoals">Short-term Goals (1-2 years)</Label>
          <Textarea 
            id="shortTermGoals" 
            name="shortTermGoals" 
            value={formData.shortTermGoals} 
            onChange={handleInputChange} 
            placeholder="e.g., Emergency fund, vacation, gadgets..."
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="mediumTermGoals">Medium-term Goals (3-7 years)</Label>
          <Textarea 
            id="mediumTermGoals" 
            name="mediumTermGoals" 
            value={formData.mediumTermGoals} 
            onChange={handleInputChange} 
            placeholder="e.g., Car purchase, home down payment, higher education..."
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="longTermGoals">Long-term Goals (7+ years)</Label>
          <Textarea 
            id="longTermGoals" 
            name="longTermGoals" 
            value={formData.longTermGoals} 
            onChange={handleInputChange} 
            placeholder="e.g., Home purchase, children's education, retirement..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialGoalsStep;
