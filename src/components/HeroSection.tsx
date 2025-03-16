
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, BarChart3, PieChart, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-finance-light-grey">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] w-[70%] h-[70%] rounded-full bg-finance-blue/5 blur-3xl" />
        <div className="absolute top-[60%] -left-[20%] w-[60%] h-[60%] rounded-full bg-finance-indigo/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center pt-24 pb-16 md:py-32">
          {/* Left side - Copy */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 animate-fade-in">
            <div className="inline-flex items-center py-1 px-3 rounded-full bg-finance-blue/10 text-finance-blue text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-finance-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-finance-blue"></span>
              </span>
              AI-Powered Financial Advisory
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Your Personal<br />
              <span className="title-gradient">Financial Advisor</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Harness the power of AI to optimize your finances, make smarter investments, and secure your financial future with personalized advice.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild>
                <Link to="/register" className="px-6">
                  Get Started Free
                  <ChevronRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about" className="px-6">
                  Learn More
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </div>

          {/* Right side - Illustrated UI */}
          <div className="w-full lg:w-1/2 perspective">
            <div className="relative preserve-3d animate-slide-up animation-delay-300">
              {/* Main screen */}
              <div className="relative bg-white rounded-2xl shadow-elevated overflow-hidden border border-border w-full max-w-md mx-auto">
                <div className="p-4 border-b border-border bg-finance-light-grey flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs font-medium">Financial Dashboard</div>
                  <div className="w-16"></div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Your Balance</h3>
                      <div className="text-2xl font-bold">$24,156.80</div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">View Details</Button>
                  </div>

                  <div className="mb-6 bg-finance-light-grey rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Portfolio Overview</h4>
                      <div className="text-xs text-green-500 font-medium flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        +8.24%
                      </div>
                    </div>
                    <div className="flex space-x-2 mb-4">
                      <div className="h-2 rounded-full bg-finance-blue w-1/2"></div>
                      <div className="h-2 rounded-full bg-finance-indigo w-1/4"></div>
                      <div className="h-2 rounded-full bg-gray-300 w-1/4"></div>
                    </div>
                    <div className="grid grid-cols-3 text-xs">
                      <div>
                        <div className="text-finance-blue font-medium">Stocks</div>
                        <div>50%</div>
                      </div>
                      <div>
                        <div className="text-finance-indigo font-medium">Bonds</div>
                        <div>25%</div>
                      </div>
                      <div>
                        <div className="text-gray-500 font-medium">Cash</div>
                        <div>25%</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-3">Recent Transactions</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Apple Inc.', type: 'Buy', amount: '+$2,500.00', icon: <BarChart3 size={14} /> },
                        { name: 'ETF Fund', type: 'Deposit', amount: '+$1,000.00', icon: <PieChart size={14} /> },
                        { name: 'Tesla Inc.', type: 'Sell', amount: '-$750.40', icon: <BarChart3 size={14} /> },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-white border border-border p-2 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-finance-light-grey flex items-center justify-center mr-3">
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.type}</div>
                            </div>
                          </div>
                          <div className={item.amount.includes('+') ? 'text-green-500' : 'text-red-500'}>
                            {item.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements floating around */}
              <div className="absolute -bottom-4 -right-12 w-32 h-24 bg-white rounded-lg shadow-elevated border border-border transform rotate-6 hidden md:block">
                <div className="p-3">
                  <div className="w-full h-3 bg-finance-blue/20 rounded-full mb-2"></div>
                  <div className="w-3/4 h-3 bg-finance-blue/20 rounded-full mb-2"></div>
                  <div className="w-1/2 h-3 bg-finance-blue/20 rounded-full"></div>
                </div>
              </div>

              <div className="absolute -top-6 -left-6 w-24 h-24 bg-white rounded-lg shadow-elevated border border-border transform -rotate-12 hidden md:block">
                <div className="p-3 flex flex-col h-full justify-center items-center">
                  <div className="w-12 h-12 rounded-full bg-finance-blue/10 flex items-center justify-center text-finance-blue">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
