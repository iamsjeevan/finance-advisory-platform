
import { DollarSign } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const IncomeDetailsStep = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleSliderChange,
  formatCurrency
}: StepComponentProps) => {
  return (
    <div className="space-y-6">
      <StepHeader 
        icon={<DollarSign className="h-5 w-5 text-primary" />}
        title="Income Details"
      />
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="primaryIncome" className="mb-2 block">
            Primary Income (Monthly): {formatCurrency(formData.primaryIncome)}
          </Label>
          <Slider 
            id="primaryIncome"
            min={500}
            max={10000}
            step={100}
            defaultValue={[formData.primaryIncome]}
            onValueChange={(value) => handleSliderChange('primaryIncome', value)}
            showValue
            formatValue={formatCurrency}
          />
        </div>
        
        <div>
          <Label htmlFor="additionalIncome">Additional Income (Optional)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input 
              id="additionalIncome"
              name="additionalIncome"
              className="pl-8"
              value={formData.additionalIncome}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="salaryFrequency">Salary Frequency</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('salaryFrequency', value)}
            value={formData.salaryFrequency}
          >
            <SelectTrigger id="salaryFrequency" className="mt-1">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
