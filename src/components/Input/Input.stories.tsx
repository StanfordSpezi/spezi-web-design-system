//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
}

export default meta

type Story = StoryObj<typeof Input>

export const Empty: Story = { args: { value: '' } }
export const Placeholder: Story = {
  args: { placeholder: 'example@example.com' },
}
export const Value: Story = {
  args: { value: 'John Doe' },
}
