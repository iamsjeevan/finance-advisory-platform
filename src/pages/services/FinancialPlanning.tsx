import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { Calculator, Calendar, ChartLine, ClipboardCheck, FileCheck, PiggyBank } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinancialPlanning = () => {
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
              Financial Planning Services
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Comprehensive planning to help you achieve your financial goals and secure your future
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
                    <Calendar className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Retirement Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Plan for a comfortable retirement with personalized strategies 
                    tailored to your lifestyle goals and financial situation.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      401(k) optimization
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      IRA & Roth planning
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Social Security analysis
                    </li>
                  </ul>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">Learn More</Link>
                  </Button>
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
                    <ChartLine className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Wealth Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Grow and protect your wealth with personalized strategies 
                    designed to meet your specific financial goals.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Portfolio optimization
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Asset allocation
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Risk management
                    </li>
                  </ul>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">Learn More</Link>
                  </Button>
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
                    <FileCheck className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Estate Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Protect your assets and provide for your loved ones with 
                    comprehensive estate planning solutions.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Will preparation
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Trust establishment
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Legacy planning
                    </li>
                  </ul>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">Learn More</Link>
                  </Button>
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
                    <ClipboardCheck className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Financial Health Check</h3>
                  <p className="text-muted-foreground mb-4">
                    Get a comprehensive review of your financial health with actionable
                    recommendations for improvement.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Budget analysis
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Debt management
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Emergency fund planning
                    </li>
                  </ul>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">Learn More</Link>
                  </Button>
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
                    <Calculator className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">College Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Prepare for education expenses with strategies to save effectively
                    and maximize financial aid opportunities.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      529 plan strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Financial aid planning
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Education loan strategies
                    </li>
                  </ul>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">Learn More</Link>
                  </Button>
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
                    <PiggyBank className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Income Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Maximize your income potential with strategies to optimize earnings
                    and minimize tax implications.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Income diversification
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Passive income strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Tax-efficient withdrawal
                    </li>
                  </ul>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">Learn More</Link>
                  </Button>
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
                Ready to take control of your financial future?
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">
                  Schedule a Free Consultation
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FinancialPlanning;
