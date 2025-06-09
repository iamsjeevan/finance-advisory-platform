import { ReactNode } from "react";

interface StepHeaderProps {
  icon: ReactNode;
  title: string;
}

export const StepHeader = ({ icon, title }: StepHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};
