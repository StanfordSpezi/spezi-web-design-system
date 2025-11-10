//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

const {
  getEslintReactConfig,
} = require("@stanfordspezi/spezi-web-configurations");
const jsdoc = require("eslint-plugin-jsdoc");

module.exports = [
  ...getEslintReactConfig({ tsconfigRootDir: __dirname }),
  {
    files: ["**/*.{js,ts,tsx}"],
    plugins: {
      jsdoc,
    },
    rules: {
      "jsdoc/no-multi-asterisks": "error",
    },
  },
];
