
import { BarChart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const ExpenseDetailsStep = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange 
}: StepComponentProps) => {
  return (
    <div className="space-y-6">
      <StepHeader 
        icon={<BarChart className="h-5 w-5 text-primary" />}
        title="Expense Details"
      />
      
      <div className="space-y-4">
        <h3 className="text-base font-medium">Monthly Fixed Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rent">Rent/Mortgage</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input 
                id="rent"
                name="rent"
                className="pl-8"
                value={formData.rent}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="utilities">Utilities</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input 
                id="utilities"
                name="utilities"
                className="pl-8"
                value={formData.utilities}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="loans">Loan Repayments</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input 
                id="loans"
                name="loans"
                className="pl-8"
                value={formData.loans}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        
        <h3 className="text-base font-medium pt-2">Monthly Variable Expenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="groceries">Groceries</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input 
                id="groceries"
                name="groceries"
                className="pl-8"
                value={formData.groceries}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="entertainment">Entertainment</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input 
                id="entertainment"
                name="entertainment"
                className="pl-8"
                value={formData.entertainment}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <Label htmlFor="hasDebt">Do you have any debt?</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('hasDebt', value)}
            value={formData.hasDebt ? 'true' : 'false'}
          >
            <SelectTrigger id="hasDebt" className="mt-1">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {formData.hasDebt && (
          <div>
            <Label htmlFor="debtDetails">Debt Details</Label>
            <Textarea 
              id="debtDetails"
              name="debtDetails"
              value={formData.debtDetails}
              onChange={handleInputChange}
              placeholder="List your debts (credit cards, loans) with amounts"
              className="min-h-[100px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
