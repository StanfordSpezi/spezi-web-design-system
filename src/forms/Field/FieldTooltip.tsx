//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Info } from 'lucide-react'
import { Tooltip } from '@/components/Tooltip'
import { type FieldProps } from '@/forms'
import { ensureString } from '@/utils/misc'

interface FieldTooltipProps extends Pick<FieldProps, 'tooltip' | 'label'> {
  id: string
}

export const FieldTooltip = ({ tooltip, label, id }: FieldTooltipProps) => (
  <Tooltip tooltip={tooltip} open={true}>
    <button
      type="button"
      className="focus-ring rounded-md"
      aria-label={[
        'More information about the',
        ensureString(label) ?? id,
        'field',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Info className="size-4 text-muted-foreground" />
    </button>
  </Tooltip>
)
