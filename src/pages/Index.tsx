import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ShieldCheck, 
  PieChart, 
  TrendingUp, 
  LineChart, 
  Target, 
  Calculator,
  BarChart3,
  Wallet
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import StockChart from '@/components/StockChart';
import NewsCard from '@/components/NewsCard';
import TestimonialCard from '@/components/TestimonialCard';

// Mock financial news
const financialNews = [
  {
    id: 1,
    title: 'Fed Signals Potential Rate Cuts as Inflation Eases',
    excerpt: 'The Federal Reserve has indicated it may begin cutting interest rates in the coming months as inflation shows signs of returning to its 2% target.',
    category: 'Economy',
    date: 'May 15, 2023',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    id: 2,
    title: 'Tech Stocks Rally Amid Strong Earnings Reports',
    excerpt: 'Major technology companies exceeded earnings expectations this quarter, driving a significant rally in the tech sector and broader market gains.',
    category: 'Markets',
    date: 'May 12, 2023',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
  {
    id: 3,
    title: 'Sustainable Investing: ESG Funds See Record Inflows',
    excerpt: 'Environmental, Social, and Governance (ESG) funds have attracted record investment this year as investors increasingly prioritize sustainability.',
    category: 'Investing',
    date: 'May 10, 2023',
    image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=800&q=80',
    url: '#',
  },
];

// Mock testimonials
const testimonials = [
  {
    id: 1,
    quote: "The AI-powered recommendations transformed my financial strategy. I've seen a 22% increase in my portfolio value in just six months.",
    author: "Sarah Johnson",
    role: "Small Business Owner",
    rating: 5,
  },
  {
    id: 2,
    quote: "As someone who knew nothing about investing, this platform made financial planning accessible and straightforward. The personalized advice is invaluable.",
    author: "Michael Chen",
    role: "Software Engineer",
    rating: 5,
  },
  {
    id: 3,
    quote: "The tax optimization suggestions alone saved me over $3,000 last year. The interface is intuitive and the advice is always practical.",
    author: "Priya Patel",
    role: "Marketing Director",
    rating: 4,
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1]
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Intelligent Financial Planning</h2>
            <p className="text-lg text-muted-foreground">
              Our AI-powered platform analyzes your financial data to provide personalized recommendations and insights, helping you make informed decisions.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <FeatureCard
                icon={<ShieldCheck size={24} />}
                title="Secure Analysis"
                description="Your financial data is analyzed with bank-level security and encryption, ensuring complete privacy and protection."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard
                icon={<PieChart size={24} />}
                title="Portfolio Optimization"
                description="Receive tailored investment recommendations based on your risk tolerance, goals, and market conditions."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard
                icon={<TrendingUp size={24} />}
                title="Performance Tracking"
                description="Monitor your financial progress with real-time updates and comprehensive performance metrics."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard
                icon={<Calculator size={24} />}
                title="Tax Optimization"
                description="Minimize your tax burden with strategic recommendations for tax-efficient investing and planning."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-finance-light-grey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Our platform simplifies financial planning through a personalized, data-driven approach.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 rounded-full bg-finance-blue/10 flex items-center justify-center text-finance-blue mx-auto mb-6">
                <Wallet size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">1. Connect Your Accounts</h3>
              <p className="text-muted-foreground">
                Securely link your financial accounts or upload your passbook to provide a comprehensive view of your finances.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 rounded-full bg-finance-blue/10 flex items-center justify-center text-finance-blue mx-auto mb-6">
                <LineChart size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">2. Get Personalized Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your spending patterns, income, debts, and investment portfolio to identify optimization opportunities.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 rounded-full bg-finance-blue/10 flex items-center justify-center text-finance-blue mx-auto mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-medium mb-3">3. Implement Recommendations</h3>
              <p className="text-muted-foreground">
                Follow tailored action plans for investments, savings, insurance, and tax strategies to achieve your financial goals.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Button size="lg" asChild>
              <Link to="/register" className="px-6">
                Start Your Financial Journey
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Market Insights</h2>
            <p className="text-lg text-muted-foreground">
              Stay informed with real-time market data and expert analysis to make timely investment decisions.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <StockChart />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col justify-between">
              <div className="glass rounded-xl p-6 mb-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Market Overview</h3>
                  <Badge variant="outline" className="text-xs">Live</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BarChart3 size={16} className="mr-2 text-finance-blue" />
                      <span className="text-sm">S&P 500</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">4,782.82</span>
                      <span className="text-xs text-green-500 ml-2">+0.63%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BarChart3 size={16} className="mr-2 text-finance-blue" />
                      <span className="text-sm">Nasdaq</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">16,742.39</span>
                      <span className="text-xs text-green-500 ml-2">+1.05%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BarChart3 size={16} className="mr-2 text-finance-blue" />
                      <span className="text-sm">Dow Jones</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">38,226.38</span>
                      <span className="text-xs text-green-500 ml-2">+0.42%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BarChart3 size={16} className="mr-2 text-finance-blue" />
                      <span className="text-sm">Russell 2000</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">2,042.49</span>
                      <span className="text-xs text-red-500 ml-2">-0.28%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Upcoming Events</h3>
                  <button className="text-xs text-finance-blue">View All</button>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-finance-blue pl-3">
                    <p className="text-xs text-muted-foreground">May 20, 2023</p>
                    <p className="text-sm font-medium">Fed Interest Rate Decision</p>
                  </div>
                  <div className="border-l-2 border-finance-indigo pl-3">
                    <p className="text-xs text-muted-foreground">May 22, 2023</p>
                    <p className="text-sm font-medium">Retail Sales Report</p>
                  </div>
                  <div className="border-l-2 border-gray-300 pl-3">
                    <p className="text-xs text-muted-foreground">May 25, 2023</p>
                    <p className="text-sm font-medium">GDP Growth Rate Q1 Final</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Financial News Section */}
      <section className="py-20 bg-finance-light-grey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6 md:mb-0">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Latest Financial News</h2>
              <p className="text-lg text-muted-foreground">
                Stay updated with the latest developments in the financial world.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button variant="outline" asChild>
                <Link to="/news">
                  View All News
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {financialNews.map((news) => (
              <motion.div key={news.id} variants={fadeInUp}>
                <NewsCard
                  title={news.title}
                  excerpt={news.excerpt}
                  category={news.category}
                  date={news.date}
                  image={news.image}
                  url={news.url}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">
              Hear from users who have transformed their financial futures with our platform.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={fadeInUp}>
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  rating={testimonial.rating}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Button size="lg" asChild>
              <Link to="/testimonials" className="px-6">
                Read More Testimonials
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-finance-blue to-finance-indigo text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands of users who have already transformed their finances with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-white text-finance-blue hover:bg-white/90 px-6" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-6" asChild>
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
