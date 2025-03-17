
import { ReactNode } from "react";

interface StepHeaderProps {
  icon: ReactNode;
  title: string;
}

export const StepHeader = ({ icon, title }: StepHeaderProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};
