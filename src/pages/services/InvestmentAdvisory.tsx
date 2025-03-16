import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { LineChart, Briefcase, BarChart4, PieChart, TrendingUp, BarChartHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const InvestmentAdvisory = () => {
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
              Investment Advisory Services
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Expert guidance to help you build and manage an investment portfolio tailored to your goals
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
                    <LineChart className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Portfolio Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Professional management of your investment portfolio with 
                    regular reviews and adjustments to meet your goals.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Custom investment strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Regular portfolio rebalancing
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Performance monitoring
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
                    <Briefcase className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Asset Allocation</h3>
                  <p className="text-muted-foreground mb-4">
                    Strategic distribution of investments across various asset classes 
                    to balance risk and reward.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Risk-adjusted allocation
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Diversification strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Tax-efficient investing
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
                    <BarChart4 className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Stock Selection</h3>
                  <p className="text-muted-foreground mb-4">
                    Expert analysis and selection of individual stocks based on 
                    fundamentals, growth potential, and market trends.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Fundamental analysis
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Growth stock identification
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Dividend strategy
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
                    <PieChart className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">ETF & Fund Selection</h3>
                  <p className="text-muted-foreground mb-4">
                    Research and selection of ETFs and mutual funds that align with 
                    your investment goals and risk tolerance.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Low-cost fund strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Sector-specific ETFs
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Performance tracking
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
                    <TrendingUp className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Market Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive analysis of market trends and economic indicators 
                    to inform investment decisions.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Economic forecasting
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Sector rotation strategy
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Trend identification
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
                    <BarChartHorizontal className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Alternative Investments</h3>
                  <p className="text-muted-foreground mb-4">
                    Guidance on non-traditional investment options to diversify your 
                    portfolio beyond stocks and bonds.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Real estate investing
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Private equity options
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Commodity strategies
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
                Ready to take your investment strategy to the next level?
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

export default InvestmentAdvisory;
