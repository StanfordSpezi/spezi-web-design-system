//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from '@storybook/react'
import { StateContainer } from './StateContainer'

const meta: Meta<typeof StateContainer> = {
  title: 'Components/StateContainer',
  component: StateContainer,
}

export default meta

export const Default = () => (
  <StateContainer className="bg-amber-400">...</StateContainer>
)

export const Grow = () => (
  <div className="size-80">
    <StateContainer className="bg-amber-400" grow>
      ...
    </StateContainer>
  </div>
)
