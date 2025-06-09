import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, PiggyBank, DollarSign, Target, Home, BarChart, FileText } from "lucide-react";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { Separator } from "@/components/ui/separator";

export const PlannerResults = () => {
  const { formData, resetForm, getRiskLevel, formatCurrency } = useFinancialPlanner();

  // --- Calculations based purely on user input ---
  const totalIncome = (formData.primaryIncome || 0) + (Number(formData.additionalIncome) || 0);
  const totalExpenses = 
    (Number(formData.rent) || 0) + (Number(formData.utilities) || 0) + (Number(formData.loans) || 0) +
    (Number(formData.groceries) || 0) + (Number(formData.entertainment) || 0);
  const monthlySavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((monthlySavings / totalIncome) * 100).toFixed(0) : 0;

  // --- Display helper functions ---
  const renderField = (label: string, value: string | number | boolean | Date) => {
    const displayValue = value === '' || value === null || value === undefined ? <span className="text-muted-foreground">Not Provided</span> : String(value);
    return (<div className="flex justify-between items-center text-sm"><p className="text-muted-foreground">{label}</p><p className="font-medium text-right">{displayValue}</p></div>);
  };
  const renderTextArea = (label: string, value: string) => (<div className="text-sm"><p className="font-medium text-muted-foreground mb-1">{label}</p><p className="p-3 bg-muted rounded-md whitespace-pre-wrap">{value || <span className="text-muted-foreground/70">Not Provided</span>}</p></div>);

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h2 className="text-2xl font-bold tracking-tight">Your Financial Summary</h2><p className="text-muted-foreground">A summary of the information you provided.</p></div>
        <div className="flex gap-2"><Button variant="outline" size="sm" onClick={resetForm}><ArrowLeft className="h-4 w-4 mr-1" />Start Over</Button><Button size="sm" onClick={() => alert("PDF download not implemented yet.")}><Download className="h-4 w-4 mr-1" />Download</Button></div>
      </div>
      <Card>
        <CardHeader><CardTitle>Key Metrics</CardTitle><CardDescription>A quick overview based on your inputs.</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg"><div className="text-sm font-medium text-muted-foreground">Total Monthly Income</div><div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div></div>
            <div className="p-4 bg-muted rounded-lg"><div className="text-sm font-medium text-muted-foreground">Total Monthly Expenses</div><div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div></div>
            <div className="p-4 bg-muted rounded-lg"><div className="text-sm font-medium text-muted-foreground">Monthly Savings Rate</div><div className="text-2xl font-bold">{savingsRate}%</div><div className="text-xs text-muted-foreground">({formatCurrency(monthlySavings)} / month)</div></div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Home className="h-5 w-5 text-primary" /> Personal & Income</CardTitle></CardHeader><CardContent className="space-y-3">{renderField("Full Name", formData.fullName)}{renderField("Age", formData.age)}{renderField("Marital Status", formData.maritalStatus)}<Separator />{renderField("Primary Income", formatCurrency(formData.primaryIncome))}{renderField("Additional Income", formatCurrency(Number(formData.additionalIncome)))}{renderField("Salary Frequency", formData.salaryFrequency)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-primary" /> Expenses</CardTitle></CardHeader><CardContent className="space-y-3">{renderField("Rent/Mortgage", formatCurrency(Number(formData.rent)))}{renderField("Utilities", formatCurrency(Number(formData.utilities)))}{renderField("Loan Repayments", formatCurrency(Number(formData.loans)))}{renderField("Groceries", formatCurrency(Number(formData.groceries)))}{renderField("Entertainment", formatCurrency(Number(formData.entertainment)))}<Separator/>{renderField("Has Other Debt?", formData.hasDebt ? 'Yes' : 'No')}{formData.hasDebt && renderTextArea("Debt Details", formData.debtDetails)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><PiggyBank className="h-5 w-5 text-primary" /> Investments & Savings</CardTitle></CardHeader><CardContent className="space-y-3">{renderField("Current Savings", formatCurrency(Number(formData.currentSavings)))}{renderField("Monthly Investment", formatCurrency(Number(formData.investmentAmount)))}{renderField("Risk Tolerance", `${formData.riskTolerance}/10 (${getRiskLevel(formData.riskTolerance)})`)}<Separator/>{renderTextArea("Current Investments", formData.currentInvestments)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Financial Goals</CardTitle></CardHeader><CardContent className="space-y-4">{renderField("Primary Goal Target", formatCurrency(Number(formData.targetAmount)))}{renderField("Primary Goal Year", formData.targetDate instanceof Date ? formData.targetDate.getFullYear() : formData.targetDate)}<Separator/>{renderTextArea("Short-term Goals", formData.shortTermGoals)}{renderTextArea("Medium-term Goals", formData.mediumTermGoals)}{renderTextArea("Long-term Goals", formData.longTermGoals)}</CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Additional Information</CardTitle></CardHeader><CardContent>{renderTextArea("Additional Comments", formData.additionalComments)}</CardContent></Card>
      </div>
    </div>
  );
};
