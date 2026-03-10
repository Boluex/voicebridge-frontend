import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-slate-800/50 p-12 text-center ${className}`}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-700/50">
        <Icon size={28} className="text-slate-500" />
      </div>
      <h3
        className="text-lg font-semibold text-white mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      {action}
    </div>
  );
}
