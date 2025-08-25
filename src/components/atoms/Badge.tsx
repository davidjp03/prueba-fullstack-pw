import { Badge as ShadcnBadge } from "@/components/ui/badge";

interface BadgeProps {
  type: "INCOME" | "EXPENSE";
}

export default function Badge({ type }: BadgeProps) {
  const variant = type === "INCOME" ? "success" : "danger";

  return (
    <ShadcnBadge variant={variant}>
      {type}
    </ShadcnBadge>
  );
}