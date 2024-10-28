//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { Avatar, avatarVariants } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: Object.keys(avatarVariants.size),
      control: { type: 'select' },
    },
  },
  args: { name: 'John Doe' },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    src: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png',
  },
}

export const UserInitials: Story = {}

export const CustomFallback: Story = {
  args: {
    fallback: <span>🎉</span>,
    name: undefined,
  },
}

export const SM: Story = { args: { size: 'sm' } }
export const LG: Story = { args: { size: 'lg' } }
