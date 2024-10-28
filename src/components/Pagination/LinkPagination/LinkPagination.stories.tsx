//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { LinkPagination } from './LinkPagination'

const meta: Meta<typeof LinkPagination> = {
  title: 'Components/Pagination/LinkPagination',
  component: LinkPagination,
}

export default meta

type Story = StoryObj<typeof LinkPagination>

export const Default: Story = {
  args: {
    total: 10,
    page: 5,
    getHref: (page) => `/${page}`,
  },
}
