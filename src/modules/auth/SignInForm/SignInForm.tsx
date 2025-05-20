//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { FirebaseError } from "@firebase/app";
import {
  type Auth,
  type AuthProvider,
  type signInWithPopup,
  type signInWithEmailAndPassword,
} from "firebase/auth";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { Button, type ButtonProps } from "@/components/Button";
import { Separator, SeparatorText } from "@/components/Separator";
import { FormError } from "@/forms";
import { cn } from "@/utils/className";
import { EmailPasswordForm } from "./EmailPasswordForm";

export const messages = {
  signIn_title: "Sign In",
  signIn_provider: "Sign in with {provider}",
  signIn_separator: "or",
  signIn_field_email: "Email",
  signIn_field_password: "Password",
  signIn_submit: "Sign In",
  signIn_formError_firebase: "Sign in error: {code}. Please try again.",
  signIn_formError_unknown: "Unknown error. Please try again.",
  signIn_formError_invalidCredentials:
    "Provided credentials are wrong. Please try again.",
};

export interface SignInFormProps {
  /**
   * Firebase's Auth object.
   */
  auth: Auth;
  /**
   * List of SSO providers.
   */
  providers: Array<{
    provider: AuthProvider;
    name: string;
    icon?: ReactNode;
  }>;
  /**
   * If false, the email/password form will not be displayed.
   * Can be used for showing email/password form just for dev environments.
   *
   * @default true
   */
  enableEmailPassword?: boolean;
  /**
   * Firebase's signInWithPopup function.
   */
  signInWithPopup: typeof signInWithPopup;
  /**
   * Firebase's signInWithEmailAndPassword function.
   */
  signInWithEmailAndPassword: typeof signInWithEmailAndPassword;
  className?: string;
  /**
   * Size of submit and SSO buttons.
   */
  buttonSize?: ButtonProps["size"];
}

/**
 * Complete Sign In Form component for Firebase.
 */
export const SignInForm = ({
  auth,
  providers,
  enableEmailPassword = true,
  className,
  signInWithPopup,
  signInWithEmailAndPassword,
  buttonSize = "default",
}: SignInFormProps) => {
  const [ssoFormError, setSsoFormError] = useState<string>();
  const t = useTranslations();
  return (
    <div className={cn("grid gap-4", className)}>
      <h1 className="mb-4 text-center text-2xl font-bold">
        {t("signIn_title")}
      </h1>
      <FormError formError={ssoFormError} />
      {providers.map((provider) => (
        <Button
          key={provider.name}
          variant="outlineBg"
          size={buttonSize}
          onClick={async () => {
            setSsoFormError(undefined);
            try {
              await signInWithPopup(auth, provider.provider);
            } catch (error) {
              if (
                error instanceof FirebaseError &&
                error.code !== "auth/popup-closed-by-user"
              ) {
                setSsoFormError(
                  t("signIn_formError_firebase", { code: error.code }),
                );
              } else {
                setSsoFormError(t("signIn_formError_unknown"));
              }
            }
          }}
        >
          {provider.icon && (
            <span className={cn("flex", buttonSize === "lg" ? "h-8" : "h-6")}>
              {provider.icon}
            </span>
          )}
          {t("signIn_provider", { provider: provider.name })}
        </Button>
      ))}
      {enableEmailPassword && (
        <>
          {providers.length > 0 && (
            <Separator className="my-5">
              <SeparatorText>{t("signIn_separator")}</SeparatorText>
            </Separator>
          )}
          <EmailPasswordForm
            auth={auth}
            signInWithEmailAndPassword={signInWithEmailAndPassword}
            buttonSize={buttonSize}
          />
        </>
      )}
    </div>
  );
};
