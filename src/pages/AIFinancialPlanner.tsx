
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartLine, Upload, DollarSign, FileText, PiggyBank, Clock, Shield, Target, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define form schema with Zod
const formSchema = z.object({
  // Personal Financial Information
  monthlySalary: z.string().min(1, "Monthly salary is required"),
  monthlyExpenses: z.string().min(1, "Monthly expenses are required"),
  investmentAmount: z.string().min(1, "Investment amount is required"),
  insuranceDetails: z.string().optional(),
  
  // Financial Goals
  goalDescription: z.string().min(10, "Please provide a detailed description of your goal"),
  targetAmount: z.string().min(1, "Target amount is required"),
  timeframe: z.string().min(1, "Timeframe is required"),
  
  // Additional Details
  additionalComments: z.string().optional(),
});

const AIFinancialPlanner = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlySalary: "",
      monthlyExpenses: "",
      investmentAmount: "",
      insuranceDetails: "",
      goalDescription: "",
      targetAmount: "",
      timeframe: "",
      additionalComments: "",
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);
    
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError("Please upload a PDF or image file (JPEG, PNG)");
      setFile(null);
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB");
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  };
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!file) {
      setFileError("Please upload your passbook");
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log("Form data:", data);
    console.log("File:", file);
    
    // Show success toast
    toast({
      title: "Financial plan request submitted",
      description: "Our AI is now processing your information. We'll notify you when your personalized plan is ready.",
    });
    
    // Reset form
    form.reset();
    setFile(null);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-4xl px-4 pt-24 pb-16 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">AI Financial Planner</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Complete the form below to receive a personalized financial plan tailored to your goals and current situation.
          </p>
        </div>
        
        <div className="bg-card border rounded-lg shadow-sm p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                  <TabsTrigger value="personal" className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <span>Personal Information</span>
                  </TabsTrigger>
                  <TabsTrigger value="goals" className="flex items-center gap-2">
                    <Target size={16} />
                    <span>Financial Goals</span>
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>Documents</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <ChartLine className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Personal Financial Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="monthlySalary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Monthly Salary
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input className="pl-8" placeholder="5,000" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="monthlyExpenses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Monthly Expenses
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input className="pl-8" placeholder="3,000" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="investmentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <PiggyBank className="h-4 w-4" />
                            Investment Amount
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input className="pl-8" placeholder="1,000" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="insuranceDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Insurance Details (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Health, Life, etc." {...field} />
                          </FormControl>
                          <FormDescription>
                            List any insurance policies you currently have
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="goals" className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Financial Goals</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="goalDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Goal Description
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what you want to achieve financially (e.g., saving for a home, retirement, education)" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Target Amount
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input className="pl-8" placeholder="100,000" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeframe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Timeframe
                          </FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeframe" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Less than 1 year</SelectItem>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Document Upload</h2>
                  </div>
                  
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
                    
                    <FormField
                      control={form.control}
                      name="additionalComments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Additional Comments
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any additional information that might help us create a better financial plan for you" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="button-gradient">
                  Generate Financial Plan
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIFinancialPlanner;
