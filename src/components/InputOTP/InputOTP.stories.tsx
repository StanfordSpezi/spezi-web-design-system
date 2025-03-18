//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { Input } from "@/components/Input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPRoot,
  InputOTPSeparator,
  InputOTPSlot,
} from "./InputOTP";

const meta: Meta<typeof InputOTP> = {
  title: "Components/InputOTP",
  component: InputOTP,
};

export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Default: Story = { args: { maxLength: 6 } };

export const Custom = () => (
  <div className="flex gap-2">
    <Input />
    <InputOTPRoot maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTPRoot>
  </div>
);
