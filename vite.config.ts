//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

/// <reference types="vitest" />
/// <reference types="vite/client" />
import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

/**
 * Tuple of [package name, package entry point]
 * */
const entires = [
  ['index', 'src/index.ts'],
  ['SpeziProvider', 'src/SpeziProvider.tsx'],
  ['forms', 'src/forms/index.tsx'],
  ...fs
    .readdirSync(path.resolve(__dirname, `src/components`))
    .map((name) => [`components/${name}`, `src/components/${name}/index.tsx`]),
  ...fs
    .readdirSync(path.resolve(__dirname, `src/molecules`))
    .map((name) => [`molecules/${name}`, `src/molecules/${name}/index.tsx`]),
  ...fs
    .readdirSync(path.resolve(__dirname, `src/modules`))
    .map((name) => [`modules/${name}`, `src/modules/${name}/index.tsx`]),
  ...fs
    .readdirSync(path.resolve(__dirname, `src/utils`))
    .map((name) => [`utils/${name}`, `src/utils/${name}/index.ts`]),
]

export default defineConfig({
  root: '.',
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        ...Object.fromEntries(
          entires.map((entry) => [entry[0], path.resolve(__dirname, entry[1])]),
        ),
      },
      name: '@stanfordbdhg/spezi-web-design-system',
      fileName: (format, name) => {
        if (format === 'es') return `${name}.js`
        return `${name}.${format}`
      },
    },
    rollupOptions: {
      external: ['react', 'next-intl', 'react/jsx-runtime', 'react-dom'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./testSetup.ts'],
  },
})
