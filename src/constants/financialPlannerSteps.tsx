
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
    title: 'Personal Details',
    description: 'Tell us about yourself',
    icon: <Home className="h-5 w-5" />
  },
  {
    id: 'income',
    title: 'Income Details',
    description: 'Your monthly earnings',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    id: 'expenses',
    title: 'Expense Details',
    description: 'Your monthly spending',
    icon: <BarChart className="h-5 w-5" />
  },
  {
    id: 'investments',
    title: 'Investment & Savings',
    description: 'Your financial assets',
    icon: <PiggyBank className="h-5 w-5" />
  },
  {
    id: 'goals',
    title: 'Financial Goals',
    description: 'What you want to achieve',
    icon: <Target className="h-5 w-5" />
  },
  {
    id: 'documents',
    title: 'Documents & Information',
    description: 'Additional details that help us',
    icon: <FileText className="h-5 w-5" />
  }
];
