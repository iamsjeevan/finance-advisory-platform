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
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">AI Financial Planner</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
              Follow these steps to generate a personalized financial summary.
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