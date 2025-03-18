
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useForm } from 'react-hook-form';
import { Chart } from '@/components/ui/chart';
import { ArrowLeft, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const InvestmentCalculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      initialInvestment: 5000,
      monthlyContribution: 500,
      investmentPeriod: 20,
      expectedReturn: 8,
      compoundingFrequency: 'annually',
      investmentType: 'general'
    }
  });

  const calculateInvestment = (data: any) => {
    // Convert annual return to period return based on compounding frequency
    let periodsPerYear = 1;
    switch (data.compoundingFrequency) {
      case 'monthly':
        periodsPerYear = 12;
        break;
      case 'quarterly':
        periodsPerYear = 4;
        break;
      case 'semiannually':
        periodsPerYear = 2;
        break;
      case 'annually':
      default:
        periodsPerYear = 1;
    }
    
    const ratePerPeriod = data.expectedReturn / 100 / periodsPerYear;
    const totalPeriods = data.investmentPeriod * periodsPerYear;
    
    // For monthly contributions, adjust to per-period contribution
    const contributionPerPeriod = data.monthlyContribution * (12 / periodsPerYear);
    
    let balance = data.initialInvestment;
    const yearlyData = [];
    let initialInvestmentGrowth = data.initialInvestment;
    let contributionsTotal = 0;
    let interestTotal = 0;
    
    for (let period = 1; period <= totalPeriods; period++) {
      // Calculate interest
      const interest = balance * ratePerPeriod;
      
      // Add contribution
      balance += contributionPerPeriod;
      contributionsTotal += contributionPerPeriod;
      
      // Add interest
      balance += interest;
      interestTotal += interest;
      
      // Track initial investment growth separately
      initialInvestmentGrowth *= (1 + ratePerPeriod);
      
      // Record yearly data points
      if (period % periodsPerYear === 0 || period === totalPeriods) {
        const year = period / periodsPerYear;
        yearlyData.push({
          year,
          balance,
          interest: interestTotal,
          contributions: contributionsTotal + data.initialInvestment
        });
      }
    }
    
    const result = {
      finalBalance: balance,
      totalContributions: contributionsTotal + data.initialInvestment,
      totalInterest: interestTotal,
      initialInvestmentGrowth: initialInvestmentGrowth,
      yearlyData,
      date: new Date().toISOString(),
      inputs: { ...data }
    };
    
    setCalculationResult(result);
    setCalculationHistory([result, ...calculationHistory]);
  };

  const onSubmit = (data: any) => {
    calculateInvestment(data);
    setActiveTab('results');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/tools">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Investment Calculator</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Investment Growth</CardTitle>
            <CardDescription>
              Forecast investment growth with different contribution amounts, rates of return, and time horizons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Investment Type</label>
                        <Select
                          onValueChange={(value) => form.setValue('investmentType', value)}
                          defaultValue={form.watch('investmentType')}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select investment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Investment</SelectItem>
                            <SelectItem value="401k">401(k)</SelectItem>
                            <SelectItem value="ira">IRA</SelectItem>
                            <SelectItem value="roth">Roth IRA</SelectItem>
                            <SelectItem value="education">Education Savings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Initial Investment ($)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          {...form.register('initialInvestment', { valueAsNumber: true })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Monthly Contribution ($)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          {...form.register('monthlyContribution', { valueAsNumber: true })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Investment Period (years)</label>
                        <div className="flex items-center gap-4">
                          <Slider 
                            value={[form.watch('investmentPeriod')]} 
                            min={1} 
                            max={40} 
                            step={1}
                            onValueChange={(value) => form.setValue('investmentPeriod', value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-10 text-right">{form.watch('investmentPeriod')}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expected Annual Return (%)</label>
                        <div className="flex items-center gap-4">
                          <Slider 
                            value={[form.watch('expectedReturn')]} 
                            min={1} 
                            max={15} 
                            step={0.1}
                            onValueChange={(value) => form.setValue('expectedReturn', value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-12 text-right">{form.watch('expectedReturn')}%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Compounding Frequency</label>
                        <Select
                          onValueChange={(value) => form.setValue('compoundingFrequency', value)}
                          defaultValue={form.watch('compoundingFrequency')}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select compounding frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="semiannually">Semi-Annually</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto">Calculate</Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="results">
                {calculationResult ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Final Balance</p>
                            <p className="text-3xl font-bold">${calculationResult.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total Contributions</p>
                            <p className="text-3xl font-bold">${calculationResult.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total Interest</p>
                            <p className="text-3xl font-bold">${calculationResult.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Investment Growth</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-80">
                          <Chart
                            type="area"
                            data={{
                              labels: calculationResult.yearlyData.map((d: any) => `Year ${d.year}`),
                              datasets: [
                                {
                                  label: 'Balance',
                                  data: calculationResult.yearlyData.map((d: any) => d.balance),
                                  borderColor: '#9b87f5',
                                  backgroundColor: 'rgba(155, 135, 245, 0.1)',
                                  fill: true
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              scales: {
                                y: {
                                  ticks: {
                                    callback: (value) => `$${(Number(value) / 1000).toLocaleString()}k`
                                  }
                                }
                              },
                              plugins: {
                                tooltip: {
                                  callbacks: {
                                    label: (context) => `$${context.raw.toLocaleString()}`
                                  }
                                }
                              }
                            }}
                          />
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Breakdown of Final Balance</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-64">
                          <Chart
                            type="pie"
                            data={{
                              labels: ['Initial Investment', 'Contributions', 'Interest'],
                              datasets: [
                                {
                                  data: [
                                    calculationResult.inputs.initialInvestment,
                                    calculationResult.totalContributions - calculationResult.inputs.initialInvestment,
                                    calculationResult.totalInterest
                                  ],
                                  backgroundColor: ['#9b87f5', '#87b3f5', '#f5877c']
                                }
                              ]
                            }}
                          />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Annual Growth Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-64 overflow-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Year</th>
                                <th className="text-right py-2">Balance</th>
                                <th className="text-right py-2">Contributions</th>
                                <th className="text-right py-2">Interest</th>
                              </tr>
                            </thead>
                            <tbody>
                              {calculationResult.yearlyData.map((item: any, index: number) => (
                                <tr key={index} className="border-b">
                                  <td className="py-2">{item.year}</td>
                                  <td className="text-right py-2">${item.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                  <td className="text-right py-2">${item.contributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                  <td className="text-right py-2">${item.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab('calculator')}>Adjust Inputs</Button>
                      <Button onClick={() => setActiveTab('calculator')}>New Calculation</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                    <p className="text-muted-foreground">Complete the calculator form to see your investment projections</p>
                    <Button className="mt-4" onClick={() => setActiveTab('calculator')}>Go to Calculator</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history">
                {calculationHistory.length > 0 ? (
                  <div className="space-y-4">
                    {calculationHistory.map((calc, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(calc.date).toLocaleDateString()} at {new Date(calc.date).toLocaleTimeString()}
                              </p>
                              <p className="font-medium">
                                {calc.inputs.investmentType.charAt(0).toUpperCase() + calc.inputs.investmentType.slice(1)}: ${calc.inputs.initialInvestment} + ${calc.inputs.monthlyContribution}/month for {calc.inputs.investmentPeriod} years
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Return: {calc.inputs.expectedReturn}% | Final Balance: ${calc.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </p>
                            </div>
                            <div className="md:text-right space-y-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                  setCalculationResult(calc);
                                  setActiveTab('results');
                                }}
                              >
                                View Results
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No History Yet</h3>
                    <p className="text-muted-foreground">Your calculation history will appear here</p>
                    <Button className="mt-4" onClick={() => setActiveTab('calculator')}>Create Your First Calculation</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvestmentCalculator;
