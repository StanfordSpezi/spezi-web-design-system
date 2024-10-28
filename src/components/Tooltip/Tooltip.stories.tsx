//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    children: <button type="button">Trigger</button>,
    tooltip: 'Tooltip',
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    tooltip: (
      <span>
        Tooltip <b>text</b>
      </span>
    ),
  },
}

export const Bottom: Story = {
  args: {
    side: 'bottom',
  },
}

export const Offset: Story = {
  args: {
    sideOffset: 20,
  },
}

export const Delayed: Story = {
  args: {
    delayDuration: 500,
  },
}
