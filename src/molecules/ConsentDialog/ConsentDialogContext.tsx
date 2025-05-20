//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { createContext, useContext } from "react";

interface ConsentDialogContextValue {
  /**
   * Whether the consent checkbox is checked.
   */
  isChecked: boolean;
  /**
   * Function to update the consent checkbox state.
   */
  setIsChecked: (checked: boolean) => void;
}

export const ConsentDialogContext =
  createContext<ConsentDialogContextValue | null>(null);

/**
 * Hook to access the ConsentDialog context.
 *
 * @throws If used outside of a ConsentDialog component
 */
export const useConsentDialog = () => {
  const context = useContext(ConsentDialogContext);
  if (!context) {
    throw new Error(
      "ConsentDialog components must be used within ConsentDialog",
    );
  }
  return context;
};
