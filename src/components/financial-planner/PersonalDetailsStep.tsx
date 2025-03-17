
import { Home } from "lucide-react";
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

export const PersonalDetailsStep = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleSliderChange 
}: StepComponentProps) => {
  return (
    <div className="space-y-6">
      <StepHeader 
        icon={<Home className="h-5 w-5 text-primary" />}
        title="Personal Details"
      />
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <Label htmlFor="age" className="mb-2 block">
            Age: {formData.age}
          </Label>
          <Slider 
            id="age"
            min={18}
            max={100}
            step={1}
            defaultValue={[formData.age]}
            onValueChange={(value) => handleSliderChange('age', value)}
            showValue
            formatValue={(value) => `${value} years`}
          />
        </div>
        
        <div>
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('maritalStatus', value)}
            value={formData.maritalStatus}
          >
            <SelectTrigger id="maritalStatus" className="mt-1">
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
