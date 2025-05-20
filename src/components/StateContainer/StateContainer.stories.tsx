//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { StateContainer } from "./StateContainer";

const meta: Meta<typeof StateContainer> = {
  title: "Components/StateContainer",
  component: StateContainer,
};

export default meta;

/**
 * Background is just for presentation purposes.
 */
export const Default = () => (
  <StateContainer className="bg-accent">...</StateContainer>
);

/**
 * Background is just for presentation purposes.
 */
export const Grow = () => (
  <div className="size-80">
    <StateContainer className="bg-accent" grow>
      ...
    </StateContainer>
  </div>
);
