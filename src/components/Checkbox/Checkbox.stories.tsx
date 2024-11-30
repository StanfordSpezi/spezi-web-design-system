//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import { SideLabel } from '@/components/SideLabel'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    onCheckedChange: fn(),
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = { args: { checked: false } }

export const Chekced: Story = { args: { checked: true } }

export const Functional = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}

export const Labeled = () => (
  <SideLabel label="Show unread only">
    <Checkbox checked />
  </SideLabel>
)
