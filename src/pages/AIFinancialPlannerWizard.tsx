
import MainLayout from "../layouts/MainLayout";
import { WizardProgress } from "@/components/financial-planner/WizardProgress";
import { WizardContent } from "@/components/financial-planner/WizardContent";
import { FinancialPlannerProvider } from "@/context/FinancialPlannerContext";

const AIFinancialPlannerWizard = () => {
  return (
    <MainLayout>
      <FinancialPlannerProvider>
        <div className="container max-w-4xl px-4 pt-24 pb-16 mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">AI Financial Planner</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Complete this step-by-step form to receive a personalized financial plan tailored to your goals and situation.
            </p>
          </div>
          
          <WizardProgress />
          <WizardContent />
        </div>
      </FinancialPlannerProvider>
    </MainLayout>
  );
};

export default AIFinancialPlannerWizard;
