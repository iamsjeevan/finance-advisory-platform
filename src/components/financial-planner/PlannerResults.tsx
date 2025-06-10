
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, PiggyBank, DollarSign, Target, Home, BarChart, FileText, TrendingUp, Shield } from "lucide-react";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";
import { Separator } from "@/components/ui/separator";
import { calculateRiskProfile, formatIndianCurrency } from "@/utils/riskProfileUtils";
import { Badge } from "@/components/ui/badge";

export const PlannerResults = () => {
  const { formData, resetForm, getRiskLevel } = useFinancialPlanner();
  
  // Calculate risk profile and recommendations
  const riskProfile = calculateRiskProfile(formData);

  // --- Calculations based purely on user input ---
  const totalIncome = (formData.primaryIncome || 0) + (Number(formData.additionalIncome) || 0);
  const totalExpenses = 
    (Number(formData.rent) || 0) + (Number(formData.utilities) || 0) + (Number(formData.loans) || 0) +
    (Number(formData.groceries) || 0) + (Number(formData.entertainment) || 0);
  const monthlySavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((monthlySavings / totalIncome) * 100).toFixed(0) : 0;

  // --- Display helper functions ---
  const renderField = (label: string, value: string | number | boolean | Date) => {
    let displayValue;
    if (value === '' || value === null || value === undefined) {
      displayValue = <span className="text-muted-foreground">Not Provided</span>;
    } else if (typeof value === 'number' && (label.toLowerCase().includes('income') || label.toLowerCase().includes('amount') || label.toLowerCase().includes('savings') || label.toLowerCase().includes('expense'))) {
      displayValue = formatIndianCurrency(value);
    } else {
      displayValue = String(value);
    }
    return (
      <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-medium text-right">{displayValue}</p>
      </div>
    );
  };

  const renderTextArea = (label: string, value: string) => (
    <div className="text-sm">
      <p className="font-medium text-muted-foreground mb-1">{label}</p>
      <p className="p-3 bg-muted rounded-md whitespace-pre-wrap">
        {value || <span className="text-muted-foreground/70">Not Provided</span>}
      </p>
    </div>
  );

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Conservative': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      case 'Aggressive': return 'bg-orange-100 text-orange-800';
      case 'Very Aggressive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Financial Summary</h2>
          <p className="text-muted-foreground">Personalized recommendations based on your profile</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetForm}>
            <ArrowLeft className="h-4 w-4 mr-1" />Start Over
          </Button>
          <Button size="sm" onClick={() => alert("PDF download feature coming soon!")}>
            <Download className="h-4 w-4 mr-1" />Download
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Your current financial position</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium text-muted-foreground">Monthly Income</div>
              <div className="text-2xl font-bold">{formatIndianCurrency(totalIncome)}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium text-muted-foreground">Monthly Expenses</div>
              <div className="text-2xl font-bold">{formatIndianCurrency(totalExpenses)}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium text-muted-foreground">Monthly Savings</div>
              <div className="text-2xl font-bold text-green-600">{formatIndianCurrency(monthlySavings)}</div>
              <div className="text-xs text-muted-foreground">({savingsRate}% of income)</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium text-muted-foreground">Current Savings</div>
              <div className="text-2xl font-bold">{formatIndianCurrency(Number(formData.currentSavings))}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Your Risk Profile
          </CardTitle>
          <CardDescription>Based on your age, income, and risk tolerance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={getRiskColor(riskProfile.level)}>{riskProfile.level}</Badge>
              <span className="text-sm text-muted-foreground">{riskProfile.description}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{riskProfile.stockAllocation}%</div>
                <div className="text-xs text-muted-foreground">Equity/Stocks</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{riskProfile.bondAllocation}%</div>
                <div className="text-xs text-muted-foreground">Bonds/FD</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{riskProfile.goldAllocation}%</div>
                <div className="text-xs text-muted-foreground">Gold</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recommended Stocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskProfile.recommendations.stocks.map((stock, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-sm text-muted-foreground">{stock.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatIndianCurrency(stock.price)}</div>
                    <div className={`text-sm ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mutual Fund Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              Recommended Mutual Funds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskProfile.recommendations.mutualFunds.map((fund, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{fund.name}</div>
                    <Badge variant="outline">{fund.category}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">NAV</div>
                      <div className="font-medium">{formatIndianCurrency(fund.nav)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">1Y Return</div>
                      <div className="font-medium text-green-600">{fund.returns1y}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">3Y Return</div>
                      <div className="font-medium text-green-600">{fund.returns3y}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gold Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Gold Investment Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskProfile.recommendations.gold.map((gold, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{gold.type}</div>
                    <div className="text-sm text-muted-foreground">{gold.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{gold.rate}</div>
                    <div className={`text-sm ${gold.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {gold.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fixed Deposits */}
        {riskProfile.recommendations.fixedDeposits.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Fixed Deposits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskProfile.recommendations.fixedDeposits.map((fd, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{fd.bank}</div>
                      <div className="font-bold text-green-600">{fd.rate}</div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Tenure: {fd.tenure}</span>
                      <span>Min: {fd.minAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Personal Information Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Personal & Income Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {renderField("Full Name", formData.fullName)}
            {renderField("Age", formData.age)}
            {renderField("Marital Status", formData.maritalStatus)}
            <Separator />
            {renderField("Primary Income", formData.primaryIncome)}
            {renderField("Additional Income", Number(formData.additionalIncome))}
            {renderField("Salary Frequency", formData.salaryFrequency)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {renderField("Rent/Mortgage", Number(formData.rent))}
            {renderField("Utilities", Number(formData.utilities))}
            {renderField("Loan Repayments", Number(formData.loans))}
            {renderField("Groceries", Number(formData.groceries))}
            {renderField("Entertainment", Number(formData.entertainment))}
            <Separator />
            {renderField("Has Other Debt?", formData.hasDebt ? 'Yes' : 'No')}
            {formData.hasDebt && renderTextArea("Debt Details", formData.debtDetails)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              Current Investments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {renderField("Current Savings", Number(formData.currentSavings))}
            {renderField("Monthly Investment", Number(formData.investmentAmount))}
            {renderField("Risk Tolerance", `${formData.riskTolerance}/10 (${getRiskLevel(formData.riskTolerance)})`)}
            <Separator />
            {renderTextArea("Current Investments", formData.currentInvestments)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Financial Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderField("Primary Goal Target", Number(formData.targetAmount))}
            {renderField("Primary Goal Year", formData.targetDate instanceof Date ? formData.targetDate.getFullYear() : formData.targetDate)}
            <Separator />
            {renderTextArea("Short-term Goals", formData.shortTermGoals)}
            {renderTextArea("Medium-term Goals", formData.mediumTermGoals)}
            {renderTextArea("Long-term Goals", formData.longTermGoals)}
          </CardContent>
        </Card>
      </div>

      {/* Additional Comments */}
      {formData.additionalComments && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderTextArea("Additional Comments", formData.additionalComments)}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
