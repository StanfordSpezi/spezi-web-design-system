//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/**
 * Default localStorage key used to persist the theme preference.
 */
export const DEFAULT_THEME_STORAGE_KEY = "spezi-theme";

/**
 * Returns a blocking script string that prevents flash of wrong theme (FOUC).
 *
 * Embed the returned string in a `<script>` tag in the `<head>` of your HTML,
 * before any stylesheets. This reads the user's saved theme preference from
 * localStorage and applies the `data-theme` attribute immediately, before
 * the first paint.
 *
 * @param storageKey - localStorage key to read from. Defaults to {@link DEFAULT_THEME_STORAGE_KEY}.
 *
 * @example
 * ```tsx
 * // In a Next.js layout:
 * import { getThemeScript } from "@stanfordspezi/spezi-web-design-system";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
export const getThemeScript = (
  storageKey: string = DEFAULT_THEME_STORAGE_KEY,
): string =>
  `(function(){try{var t=localStorage.getItem("${storageKey}");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}})()`;
