//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { User } from "@firebase/auth-types";
import { type Auth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

/**
 * Returns currently authenticated user
 * null = no user is authenticated
 * undefined = initial state
 * */
export const useAuthUser = (auth: Auth) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // @ts-expect-error Nested methods are not used anyway
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return user;
};
