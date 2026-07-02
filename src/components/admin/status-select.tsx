"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export function StatusSelect({
  id,
  current,
  options,
  action,
}: {
  id: string;
  current: string;
  options: string[];
  action: (id: string, status: string) => Promise<void>;
}) {
  const [pending, start] = useTransition();
  return (
    <span className="inline-flex items-center gap-2">
      <select
        defaultValue={current}
        disabled={pending}
        onChange={(e) => start(() => action(id, e.target.value))}
        className="rounded-lg border border-line bg-white px-2 py-1.5 text-xs font-medium text-ink focus:border-brand-500 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted" />}
    </span>
  );
}
