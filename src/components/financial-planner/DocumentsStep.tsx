import { FileText, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { StepComponentProps } from "@/types/financialPlanner";
import { StepHeader } from "./StepHeader";
import React from "react";

export const DocumentsStep = ({ formData, handleInputChange }: StepComponentProps) => {
  const { file, fileError, handleFileChange } = useFinancialPlanner();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <StepHeader icon={<FileText className="h-5 w-5 text-primary" />} title="Documents & Additional Information" />
      <div className="space-y-4">
        <div>
          <Label htmlFor="passbook" className="flex items-center gap-2 mb-2">Passbook/Bank Statement (Optional)</Label>
          <div className="border-2 border-dashed rounded-md px-6 py-8 text-center">
            <Input ref={fileInputRef} id="passbook" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png"/>
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="mb-1 font-medium">Drag & drop or click to upload</p>
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>Select File</Button>
              {file && (<div className="mt-4 px-4 py-2 bg-muted rounded-md flex items-center"><FileText className="h-4 w-4 mr-2" /><span className="text-sm truncate max-w-[200px]">{file.name}</span></div>)}
              {fileError && (<p className="mt-2 text-sm text-destructive">{fileError}</p>)}
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="additionalComments">Additional Comments</Label>
          <Textarea id="additionalComments" name="additionalComments" value={formData.additionalComments} onChange={handleInputChange} placeholder="Anything else we should know?"/>
        </div>
      </div>
    </div>
  );
};
