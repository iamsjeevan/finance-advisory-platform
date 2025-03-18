
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { useForm } from 'react-hook-form';
import { Chart } from '@/components/ui/chart';
import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RetirementCalculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 10000,
      monthlyContribution: 500,
      expectedReturn: 7,
      inflationRate: 2.5,
      desiredIncome: 5000
    }
  });

  const calculateRetirement = (data: any) => {
    // Simple retirement calculation - in a real app this would be more sophisticated
    const yearsToRetirement = data.retirementAge - data.currentAge;
    const monthlyReturn = data.expectedReturn / 100 / 12;
    const inflationFactor = Math.pow(1 + data.inflationRate / 100, yearsToRetirement);
    
    let totalSavings = data.currentSavings;
    const monthlyData = [];
    
    for (let month = 1; month <= yearsToRetirement * 12; month++) {
      totalSavings = totalSavings * (1 + monthlyReturn) + data.monthlyContribution;
      
      if (month % 12 === 0) {
        monthlyData.push({
          year: data.currentAge + month / 12,
          savings: totalSavings
        });
      }
    }
    
    const result = {
      totalSavings,
      adjustedForInflation: totalSavings / inflationFactor,
      monthlyIncome: (totalSavings * 0.04) / 12, // 4% withdrawal rule
      data: monthlyData,
      date: new Date().toISOString(),
      inputs: { ...data }
    };
    
    setCalculationResult(result);
    setCalculationHistory([result, ...calculationHistory]);
  };

  const onSubmit = (data: any) => {
    calculateRetirement(data);
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
          <h1 className="text-3xl font-bold">Retirement Calculator</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Retirement Planning</CardTitle>
            <CardDescription>
              Calculate how much you need to save for retirement and track your progress toward your retirement goals.
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
                      <FormItem>
                        <FormLabel>Current Age</FormLabel>
                        <div className="flex items-center gap-4">
                          <Slider 
                            value={[form.watch('currentAge')]} 
                            min={18} 
                            max={80} 
                            step={1}
                            onValueChange={(value) => form.setValue('currentAge', value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-10 text-right">{form.watch('currentAge')}</span>
                        </div>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Retirement Age</FormLabel>
                        <div className="flex items-center gap-4">
                          <Slider 
                            value={[form.watch('retirementAge')]} 
                            min={form.watch('currentAge') + 1} 
                            max={90} 
                            step={1}
                            onValueChange={(value) => form.setValue('retirementAge', value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-10 text-right">{form.watch('retirementAge')}</span>
                        </div>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Current Savings ($)</FormLabel>
                        <Input
                          type="number"
                          placeholder="0"
                          {...form.register('currentSavings', { valueAsNumber: true })}
                        />
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Monthly Contribution ($)</FormLabel>
                        <Input
                          type="number"
                          placeholder="0"
                          {...form.register('monthlyContribution', { valueAsNumber: true })}
                        />
                      </FormItem>
                    </div>
                    
                    <div className="space-y-4">
                      <FormItem>
                        <FormLabel>Expected Annual Return (%)</FormLabel>
                        <div className="flex items-center gap-4">
                          <Slider 
                            value={[form.watch('expectedReturn')]} 
                            min={1} 
                            max={12} 
                            step={0.1}
                            onValueChange={(value) => form.setValue('expectedReturn', value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-12 text-right">{form.watch('expectedReturn')}%</span>
                        </div>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Inflation Rate (%)</FormLabel>
                        <div className="flex items-center gap-4">
                          <Slider 
                            value={[form.watch('inflationRate')]} 
                            min={0} 
                            max={7} 
                            step={0.1}
                            onValueChange={(value) => form.setValue('inflationRate', value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-12 text-right">{form.watch('inflationRate')}%</span>
                        </div>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Desired Monthly Income in Retirement ($)</FormLabel>
                        <Input
                          type="number"
                          placeholder="0"
                          {...form.register('desiredIncome', { valueAsNumber: true })}
                        />
                      </FormItem>
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
                            <p className="text-sm text-muted-foreground">Projected Total</p>
                            <p className="text-3xl font-bold">${calculationResult.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Inflation Adjusted</p>
                            <p className="text-3xl font-bold">${calculationResult.adjustedForInflation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Monthly Income</p>
                            <p className="text-3xl font-bold">${calculationResult.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardContent className="pt-6 h-80">
                        <Chart
                          type="line"
                          data={{
                            labels: calculationResult.data.map((d: any) => d.year),
                            datasets: [
                              {
                                label: 'Projected Savings',
                                data: calculationResult.data.map((d: any) => d.savings),
                                borderColor: '#9b87f5',
                                backgroundColor: 'rgba(155, 135, 245, 0.1)',
                                fill: true,
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
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab('calculator')}>Adjust Inputs</Button>
                      <Button onClick={() => setActiveTab('calculator')}>New Calculation</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                    <p className="text-muted-foreground">Complete the calculator form to see your retirement projections</p>
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
                                Retirement at age {calc.inputs.retirementAge} with ${calc.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Monthly contribution: ${calc.inputs.monthlyContribution} | Return: {calc.inputs.expectedReturn}%
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

export default RetirementCalculator;
