import { 
  BarChart, 
  DollarSign, 
  FileText, 
  Home, 
  PiggyBank, 
  Target 
} from "lucide-react";
import { WizardStep } from "@/types/financialPlanner";

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'personal',
    title: 'Personal',
    description: 'Tell us about yourself',
    icon: <Home className="h-5 w-5" />
  },
  {
    id: 'income',
    title: 'Income',
    description: 'Your monthly earnings',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    id: 'expenses',
    title: 'Expenses',
    description: 'Your monthly spending',
    icon: <BarChart className="h-5 w-5" />
  },
  {
    id: 'investments',
    title: 'Investments',
    description: 'Your financial assets',
    icon: <PiggyBank className="h-5 w-5" />
  },
  {
    id: 'goals',
    title: 'Goals',
    description: 'What you want to achieve',
    icon: <Target className="h-5 w-5" />
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Additional details',
    icon: <FileText className="h-5 w-5" />
  }
];
