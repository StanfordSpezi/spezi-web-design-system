//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from '@storybook/react'
import { RadioGroup, Radio } from './Radio'
import { SideLabel } from '../SideLabel'

const meta: Meta = {
  title: 'Components/Radio',
}

export default meta

export const Default = () => (
  <RadioGroup defaultValue="default" aria-label="View density">
    <SideLabel label="Default">
      <Radio value="1" id="r1"></Radio>
    </SideLabel>
    <SideLabel label="Second Choice">
      <Radio value="2" id="r2"></Radio>
    </SideLabel>
  </RadioGroup>
)
