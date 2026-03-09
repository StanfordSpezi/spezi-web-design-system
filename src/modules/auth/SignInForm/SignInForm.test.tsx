//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, screen } from "@testing-library/react";
import { type Auth, type AuthProvider } from "firebase/auth";
import { vitest } from "vitest";
import { renderWithProviders } from "@/tests/helpers";
import { SignInForm } from "./SignInForm";

const authMock = {} as Auth;
const providerMock = {} as AuthProvider;
const providersMock = [{ name: "Lorem", provider: providerMock }];
const signInWithPopupMock = vitest.fn();
const signInWithEmailAndPasswordMock = vitest.fn();

const defaultProps = {
  enableEmailPassword: false,
  providers: providersMock,
  auth: authMock,
  signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
  signInWithPopup: signInWithPopupMock,
};

vitest.mock("firebase/auth");

describe("SignInForm", () => {
  beforeEach(() => {
    vitest.resetAllMocks();
  });

  it("renders SSO providers and calls signInWithPopup", () => {
    renderWithProviders(<SignInForm {...defaultProps} />);

    const ssoButton = screen.getByRole("button", {
      name: "Sign in with Lorem",
    });
    fireEvent.click(ssoButton);

    expect(signInWithPopupMock).toHaveBeenCalled();
  });

  it("renders email password form", () => {
    renderWithProviders(
      <SignInForm
        {...defaultProps}
        enableEmailPassword={true}
        providers={[]}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders separator only if has providers and email password", () => {
    const { rerender } = renderWithProviders(
      <SignInForm
        {...defaultProps}
        enableEmailPassword={true}
        providers={[]}
      />,
    );

    expect(screen.queryByText("or")).not.toBeInTheDocument();

    rerender(<SignInForm {...defaultProps} enableEmailPassword={true} />);

    expect(screen.queryByText("or")).toBeInTheDocument();
  });

  it("renders icons", () => {
    renderWithProviders(
      <SignInForm
        {...defaultProps}
        enableEmailPassword={true}
        providers={[
          {
            name: "Lorem",
            provider: providerMock,
            icon: <span data-testid="icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("shows firebase error on SSO failure", async () => {
    const { FirebaseError } = await import("@firebase/app");
    const firebaseError = new FirebaseError(
      "auth/some-error",
      "Some firebase error",
    );
    signInWithPopupMock.mockRejectedValueOnce(firebaseError);

    renderWithProviders(<SignInForm {...defaultProps} />);

    const ssoButton = screen.getByRole("button", {
      name: "Sign in with Lorem",
    });
    fireEvent.click(ssoButton);

    const errorMessage = await screen.findByText(
      /Sign in error:.*auth\/some-error/,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows unknown error on non-firebase SSO failure", async () => {
    signInWithPopupMock.mockRejectedValueOnce(new Error("Network error"));

    renderWithProviders(<SignInForm {...defaultProps} />);

    const ssoButton = screen.getByRole("button", {
      name: "Sign in with Lorem",
    });
    fireEvent.click(ssoButton);

    const errorMessage = await screen.findByText(/Unknown error/);
    expect(errorMessage).toBeInTheDocument();
  });
});
