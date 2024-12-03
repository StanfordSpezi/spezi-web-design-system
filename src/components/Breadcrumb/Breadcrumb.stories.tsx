//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { times } from '@/utils/misc'
import {
  Breadcrumbs as BreadcrumbsComponent,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb'
import { mockBreadcrumbs } from './Breadcrumb.mocks'

const meta: Meta = {
  title: 'Components/Breadcrumb',
}

type Story = StoryObj<typeof BreadcrumbsComponent>

export default meta

export const Breadcrumbs: Story = {
  args: {
    maxToDisplay: 3,
  },
  render: (args) => (
    <>
      {times(mockBreadcrumbs.length, (index) => (
        <BreadcrumbsComponent
          {...args}
          breadcrumbs={mockBreadcrumbs.slice(0, index + 1)}
        />
      ))}
    </>
  ),
}

export const Primivites = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)
