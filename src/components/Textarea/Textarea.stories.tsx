//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Empty: Story = { args: { value: '' } }
export const Placeholder: Story = {
  args: { placeholder: 'example@example.com' },
}
export const Value: Story = {
  args: { value: 'John Doe' },
}
