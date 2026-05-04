import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-purple-500/15 text-purple-300 border border-purple-500/25",
        blue: "bg-blue-500/15 text-blue-300 border border-blue-500/25",
        cyan: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
        green: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
        orange: "bg-orange-500/15 text-orange-300 border border-orange-500/25",
        red: "bg-red-500/15 text-red-300 border border-red-500/25",
        subtle:
          "bg-white/[0.05] text-slate-400 border border-white/[0.08]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
