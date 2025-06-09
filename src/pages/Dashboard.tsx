
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calculator, BarChart3, Target, DollarSign, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Loan Calculator",
      description: "Calculate loan payments and interest",
      icon: <Calculator className="h-6 w-6" />,
      href: "/tools/loan-calculator",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Investment Calculator",
      description: "Plan your investment returns",
      icon: <TrendingUp className="h-6 w-6" />,
      href: "/tools/investment-calculator",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Budget Planner",
      description: "Track income and expenses",
      icon: <PieChart className="h-6 w-6" />,
      href: "/tools/budget-planner",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "AI Financial Planner",
      description: "Get personalized financial advice",
      icon: <Target className="h-6 w-6" />,
      href: "/ai-financial-planner",
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const stats = [
    {
      title: "Portfolio Value",
      value: "$24,580",
      change: "+12.5%",
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: "Monthly Savings",
      value: "$1,250",
      change: "+5.2%",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Investment Return",
      value: "8.4%",
      change: "+2.1%",
      icon: <BarChart3 className="h-5 w-5" />
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋
            </h1>
            <p className="text-gray-600">
              Here's your financial overview and quick access to your favorite tools.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <div className="p-3 bg-finance-blue/10 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-lg mb-4 ${action.color}`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium">Investment Calculator Used</p>
                    <p className="text-sm text-gray-600">Calculated returns for $10,000 investment</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium">Budget Updated</p>
                    <p className="text-sm text-gray-600">Monthly budget plan revised</p>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Loan Calculator Used</p>
                    <p className="text-sm text-gray-600">Mortgage calculation for $300,000</p>
                  </div>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
