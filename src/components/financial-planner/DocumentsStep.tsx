
import { FileText, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";

export const DocumentsStep = ({ 
  formData, 
  handleInputChange 
}: StepComponentProps) => {
  const { file, fileError, handleFileChange } = useFinancialPlanner();
  
  return (
    <div className="space-y-6">
      <StepHeader 
        icon={<FileText className="h-5 w-5 text-primary" />}
        title="Documents & Additional Information"
      />
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="passbook" className="flex items-center gap-2 mb-2">
            <Upload className="h-4 w-4" />
            Passbook Upload
          </Label>
          <div className="border-2 border-dashed rounded-md px-6 py-8 text-center">
            <Input 
              id="passbook" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="mb-1 font-medium">Drag and drop or click to upload</p>
              <p className="text-sm text-muted-foreground mb-4">Upload your 6-month passbook (PDF, JPEG, PNG)</p>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('passbook')?.click()}
              >
                Select File
              </Button>
              {file && (
                <div className="mt-4 px-4 py-2 bg-muted rounded-md flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                </div>
              )}
              {fileError && (
                <p className="mt-2 text-sm text-destructive">{fileError}</p>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Max file size: 5MB. Accepted formats: PDF, JPEG, PNG
          </p>
        </div>
        
        <div>
          <Label htmlFor="additionalComments">Additional Comments</Label>
          <Textarea 
            id="additionalComments"
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleInputChange}
            placeholder="Any additional information that might help us create a better financial plan for you"
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
};
