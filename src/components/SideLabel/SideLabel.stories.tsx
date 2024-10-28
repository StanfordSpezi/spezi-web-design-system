//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from '@storybook/react'
import { SideLabel } from './SideLabel'
import { Switch } from '../Switch'

const meta: Meta<typeof SideLabel> = {
  title: 'Components/SideLabel',
  component: SideLabel,
}

export default meta

export const WithSwitch = () => (
  <SideLabel label="Check me">
    <Switch />
  </SideLabel>
)

export const Reversed = () => (
  <SideLabel label="Check me" reverse>
    <Switch />
  </SideLabel>
)

export const NoInput = () => (
  <SideLabel label="Check me">
    <span className="hidden">input goes here</span>
  </SideLabel>
)
