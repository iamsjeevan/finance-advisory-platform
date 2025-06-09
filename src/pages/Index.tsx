
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import { Calculator, TrendingUp, Shield, Users, BarChart3, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

const Index = () => {
  const features = [
    {
      icon: Calculator,
      title: "Financial Calculators",
      description: "Comprehensive tools for loan calculations, investment planning, and budget tracking."
    },
    {
      icon: TrendingUp,
      title: "Investment Tracking",
      description: "Monitor your portfolio performance with real-time market data and analytics."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is protected with bank-level security and encryption."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Access to financial advisors and personalized recommendations."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed insights and reports to help you make informed financial decisions."
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Set and track your financial goals with our intelligent planning tools."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "This platform transformed how I manage my business finances. The calculators are incredibly accurate and easy to use.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      role: "Investment Analyst",
      content: "The investment tracking features are top-notch. I can monitor all my portfolios in one place with real-time updates.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Emily Rodriguez",
      role: "Financial Planner",
      content: "I recommend this tool to all my clients. The budget planning features have helped them achieve their financial goals faster.",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <MainLayout>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Financial Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and insights to help you make informed financial decisions and achieve your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-finance-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making smarter financial decisions with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="min-w-[200px]">
                Get Started Free
              </Button>
            </Link>
            <Link to="/tools">
              <Button size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white hover:text-finance-blue">
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from people who've transformed their financial lives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
