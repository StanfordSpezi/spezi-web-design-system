//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { SeparatorText as SeparatorTextComponent } from "../SeparatorText";
import { DashedSeparator } from "./DashedSeparator";

const meta: Meta<typeof DashedSeparator> = {
  title: "Components/Separator/DashedSeparator",
  component: DashedSeparator,
};

export default meta;

export const Default = () => (
  <div className="w-96">
    <DashedSeparator />
  </div>
);

export const CustomStyleProps = () => (
  <div className="w-96">
    <DashedSeparator
      dashColor="var(--color-primary)"
      dashSize="8px"
      dashGap="10%"
    />
  </div>
);

export const CustomStyleClassNames = () => (
  <div className="w-96">
    <DashedSeparator className="[--dash-color:theme(colors.red.500)] [--dash-gap:theme(spacing.3)] [--dash-size:theme(spacing.4)]" />
  </div>
);

export const SeparatorText = () => (
  <div className="w-96">
    <DashedSeparator>
      <SeparatorTextComponent>Something</SeparatorTextComponent>
    </DashedSeparator>
  </div>
);
