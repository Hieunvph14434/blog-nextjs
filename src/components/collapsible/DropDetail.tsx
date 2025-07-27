'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

interface DropDetailProps {
  label: string | React.ReactNode;
  children: React.ReactNode;
}

export function DropDetail({ children, label }: DropDetailProps) {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="cursor-pointer w-full flex items-center justify-between px-3 py-2 border border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-md transition-colors"
        >
          {label &&
            (typeof label === 'string' ? (
              <div className="text-lg font-semibold text-left">{label}</div>
            ) : (
              label
            ))}

          <div>
            {open ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1 text-sm text-muted-foreground mx-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
