import { clsx } from 'clsx';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8',
        className
      )}
    >
      <div>
        <h1
          className="text-2xl font-bold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
