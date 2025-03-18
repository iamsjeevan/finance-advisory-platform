
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Chart } from '@/components/ui/chart';
import { ArrowLeft, Clock, PieChart, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IncomeItem {
  source: string;
  amount: number;
}

interface ExpenseItem {
  category: string;
  amount: number;
}

interface BudgetResult {
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  savingsRate: number;
  incomeData: IncomeItem[];
  expenseData: ExpenseItem[];
  date: string;
}

const BudgetPlanner = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [calculationHistory, setCalculationHistory] = useState<BudgetResult[]>([]);
  const [calculationResult, setCalculationResult] = useState<BudgetResult | null>(null);
  
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([
    { source: 'Salary', amount: 5000 },
    { source: 'Side Hustle', amount: 500 }
  ]);
  
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([
    { category: 'Housing', amount: 1500 },
    { category: 'Food', amount: 600 },
    { category: 'Transportation', amount: 400 },
    { category: 'Utilities', amount: 300 },
    { category: 'Entertainment', amount: 200 }
  ]);
  
  const [newIncomeSource, setNewIncomeSource] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const calculateBudget = () => {
    const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenseItems.reduce((sum, item) => sum + item.amount, 0);
    const netCashFlow = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netCashFlow / totalIncome) * 100 : 0;
    
    const result: BudgetResult = {
      totalIncome,
      totalExpenses,
      netCashFlow,
      savingsRate,
      incomeData: [...incomeItems],
      expenseData: [...expenseItems],
      date: new Date().toISOString()
    };
    
    setCalculationResult(result);
    setCalculationHistory([result, ...calculationHistory]);
    setActiveTab('results');
  };

  const addIncomeItem = () => {
    if (newIncomeSource && newIncomeAmount && !isNaN(Number(newIncomeAmount))) {
      setIncomeItems([
        ...incomeItems,
        { source: newIncomeSource, amount: Number(newIncomeAmount) }
      ]);
      setNewIncomeSource('');
      setNewIncomeAmount('');
    }
  };
  
  const removeIncomeItem = (index: number) => {
    setIncomeItems(incomeItems.filter((_, i) => i !== index));
  };
  
  const addExpenseItem = () => {
    if (newExpenseCategory && newExpenseAmount && !isNaN(Number(newExpenseAmount))) {
      setExpenseItems([
        ...expenseItems,
        { category: newExpenseCategory, amount: Number(newExpenseAmount) }
      ]);
      setNewExpenseCategory('');
      setNewExpenseAmount('');
    }
  };
  
  const removeExpenseItem = (index: number) => {
    setExpenseItems(expenseItems.filter((_, i) => i !== index));
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
          <h1 className="text-3xl font-bold">Budget Planner</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget</CardTitle>
            <CardDescription>
              Create a personalized budget plan based on your income, expenses, and financial goals.
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
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Income Sources</h3>
                    <div className="space-y-4">
                      {incomeItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-1">
                            <Input value={item.source} onChange={(e) => {
                              const updated = [...incomeItems];
                              updated[index].source = e.target.value;
                              setIncomeItems(updated);
                            }} />
                          </div>
                          <div className="w-32">
                            <Input 
                              type="number"
                              value={item.amount}
                              onChange={(e) => {
                                const updated = [...incomeItems];
                                updated[index].amount = Number(e.target.value);
                                setIncomeItems(updated);
                              }}
                            />
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeIncomeItem(index)}
                            className="h-10 w-10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <Input 
                            placeholder="Income Source" 
                            value={newIncomeSource}
                            onChange={(e) => setNewIncomeSource(e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input 
                            type="number"
                            placeholder="Amount"
                            value={newIncomeAmount}
                            onChange={(e) => setNewIncomeAmount(e.target.value)}
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={addIncomeItem}
                          className="h-10 w-10"
                          disabled={!newIncomeSource || !newIncomeAmount}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Expenses</h3>
                    <div className="space-y-4">
                      {expenseItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-1">
                            <Input value={item.category} onChange={(e) => {
                              const updated = [...expenseItems];
                              updated[index].category = e.target.value;
                              setExpenseItems(updated);
                            }} />
                          </div>
                          <div className="w-32">
                            <Input 
                              type="number"
                              value={item.amount}
                              onChange={(e) => {
                                const updated = [...expenseItems];
                                updated[index].amount = Number(e.target.value);
                                setExpenseItems(updated);
                              }}
                            />
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeExpenseItem(index)}
                            className="h-10 w-10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <Input 
                            placeholder="Expense Category" 
                            value={newExpenseCategory}
                            onChange={(e) => setNewExpenseCategory(e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input 
                            type="number"
                            placeholder="Amount"
                            value={newExpenseAmount}
                            onChange={(e) => setNewExpenseAmount(e.target.value)}
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={addExpenseItem}
                          className="h-10 w-10"
                          disabled={!newExpenseCategory || !newExpenseAmount}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={calculateBudget} className="w-full md:w-auto">Calculate Budget</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="results">
                {calculationResult ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Monthly Income</p>
                            <p className="text-3xl font-bold">${calculationResult.totalIncome.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                            <p className="text-3xl font-bold">${calculationResult.totalExpenses.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Net Cash Flow</p>
                            <p className={`text-3xl font-bold ${calculationResult.netCashFlow >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              ${calculationResult.netCashFlow.toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Savings Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div 
                              className={`h-4 rounded-full ${calculationResult.savingsRate >= 20 ? 'bg-green-500' : calculationResult.savingsRate > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${Math.max(0, Math.min(100, calculationResult.savingsRate))}%` }}
                            />
                          </div>
                          <span className="ml-4 font-medium">{calculationResult.savingsRate.toFixed(1)}%</span>
                        </div>
                        
                        <div className="mt-4 text-sm text-muted-foreground">
                          {calculationResult.savingsRate >= 20 ? (
                            <p>Great job! Your savings rate is excellent.</p>
                          ) : calculationResult.savingsRate > 0 ? (
                            <p>You're saving, but consider finding ways to increase your savings rate.</p>
                          ) : (
                            <p>You're spending more than you earn. Consider reducing expenses or increasing income.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Income Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-64">
                          {calculationResult.incomeData.length > 0 ? (
                            <Chart
                              type="pie"
                              data={{
                                labels: calculationResult.incomeData.map(item => item.source),
                                datasets: [
                                  {
                                    data: calculationResult.incomeData.map(item => item.amount),
                                    backgroundColor: [
                                      '#9b87f5', '#87b3f5', '#87f5e5', '#87f59b', 
                                      '#b3f587', '#f5e587', '#f5b387', '#f587b3'
                                    ]
                                  }
                                ]
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <p className="text-muted-foreground">No income data available</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Expense Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-64">
                          {calculationResult.expenseData.length > 0 ? (
                            <Chart
                              type="pie"
                              data={{
                                labels: calculationResult.expenseData.map(item => item.category),
                                datasets: [
                                  {
                                    data: calculationResult.expenseData.map(item => item.amount),
                                    backgroundColor: [
                                      '#f5877c', '#f59b87', '#f5b387', '#f5cd87', 
                                      '#f5e587', '#e5f587', '#b3f587', '#87f59b'
                                    ]
                                  }
                                ]
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <p className="text-muted-foreground">No expense data available</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Budget Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {calculationResult.savingsRate < 20 && (
                            <p>Aim for a savings rate of at least 20% of your income.</p>
                          )}
                          
                          {calculationResult.expenseData.some(item => 
                            item.category.toLowerCase().includes('housing') && 
                            (item.amount / calculationResult.totalIncome) > 0.3
                          ) && (
                            <p>Your housing expenses exceed 30% of your income, which is higher than recommended.</p>
                          )}
                          
                          {calculationResult.netCashFlow <= 0 && (
                            <p>You're spending more than you earn. Review your expenses to find areas to cut back.</p>
                          )}
                          
                          <p>The 50/30/20 rule suggests spending 50% on needs, 30% on wants, and saving 20%.</p>
                          
                          <p>Consider building an emergency fund of 3-6 months of expenses if you don't already have one.</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab('calculator')}>Adjust Budget</Button>
                      <Button onClick={() => setActiveTab('calculator')}>New Budget</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Budget Results Yet</h3>
                    <p className="text-muted-foreground">Complete the budget form to see your financial breakdown</p>
                    <Button className="mt-4" onClick={() => setActiveTab('calculator')}>Create Budget</Button>
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
                                Income: ${calc.totalIncome} | Expenses: ${calc.totalExpenses}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Net Cash Flow: ${calc.netCashFlow} | Savings Rate: {calc.savingsRate.toFixed(1)}%
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
                    <p className="text-muted-foreground">Your budget history will appear here</p>
                    <Button className="mt-4" onClick={() => setActiveTab('calculator')}>Create Your First Budget</Button>
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

export default BudgetPlanner;
