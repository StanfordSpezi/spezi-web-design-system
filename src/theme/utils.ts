//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Color in `r g b` 8bit format
 * @example 255 255 255
 * */
type RGBColor = string;

/**
 * CSS size unit
 * @example 0.5rem
 * */
type Size = string;

/**
 * Interface of theme variables used by design-system
 * */
export interface Theme {
  [key: string]: string;
  surface: RGBColor;
  "surface-primary": RGBColor;
  foreground: RGBColor;
  card: RGBColor;
  "card-foreground": RGBColor;
  popover: RGBColor;
  "popover-foreground": RGBColor;
  primary: RGBColor;
  "primary-foreground": RGBColor;
  secondary: RGBColor;
  "secondary-foreground": RGBColor;
  muted: RGBColor;
  "muted-foreground": RGBColor;
  accent: RGBColor;
  "accent-foreground": RGBColor;
  border: RGBColor;
  input: RGBColor;
  destructive: RGBColor;
  "destructive-foreground": RGBColor;
  ring: RGBColor;
  radius: Size;
}
