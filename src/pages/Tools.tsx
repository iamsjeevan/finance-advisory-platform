
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { Calculator, ChartBar, PieChart, Percent, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Tools = () => {
  return (
    <MainLayout>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Financial Tools
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Interactive calculators and tools to help you make informed financial decisions
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4">
                    <Calculator className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Retirement Calculator</h3>
                  <p className="text-muted-foreground mb-4">
                    Calculate how much you need to save for retirement and track your progress 
                    toward your retirement goals.
                  </p>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link to="/tools/retirement-calculator">Use Calculator</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4">
                    <Percent className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Loan Calculator</h3>
                  <p className="text-muted-foreground mb-4">
                    Calculate monthly payments, total interest, and overall cost for different 
                    loan types and terms.
                  </p>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link to="/tools/loan-calculator">Use Calculator</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4">
                    <ChartBar className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Investment Calculator</h3>
                  <p className="text-muted-foreground mb-4">
                    Forecast investment growth with different contribution amounts, rates of return, 
                    and time horizons.
                  </p>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link to="/tools/investment-calculator">Use Calculator</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4">
                    <PieChart className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Budget Planner</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a personalized budget plan based on your income, expenses, and 
                    financial goals.
                  </p>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link to="/tools/budget-planner">Use Calculator</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Net Worth Tracker</h3>
                  <p className="text-muted-foreground mb-4">
                    Calculate and track your net worth over time to measure your financial 
                    progress and wealth building.
                  </p>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link to="/tools/net-worth-tracker">Use Tool</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4">
                    <Clock className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Financial Goal Planner</h3>
                  <p className="text-muted-foreground mb-4">
                    Set financial goals and create a personalized plan to achieve them 
                    with timeline projections.
                  </p>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link to="/tools/goal-planner">Use Tool</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-lg mb-6">
                Need help understanding which tools are right for you?
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">
                  Speak with an Advisor
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Tools;
