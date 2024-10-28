//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { RangeCounter } from './RangeCounter'

const meta: Meta<typeof RangeCounter> = {
  title: 'Components/RangeCounter',
  component: RangeCounter,
}

export default meta

type Story = StoryObj<typeof RangeCounter>

export const Default: Story = {
  args: {
    start: 1,
    end: 9,
    all: 20,
  },
}
