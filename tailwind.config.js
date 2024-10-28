//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import tailwindCssAnimate from 'tailwindcss-animate'
import { tailwindColors } from './src/utils/tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: tailwindColors,
    },
  },
  plugins: [tailwindCssAnimate],
  corePlugins: {
    preflight: false,
  },
}
