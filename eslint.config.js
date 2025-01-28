//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
const { getEslintConfig } = require("@stanfordspezi/spezi-web-configurations");

module.exports = getEslintConfig({ tsconfigRootDir: __dirname });
