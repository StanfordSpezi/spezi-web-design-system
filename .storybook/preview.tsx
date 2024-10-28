//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
import { Preview } from '@storybook/react'
import { lightTheme } from '../src'
import { useEffect } from 'react'

import '../src/main.css'
/**
 * We need to import preflight in Stories,
 * because that's how components are required to be consumed in client-land
 * */
import './preflight.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Set theme variables
      useEffect(() => {
        Object.entries(lightTheme).forEach(([key, value]) => {
          if (typeof value === 'string') {
            window.document.documentElement.style.setProperty(`--${key}`, value)
          }
        })
      }, [])

      return <Story />
    },
  ],
}

export default preview
