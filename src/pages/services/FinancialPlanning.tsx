
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChartLine, DollarSign, TrendingUp, Calendar } from "lucide-react";

const FinancialPlanning = () => {
  return (
    <MainLayout>
      <div className="container px-4 sm:px-6 py-24 mx-auto">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Financial Planning Services</h1>
          <p className="text-xl text-muted-foreground">
            Create a roadmap to achieve your financial goals with our comprehensive planning services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ChartLine className="text-finance-blue h-6 w-6" />
              Our Approach
            </h2>
            <p className="mb-4">
              Our financial planning services take a holistic view of your current financial situation, future goals, and the steps needed to bridge that gap. We believe in creating personalized plans that adapt to your changing life circumstances.
            </p>
            <p>
              Through a collaborative process, we'll analyze your income, expenses, assets, and liabilities to develop strategies that maximize your financial potential while minimizing risks.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Our Planning Services?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <DollarSign className="text-finance-blue h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Comprehensive assessment of your current financial health</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="text-finance-blue h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Goal-oriented strategies tailored to your specific needs</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="text-finance-blue h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Regular reviews and adjustments as your life evolves</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Financial Planning Process</h2>
          
          <div className="space-y-8">
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-medium mb-3">1. Discovery Meeting</h3>
              <p>
                We begin with a comprehensive discussion about your current financial situation, goals, challenges, and aspirations. This allows us to understand your unique needs and priorities.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-medium mb-3">2. Analysis & Strategy Development</h3>
              <p>
                Our team analyzes your financial data and develops personalized strategies to help you achieve your goals while addressing any challenges or obstacles.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-medium mb-3">3. Plan Presentation & Implementation</h3>
              <p>
                We present a comprehensive financial plan with clear action steps and collaborate with you to implement the recommended strategies.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-medium mb-3">4. Ongoing Monitoring & Adjustments</h3>
              <p>
                Financial planning is not a one-time event. We continuously monitor your progress and make necessary adjustments as your life circumstances change.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="mb-6 text-lg">
              Ready to take control of your financial future?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/ai-financial-planner">Try Our AI Financial Planner</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FinancialPlanning;
