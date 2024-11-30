//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import * as CheckboxPrimitives from '@radix-ui/react-checkbox'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'
import { cn } from '../../utils/className'
import { CheckIcon } from 'lucide-react'

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitives.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitives.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitives.Root
    className={cn(
      'hover:bg-violet3 flex size-[25px] appearance-none items-center justify-center rounded bg-white shadow-[0_0_0_2px_black] outline-none',
      className,
    )}
    {...props}
    ref={ref}
  >
    <CheckboxPrimitives.Indicator>
      <CheckIcon />
    </CheckboxPrimitives.Indicator>
  </CheckboxPrimitives.Root>
))
