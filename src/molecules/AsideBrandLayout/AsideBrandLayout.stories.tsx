//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import {
  AsideBrandLayoutRoot,
  AsideBrandLayoutAside,
  AsideBrandLayoutMain,
} from "./AsideBrandLayout";

const meta: Meta<typeof AsideBrandLayoutRoot> = {
  title: "Molecules/AsideBrandLayout",
  component: AsideBrandLayoutRoot,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AsideBrandLayoutRoot>;

const MockSignInForm = () => (
  <div className="w-full max-w-md space-y-6 p-2">
    <h2 className="text-3xl font-bold">Sign In</h2>
    <p className="text-muted-foreground">Sign in to your account to continue</p>
    <div className="space-y-4">
      <div className="bg-muted h-10 w-full rounded-md" />
      <div className="bg-muted h-10 w-full rounded-md" />
      <div className="bg-primary h-10 w-full rounded-md" />
    </div>
  </div>
);

/**
 * Basic structure of the aside brand layout.
 */
export const Simple: Story = {
  render: () => (
    <AsideBrandLayoutRoot>
      <AsideBrandLayoutAside>Aside content</AsideBrandLayoutAside>
      <AsideBrandLayoutMain>Main content</AsideBrandLayoutMain>
    </AsideBrandLayoutRoot>
  ),
};

/**
 * Branded layout example with Stanford logo and your application name.
 */
export const Branded: Story = {
  render: () => (
    <AsideBrandLayoutRoot>
      <AsideBrandLayoutAside>
        <h1 className="text-2xl font-bold">Spezi Web Design System</h1>
        <img
          src="https://biodesign.stanford.edu/_jcr_content/local-header/_jcr_content/custom-logo.img.full.high.png"
          alt="Stanford Byers Center for Biodesign Logo"
          className="w-40"
        />
      </AsideBrandLayoutAside>
      <AsideBrandLayoutMain>
        <MockSignInForm />
      </AsideBrandLayoutMain>
    </AsideBrandLayoutRoot>
  ),
};

/**
 * Gradient-filled aside.
 */
export const GradientAside: Story = {
  render: () => (
    <AsideBrandLayoutRoot>
      <AsideBrandLayoutAside className="bg-gradient-to-br from-purple-800 via-violet-900 to-blue-900" />
      <AsideBrandLayoutMain>
        <MockSignInForm />
      </AsideBrandLayoutMain>
    </AsideBrandLayoutRoot>
  ),
};

/**
 * Image-filled aside.
 */
export const ImageAside: Story = {
  render: () => (
    <AsideBrandLayoutRoot>
      <AsideBrandLayoutAside
        className="bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fm=jpg&q=60&w=3000)",
        }}
      />
      <AsideBrandLayoutMain>
        <MockSignInForm />
      </AsideBrandLayoutMain>
    </AsideBrandLayoutRoot>
  ),
};
