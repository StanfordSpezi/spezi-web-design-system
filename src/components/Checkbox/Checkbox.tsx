import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'
import { cn } from '@/utils/className'

type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'focus-ring flex-center peer size-4 shrink-0 rounded border border-input disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex-center size-2.5 rounded-sm bg-primary" />
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName
