//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { action } from "@storybook/addon-actions";
import { type Meta, type StoryObj } from "@storybook/react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/Dialog";
import {
  ConsentDialog,
  ConsentDialogContent,
  ConsentDialogCheckbox,
  ConsentDialogSubmit,
} from "./ConsentDialog";

const meta: Meta<typeof ConsentDialog> = {
  title: "Molecules/ConsentDialog",
  component: ConsentDialog,
};

export default meta;

type Story = StoryObj<typeof ConsentDialog>;

export const Default: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <ConsentDialog {...args}>
      <DialogHeader>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogDescription>
          Please read and accept the terms before proceeding
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <p>
          Acme Inc. collects and processes your personal data to provide you
          with our services and improve your experience. By clicking "I
          Consent", you agree to our processing of your personal data as
          described in our Privacy Policy, which includes:
        </p>
        <ul>
          <li>Collection of usage data to improve our services</li>
          <li>Processing of account information for service provision</li>
        </ul>
        <p>
          You can withdraw your consent at any time through your account
          settings or by contacting our support team.
        </p>
      </div>
      <ConsentDialogCheckbox label="I have read and agree to the terms and conditions" />
      <ConsentDialogSubmit onClick={action("onSubmit")}>
        Accept
      </ConsentDialogSubmit>
    </ConsentDialog>
  ),
};

export const LongContent: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <ConsentDialog {...args}>
      <DialogHeader>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogDescription>Please review our privacy policy</DialogDescription>
      </DialogHeader>
      <ConsentDialogContent>
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        ))}
      </ConsentDialogContent>
      <ConsentDialogCheckbox label="I have read and agree to the privacy policy" />
      <ConsentDialogSubmit onClick={action("onSubmit")}>
        Accept
      </ConsentDialogSubmit>
    </ConsentDialog>
  ),
};
