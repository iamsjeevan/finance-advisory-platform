
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useForm } from 'react-hook-form';
import { Chart } from '@/components/ui/chart';
import { ArrowLeft, Clock, BadgeDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LoanCalculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      loanAmount: 10000,
      interestRate: 5,
      loanTerm: 5,
      loanType: 'personal',
      paymentFrequency: 'monthly'
    }
  });

  const calculateLoan = (data: any) => {
    // Convert annual interest rate to monthly
    const monthlyRate = data.interestRate / 100 / 12;
    
    // Number of payments
    const numberOfPayments = data.loanTerm * 12;
    
    // Calculate monthly payment using loan formula
    const monthlyPayment = data.loanAmount * monthlyRate * 
      Math.pow(1 + monthlyRate, numberOfPayments) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Calculate total payment and interest
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - data.loanAmount;
    
    // Generate amortization schedule
    let balance = data.loanAmount;
    const schedule = [];
    
    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      if (i % 12 === 0 || i === 1 || i === numberOfPayments) {
        schedule.push({
          payment: i,
          principal: principalPayment,
          interest: interestPayment,
          balance: balance > 0 ? balance : 0
        });
      }
    }
    
    // Create data for pie chart
    const pieData = [
      { name: 'Principal', value: data.loanAmount },
      { name: 'Interest', value: totalInterest }
    ];

    const result = {
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
      pieData,
      date: new Date().toISOString(),
      inputs: { ...data }
    };
    
    setCalculationResult(result);
    setCalculationHistory([result, ...calculationHistory]);
  };

  const onSubmit = (data: any) => {
    calculateLoan(data);
    setActiveTab('results');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6 pt-16">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/tools">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Loan Calculator</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Loan Planning</CardTitle>
            <CardDescription>
              Calculate monthly payments, total interest, and overall cost for different loan types and terms.
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
                        <label className="text-sm font-medium">Loan Type</label>
                        <Select
                          onValueChange={(value) => form.setValue('loanType', value)}
                          defaultValue={form.watch('loanType')}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">Personal Loan</SelectItem>
                            <SelectItem value="auto">Auto Loan</SelectItem>
                            <SelectItem value="mortgage">Mortgage</SelectItem>
                            <SelectItem value="student">Student Loan</SelectItem>
                            <SelectItem value="business">Business Loan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Loan Amount ($)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          {...form.register('loanAmount', { valueAsNumber: true })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Interest Rate (%)</label>
                        <div className="flex items-center gap-4">
                          <Slider 
                            value={[form.watch('interestRate')]} 
                            min={0.1} 
                            max={20} 
                            step={0.1}
                            onValueChange={(value) => form.setValue('interestRate', value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-10 text-right">{form.watch('interestRate')}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Loan Term (years)</label>
                        <div className="flex items-center gap-4">
                          <Slider 
                            value={[form.watch('loanTerm')]} 
                            min={1} 
                            max={30} 
                            step={1}
                            onValueChange={(value) => form.setValue('loanTerm', value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-10 text-right">{form.watch('loanTerm')}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Payment Frequency</label>
                        <Select
                          onValueChange={(value) => form.setValue('paymentFrequency', value)}
                          defaultValue={form.watch('paymentFrequency')}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
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
                            <p className="text-sm text-muted-foreground">Monthly Payment</p>
                            <p className="text-3xl font-bold">${calculationResult.monthlyPayment.toFixed(2)}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total Interest</p>
                            <p className="text-3xl font-bold">${calculationResult.totalInterest.toFixed(2)}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total Payment</p>
                            <p className="text-3xl font-bold">${calculationResult.totalPayment.toFixed(2)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Payment Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-64">
                          <Chart
                            type="pie"
                            data={{
                              labels: ['Principal', 'Interest'],
                              datasets: [
                                {
                                  data: [calculationResult.inputs.loanAmount, calculationResult.totalInterest],
                                  backgroundColor: ['#9b87f5', '#f5877c']
                                }
                              ]
                            }}
                          />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Amortization Schedule</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-64 overflow-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Payment</th>
                                <th className="text-right py-2">Principal</th>
                                <th className="text-right py-2">Interest</th>
                                <th className="text-right py-2">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {calculationResult.schedule.map((item: any, index: number) => (
                                <tr key={index} className="border-b">
                                  <td className="py-2">{item.payment}</td>
                                  <td className="text-right py-2">${item.principal.toFixed(2)}</td>
                                  <td className="text-right py-2">${item.interest.toFixed(2)}</td>
                                  <td className="text-right py-2">${item.balance.toFixed(2)}</td>
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
                    <BadgeDollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                    <p className="text-muted-foreground">Complete the calculator form to see your loan projection</p>
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
                                {calc.inputs.loanType.charAt(0).toUpperCase() + calc.inputs.loanType.slice(1)} Loan: ${calc.inputs.loanAmount} for {calc.inputs.loanTerm} years
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Interest Rate: {calc.inputs.interestRate}% | Monthly Payment: ${calc.monthlyPayment.toFixed(2)}
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

export default LoanCalculator;
