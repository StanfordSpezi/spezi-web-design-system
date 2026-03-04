//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { type Auth, type AuthProvider } from "firebase/auth";
import { fn } from "storybook/test";
import { SignInForm } from "./SignInForm";

const authMock = {} as Auth;
const providerMock = {} as AuthProvider;

const meta: Meta<typeof SignInForm> = {
  title: "Modules/SignInForm",
  component: SignInForm,
  decorators: [
    (Story) => (
      <div className="w-sm">
        <Story />
      </div>
    ),
  ],
  args: {
    auth: authMock,
    signInWithPopup: fn(),
    signInWithEmailAndPassword: fn(),
    providers: [
      { name: "Google", provider: providerMock },
      { name: "Apple", provider: providerMock },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof SignInForm>;

/**
 * Default sign in form with SSO providers and email/password.
 */
export const Default: Story = {};

/**
 * Sign in form with only SSO providers, no email/password form.
 */
export const SsoOnly: Story = {
  args: {
    enableEmailPassword: false,
  },
};

/**
 * Sign in form with only email/password, no SSO providers.
 */
export const EmailPasswordOnly: Story = {
  args: {
    providers: [],
  },
};

/**
 * Sign in form with large buttons.
 */
export const LargeButtons: Story = {
  args: {
    buttonSize: "lg",
  },
};
