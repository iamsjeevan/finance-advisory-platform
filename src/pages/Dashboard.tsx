
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, ChevronRightIcon, CreditCard, DollarSign, LineChart, PieChart, ScrollText, User } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex justify-center items-center min-h-[50vh]">
            <svg className="animate-spin h-10 w-10 text-finance-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect via the useEffect
  }
  
  return (
    <MainLayout>
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                <p className="text-muted-foreground">Here's an overview of your financial dashboard</p>
              </div>
              <Button className="mt-4 md:mt-0" asChild>
                <Link to="/ai-financial-planner-wizard">
                  <LineChart className="mr-2 h-4 w-4" />
                  Get AI Financial Plan
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Financial Health</CardTitle>
                  <CardDescription>Your overall financial status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">75/100</div>
                    <div className="h-10 w-10 rounded-full bg-finance-blue/10 flex items-center justify-center">
                      <PieChart className="h-5 w-5 text-finance-blue" />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">+5 points since last month</div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link to="/financial-health">
                      View Details
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Total Assets</CardTitle>
                  <CardDescription>Combined value of your investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">$103,450</div>
                    <div className="h-10 w-10 rounded-full bg-finance-blue/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-finance-blue" />
                    </div>
                  </div>
                  <div className="text-sm text-green-600 mt-2">+2.4% since last month</div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link to="/investments">
                      View Details
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Budget Status</CardTitle>
                  <CardDescription>Monthly spending overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">$2,840 / $3,500</div>
                    <div className="h-10 w-10 rounded-full bg-finance-blue/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-finance-blue" />
                    </div>
                  </div>
                  <div className="text-sm text-amber-600 mt-2">81% of monthly budget used</div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between" asChild>
                    <Link to="/tools/budget-planner">
                      View Details
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest financial transactions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center">
                          <ScrollText className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Budget Updated</p>
                          <p className="text-sm text-muted-foreground">Monthly entertainment budget adjusted</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Today</div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                          <LineChart className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Investment Performance</p>
                          <p className="text-sm text-muted-foreground">Portfolio increased by 1.2%</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Yesterday</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Profile Updated</p>
                          <p className="text-sm text-muted-foreground">Financial goals reviewed and updated</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">3 days ago</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/activity">
                      View All Activity
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and services</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/tools/investment-calculator">
                      <LineChart className="mr-2 h-4 w-4" />
                      Investment Calculator
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/tools/budget-planner">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Update Budget
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/news">
                      <ScrollText className="mr-2 h-4 w-4" />
                      Financial News
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/tools/goal-planner">
                      <PieChart className="mr-2 h-4 w-4" />
                      Set Financial Goals
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
