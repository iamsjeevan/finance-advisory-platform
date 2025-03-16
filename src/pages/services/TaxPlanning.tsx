import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { Receipt, PercentCircle, Building, FileClock, BadgePercent, FileCheck2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TaxPlanning = () => {
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
              Tax Planning Services
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Strategic tax planning to minimize your tax burden and maximize your wealth
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
                    <Receipt className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Personal Tax Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive tax planning strategies to reduce your personal 
                    tax liability and maximize deductions.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Income tax optimization
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Deduction maximization
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Tax credit identification
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
                    <PercentCircle className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Investment Tax Strategies</h3>
                  <p className="text-muted-foreground mb-4">
                    Optimize your investment portfolio to minimize tax implications 
                    and maximize after-tax returns.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Capital gains management
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Tax-loss harvesting
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
                    <Building className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Business Tax Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Strategic tax planning for business owners to minimize tax 
                    liability and maximize business deductions.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Entity structure optimization
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Business expense strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Tax credit identification
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
                    <FileClock className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Retirement Tax Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Strategic planning to minimize taxes on retirement income and 
                    maximize tax-advantaged retirement accounts.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Roth conversion strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Required minimum distributions
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Social Security tax planning
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
                    <BadgePercent className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Estate Tax Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Strategic planning to minimize estate and gift taxes and maximize 
                    wealth transfer to heirs.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Gift tax strategies
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Trust implementation
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Legacy tax planning
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
                    <FileCheck2 className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Tax Compliance</h3>
                  <p className="text-muted-foreground mb-4">
                    Ensure proper filing and compliance with tax laws while 
                    identifying all available deductions and credits.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Tax return preparation
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      IRS audit representation
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-500/10 rounded-full p-1 mr-2">
                        <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Tax law changes monitoring
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
                Ready to minimize your tax burden and maximize your wealth?
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

export default TaxPlanning;
