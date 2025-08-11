//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Color in `r g b` 8bit format.
 * @example 255 255 255
 */
type RGBColor = string;

/**
 * Interface of theme variables used by the design-system.
 */
export interface Theme {
  [key: string]: string;
  "color-surface": RGBColor;
  "color-surface-primary": RGBColor;
  "color-foreground": RGBColor;
  "color-card": RGBColor;
  "color-card-foreground": RGBColor;
  "color-popover": RGBColor;
  "color-popover-foreground": RGBColor;
  "color-primary": RGBColor;
  "color-primary-foreground": RGBColor;
  "color-secondary": RGBColor;
  "color-secondary-foreground": RGBColor;
  "color-muted": RGBColor;
  "color-muted-foreground": RGBColor;
  "color-accent": RGBColor;
  "color-accent-foreground": RGBColor;
  "color-border": RGBColor;
  "color-input": RGBColor;
  "color-destructive": RGBColor;
  "color-destructive-foreground": RGBColor;
  "color-success": RGBColor;
  "color-success-foreground": RGBColor;
  "color-warning": RGBColor;
  "color-warning-dark": RGBColor;
  "color-warning-foreground": RGBColor;
  "color-inverted": RGBColor;
  "color-inverted-foreground": RGBColor;
  "color-ring": RGBColor;
}
