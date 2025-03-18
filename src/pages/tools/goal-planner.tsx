
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Chart } from '@/components/ui/chart';
import { ArrowLeft, Clock, Target, Plus, X, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface FinancialGoal {
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  monthlyContribution: number;
}

interface GoalPlanResult {
  goals: FinancialGoal[];
  totalTargetAmount: number;
  totalCurrentAmount: number;
  totalMonthlyContribution: number;
  date: string;
}

const GoalPlanner = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [planHistory, setPlanHistory] = useState<GoalPlanResult[]>([]);
  const [planResult, setPlanResult] = useState<GoalPlanResult | null>(null);
  
  const [goals, setGoals] = useState<FinancialGoal[]>([
    { 
      name: 'Emergency Fund', 
      targetAmount: 15000, 
      currentAmount: 5000, 
      targetDate: '2024-12-31', 
      priority: 'high',
      monthlyContribution: 500
    },
    { 
      name: 'Down Payment for House', 
      targetAmount: 50000, 
      currentAmount: 10000, 
      targetDate: '2026-06-30', 
      priority: 'medium',
      monthlyContribution: 1000
    },
    { 
      name: 'Vacation Fund', 
      targetAmount: 5000, 
      currentAmount: 2000, 
      targetDate: '2024-08-31', 
      priority: 'low',
      monthlyContribution: 300
    }
  ]);
  
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalCurrent, setNewGoalCurrent] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');
  const [newGoalPriority, setNewGoalPriority] = useState('medium');
  const [newGoalContribution, setNewGoalContribution] = useState('');

  const calculateGoalPlan = () => {
    const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const totalMonthlyContribution = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
    
    // Calculate time to goals based on current savings and monthly contributions
    const goalsWithProjections = goals.map(goal => {
      const remainingAmount = goal.targetAmount - goal.currentAmount;
      const monthsToGoal = goal.monthlyContribution > 0 
        ? Math.ceil(remainingAmount / goal.monthlyContribution) 
        : Infinity;
        
      const projectedDate = new Date();
      projectedDate.setMonth(projectedDate.getMonth() + monthsToGoal);
      
      return {
        ...goal,
        monthsToGoal,
        projectedDate: projectedDate.toISOString().slice(0, 10),
        onTrack: new Date(goal.targetDate) >= projectedDate
      };
    });
    
    const result: GoalPlanResult = {
      goals: goalsWithProjections as FinancialGoal[],
      totalTargetAmount,
      totalCurrentAmount,
      totalMonthlyContribution,
      date: new Date().toISOString()
    };
    
    setPlanResult(result);
    setPlanHistory([result, ...planHistory]);
    setActiveTab('results');
  };

  const addGoal = () => {
    if (
      newGoalName && 
      newGoalTarget && 
      newGoalCurrent && 
      newGoalDate && 
      newGoalContribution && 
      !isNaN(Number(newGoalTarget)) && 
      !isNaN(Number(newGoalCurrent)) && 
      !isNaN(Number(newGoalContribution))
    ) {
      setGoals([
        ...goals,
        {
          name: newGoalName,
          targetAmount: Number(newGoalTarget),
          currentAmount: Number(newGoalCurrent),
          targetDate: newGoalDate,
          priority: newGoalPriority as 'high' | 'medium' | 'low',
          monthlyContribution: Number(newGoalContribution)
        }
      ]);
      
      setNewGoalName('');
      setNewGoalTarget('');
      setNewGoalCurrent('');
      setNewGoalDate('');
      setNewGoalPriority('medium');
      setNewGoalContribution('');
    }
  };
  
  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const getProgressColor = (goal: FinancialGoal) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
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
          <h1 className="text-3xl font-bold">Financial Goal Planner</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Set Financial Goals</CardTitle>
            <CardDescription>
              Set financial goals and create a personalized plan to achieve them with timeline projections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="calculator">Goals</TabsTrigger>
                <TabsTrigger value="results">Plan</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator">
                <div className="space-y-8">
                  <div className="space-y-4">
                    {goals.map((goal, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-medium">{goal.name}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(goal.priority)}`}>
                                  {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                                </span>
                              </div>
                              
                              <div className="text-sm text-muted-foreground flex items-center gap-6">
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  ${goal.targetAmount.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(goal.targetDate).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={(goal.currentAmount / goal.targetAmount) * 100} 
                                  className="h-2"
                                />
                                <span className="text-xs text-muted-foreground w-10 text-right">
                                  {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                                <div>
                                  <label className="text-xs text-muted-foreground">Current</label>
                                  <Input 
                                    type="number"
                                    value={goal.currentAmount}
                                    onChange={(e) => {
                                      const updated = [...goals];
                                      updated[index].currentAmount = Number(e.target.value);
                                      setGoals(updated);
                                    }}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-muted-foreground">Target</label>
                                  <Input 
                                    type="number"
                                    value={goal.targetAmount}
                                    onChange={(e) => {
                                      const updated = [...goals];
                                      updated[index].targetAmount = Number(e.target.value);
                                      setGoals(updated);
                                    }}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-muted-foreground">Monthly</label>
                                  <Input 
                                    type="number"
                                    value={goal.monthlyContribution}
                                    onChange={(e) => {
                                      const updated = [...goals];
                                      updated[index].monthlyContribution = Number(e.target.value);
                                      setGoals(updated);
                                    }}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex md:flex-col gap-2 w-full md:w-auto">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeGoal(index)}
                                className="h-8 w-8 ml-auto"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Add New Goal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="text-sm font-medium">Goal Name</label>
                              <Input
                                placeholder="E.g., Emergency Fund, Vacation, etc."
                                value={newGoalName}
                                onChange={(e) => setNewGoalName(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="text-sm font-medium">Target Amount ($)</label>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={newGoalTarget}
                                  onChange={(e) => setNewGoalTarget(e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Current Amount ($)</label>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={newGoalCurrent}
                                  onChange={(e) => setNewGoalCurrent(e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Monthly Contribution ($)</label>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={newGoalContribution}
                                  onChange={(e) => setNewGoalContribution(e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Target Date</label>
                                <Input
                                  type="date"
                                  value={newGoalDate}
                                  onChange={(e) => setNewGoalDate(e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Priority</label>
                                <select 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                                  value={newGoalPriority}
                                  onChange={(e) => setNewGoalPriority(e.target.value)}
                                >
                                  <option value="high">High</option>
                                  <option value="medium">Medium</option>
                                  <option value="low">Low</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button 
                              onClick={addGoal}
                              disabled={!newGoalName || !newGoalTarget || !newGoalCurrent || !newGoalDate || !newGoalContribution}
                            >
                              Add Goal
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={calculateGoalPlan} 
                      className="w-full md:w-auto"
                      disabled={goals.length === 0}
                    >
                      Create Goal Plan
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="results">
                {planResult ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total Goals</p>
                            <p className="text-3xl font-bold">{planResult.goals.length}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total Target Amount</p>
                            <p className="text-3xl font-bold">${planResult.totalTargetAmount.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                            <p className="text-3xl font-bold">${planResult.totalMonthlyContribution.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Progress Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="h-64">
                        <Chart
                          type="bar"
                          data={{
                            labels: planResult.goals.map(goal => goal.name),
                            datasets: [
                              {
                                label: 'Current Amount',
                                dataKey: 'currentAmount',
                                data: planResult.goals.map(goal => goal.currentAmount),
                                backgroundColor: '#87b3f5'
                              },
                              {
                                label: 'Remaining Amount',
                                dataKey: 'remainingAmount',
                                data: planResult.goals.map(goal => goal.targetAmount - goal.currentAmount),
                                backgroundColor: '#f5877c'
                              }
                            ]
                          }}
                        />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Goal Timelines</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {planResult.goals.map((goal, index) => {
                            const remainingAmount = goal.targetAmount - goal.currentAmount;
                            const monthsToGoal = goal.monthlyContribution > 0 
                              ? Math.ceil(remainingAmount / goal.monthlyContribution) 
                              : Infinity;
                              
                            const projectedDate = new Date();
                            projectedDate.setMonth(projectedDate.getMonth() + monthsToGoal);
                            
                            const targetDate = new Date(goal.targetDate);
                            const onTrack = targetDate >= projectedDate;
                            
                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{goal.name}</h4>
                                  <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(goal.priority)}`}>
                                    {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                                  </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Current:</span> ${goal.currentAmount.toLocaleString()}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Target:</span> ${goal.targetAmount.toLocaleString()}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Monthly:</span> ${goal.monthlyContribution.toLocaleString()}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Months to Goal:</span> {monthsToGoal}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Progress 
                                    value={(goal.currentAmount / goal.targetAmount) * 100} 
                                    className="h-2"
                                  />
                                  <span className="text-xs text-muted-foreground w-10 text-right">
                                    {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                                  </span>
                                </div>
                                
                                <div className="text-sm flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
                                  <div>
                                    <span className="text-muted-foreground">Target Date:</span>{' '}
                                    {targetDate.toLocaleDateString()}
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Projected Date:</span>{' '}
                                    {goal.monthlyContribution > 0 ? projectedDate.toLocaleDateString() : 'Never (no monthly contribution)'}
                                  </div>
                                  <div>
                                    <span className={`font-medium ${onTrack ? 'text-green-500' : 'text-red-500'}`}>
                                      {onTrack ? 'On Track' : 'Behind Schedule'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab('calculator')}>Adjust Goals</Button>
                      <Button onClick={() => setActiveTab('calculator')}>New Plan</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Plan Results Yet</h3>
                    <p className="text-muted-foreground">Set your financial goals to create a personalized plan</p>
                    <Button className="mt-4" onClick={() => setActiveTab('calculator')}>Set Goals</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history">
                {planHistory.length > 0 ? (
                  <div className="space-y-4">
                    {planHistory.map((plan, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(plan.date).toLocaleDateString()} at {new Date(plan.date).toLocaleTimeString()}
                              </p>
                              <p className="font-medium">
                                {plan.goals.length} Goals | Total Target: ${plan.totalTargetAmount.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Current Progress: ${plan.totalCurrentAmount.toLocaleString()} | Monthly: ${plan.totalMonthlyContribution.toLocaleString()}
                              </p>
                            </div>
                            <div className="md:text-right space-y-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                  setPlanResult(plan);
                                  setActiveTab('results');
                                }}
                              >
                                View Plan
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
                    <p className="text-muted-foreground">Your goal plan history will appear here</p>
                    <Button className="mt-4" onClick={() => setActiveTab('calculator')}>Create Your First Plan</Button>
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

export default GoalPlanner;
