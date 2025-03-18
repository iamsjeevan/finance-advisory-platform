
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ArrowLeft, Shield, LineChart, PiggyBank, AlertTriangle, DollarSign, TrendingUp } from "lucide-react";
import { useFinancialPlanner } from "@/context/FinancialPlannerContext";

export const PlannerResults = () => {
  const { formData, resetForm } = useFinancialPlanner();
  const [activeTab, setActiveTab] = useState("summary");
  
  // Simulated expense data (would be extracted from passbook)
  const expenseData = [
    { name: "Housing", value: 1500 },
    { name: "Food", value: 600 },
    { name: "Transportation", value: 350 },
    { name: "Utilities", value: 250 },
    { name: "Entertainment", value: 200 },
    { name: "Other", value: 300 }
  ];
  
  // Simulated investment distribution
  const investmentData = [
    { name: "Stocks", value: 40 },
    { name: "Mutual Funds", value: 25 },
    { name: "Fixed Deposits", value: 15 },
    { name: "Gold", value: 10 },
    { name: "Real Estate", value: 10 }
  ];
  
  // Simulated stock recommendations
  const stockRecommendations = [
    { name: "Company A", sector: "Technology", targetPrice: "$120", horizon: "Long Term" },
    { name: "Company B", sector: "Healthcare", targetPrice: "$85", horizon: "Medium Term" },
    { name: "Company C", sector: "Finance", targetPrice: "$65", horizon: "Long Term" },
    { name: "Company D", sector: "Energy", targetPrice: "$45", horizon: "Short Term" }
  ];
  
  // Simulated SIP recommendations
  const sipRecommendations = [
    { name: "Blue Chip Fund", amount: "$200", frequency: "Monthly", horizon: "10+ years" },
    { name: "Balanced Advantage", amount: "$150", frequency: "Monthly", horizon: "5-7 years" },
    { name: "Small Cap Fund", amount: "$100", frequency: "Monthly", horizon: "7-10 years" }
  ];
  
  // Simulated insurance recommendations
  const insuranceRecommendations = [
    { type: "Term Life", coverage: "$500,000", premium: "$30/month", provider: "InsureCo A" },
    { type: "Health", coverage: "$100,000", premium: "$120/month", provider: "InsureCo B" },
    { type: "Critical Illness", coverage: "$50,000", premium: "$25/month", provider: "InsureCo C" }
  ];
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF report
    alert("Downloading your financial plan...");
  };
  
  const handleStartOver = () => {
    resetForm();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Financial Plan</h2>
          <p className="text-muted-foreground">
            Based on your inputs, we've created a personalized financial plan to help you achieve your goals.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleStartOver}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Start Over
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download Plan
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Financial Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {formData.riskTolerance > 7 ? "A-" : formData.riskTolerance > 4 ? "B+" : "C"}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">
                    {formData.riskTolerance > 7 
                      ? "Excellent Financial Health" 
                      : formData.riskTolerance > 4 
                        ? "Good Financial Health" 
                        : "Needs Improvement"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your income, expenses, and financial goals
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-primary" />
                  Monthly Savings Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${Math.round(formData.primaryIncome * 0.2)}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(formData.primaryIncome * 0.2 / formData.primaryIncome * 100)}% of your income
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Emergency Fund Target
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${Math.round(formData.primaryIncome * 6)}</p>
                <p className="text-xs text-muted-foreground">
                  6 months of expenses
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Net Worth Projection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${Math.round(formData.primaryIncome * 12 * 10 * 0.6)}</p>
                <p className="text-xs text-muted-foreground">
                  Projected 10-year growth
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Key Strengths</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Consistent income stream with growth potential</li>
                  <li>Clear financial goals established for short and long term</li>
                  <li>Age advantage for compound growth of investments</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Areas for Improvement</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Insufficient emergency fund reserves</li>
                  <li>High expense ratio relative to income</li>
                  <li>Need for more diversified investment portfolio</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Next Steps</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Build emergency fund to cover 6 months of expenses</li>
                  <li>Optimize budget to reduce discretionary spending by 15%</li>
                  <li>Implement recommended SIP investments for long-term growth</li>
                  <li>Secure adequate insurance coverage for risk management</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Recommended Investment Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <Chart type="pie" data={investmentData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stock Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Sector</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Target</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Horizon</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {stockRecommendations.map((stock, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium">{stock.name}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{stock.sector}</td>
                          <td className="px-4 py-3 text-sm">{stock.targetPrice}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{stock.horizon}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>SIP Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Fund Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Frequency</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Horizon</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {sipRecommendations.map((sip, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium">{sip.name}</td>
                          <td className="px-4 py-3 text-sm">{sip.amount}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{sip.frequency}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{sip.horizon}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <Chart type="pie" data={expenseData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Key Observations</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Housing expenses represent {Math.round(1500 / (1500 + 600 + 350 + 250 + 200 + 300) * 100)}% of your total budget</li>
                  <li>Your food expenses are slightly above average for your income bracket</li>
                  <li>Entertainment spending is within reasonable limits</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recommended Actions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Consider refinancing housing costs to reduce monthly payments</li>
                  <li>Implement meal planning to reduce food expenses by 15%</li>
                  <li>Evaluate transportation alternatives to reduce costs</li>
                  <li>Review subscription services for potential consolidation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Savings Potential</h3>
                <p className="text-sm">By implementing these recommendations, you could save approximately <span className="font-semibold">${Math.round((1500 + 600 + 350 + 250 + 200 + 300) * 0.15)}</span> per month, which translates to <span className="font-semibold">${Math.round((1500 + 600 + 350 + 250 + 200 + 300) * 0.15 * 12)}</span> annually.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insurance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Insurance Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Insurance Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Coverage</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Premium</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Provider</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {insuranceRecommendations.map((insurance, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm font-medium">{insurance.type}</td>
                        <td className="px-4 py-3 text-sm">{insurance.coverage}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{insurance.premium}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{insurance.provider}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Insurance Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Current Coverage</h3>
                <p className="text-sm mb-2">Based on your inputs, you currently have:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>No term life insurance</li>
                  <li>Basic health insurance through employer</li>
                  <li>No disability insurance</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Coverage Gaps</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Insufficient life insurance for your financial responsibilities</li>
                  <li>Limited health coverage with high deductibles</li>
                  <li>No income protection in case of disability</li>
                  <li>No critical illness coverage</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recommended Insurance Strategy</h3>
                <p className="text-sm mb-2">We recommend a comprehensive insurance strategy that includes:</p>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Secure term life insurance with coverage of {formData.primaryIncome * 10} (10x annual income)</li>
                  <li>Enhance health coverage with a supplemental policy</li>
                  <li>Add disability insurance to protect your income</li>
                  <li>Consider critical illness coverage for additional protection</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Short-Term Actions (0-6 months)</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Build Emergency Fund</h4>
                    <p className="text-sm">Allocate ${Math.round(formData.primaryIncome * 0.15)} monthly to build an emergency fund of ${formData.primaryIncome * 6} within 12 months.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Secure Essential Insurance</h4>
                    <p className="text-sm">Prioritize term life insurance and enhanced health coverage as outlined in the insurance recommendations.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Optimize Expenses</h4>
                    <p className="text-sm">Implement budget optimization strategies to reduce monthly expenses by 15%, focusing on housing, food, and discretionary spending.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Medium-Term Actions (6-24 months)</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Implement Investment Strategy</h4>
                    <p className="text-sm">Begin SIP investments according to recommendations, starting with ${Math.round(formData.primaryIncome * 0.1)} monthly into diversified mutual funds.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Debt Reduction Plan</h4>
                    <p className="text-sm">Allocate additional ${Math.round(formData.primaryIncome * 0.08)} monthly toward high-interest debt reduction.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Tax Optimization</h4>
                    <p className="text-sm">Explore tax-advantaged investment options to optimize your tax liability.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Long-Term Strategies (2-5 years)</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Asset Allocation Adjustment</h4>
                    <p className="text-sm">Gradually increase equity exposure in your portfolio to {60 + formData.riskTolerance}% based on your risk tolerance.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Real Estate Investment</h4>
                    <p className="text-sm">Consider real estate investment by year 3, with a down payment of ${Math.round(formData.primaryIncome * 12 * 0.2)} saved through dedicated SIP.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border bg-muted/30">
                    <h4 className="font-medium mb-1">Retirement Planning</h4>
                    <p className="text-sm">Increase retirement contributions to 15% of income, targeting a retirement corpus of ${Math.round(formData.primaryIncome * 12 * 25)} by age 60.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
