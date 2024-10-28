//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { AsideBrandLayout } from './AsideBrandLayout'

const meta: Meta<typeof AsideBrandLayout> = {
  title: 'Molecules/AsideBrandLayout',
  component: AsideBrandLayout,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof AsideBrandLayout>

export const Default: Story = {
  args: { aside: 'Aside content', children: 'Main content' },
}
