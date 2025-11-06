<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Biodesign Digital Health Spezi Web Design System

[![Build and Test](https://github.com/StanfordSpezi/spezi-web-design-system/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/spezi-web-design-system/actions/workflows/build-and-test.yml)
[![Deployment](https://github.com/StanfordSpezi/spezi-web-design-system/actions/workflows/deployment.yml/badge.svg)](https://github.com/StanfordSpezi/spezi-web-design-system/actions/workflows/deployment.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/spezi-web-design-system/graph/badge.svg?token=dfQW5eZ2up)](https://codecov.io/gh/StanfordSpezi/spezi-web-design-system)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.10052055.svg)](https://doi.org/10.5281/zenodo.10052055)

An opinionated, feature-rich kit for rapid application development. Built on modern standards (Radix UI, Tailwind CSS) with sensible defaults, yet with flexible escape hatches to customize deeply when needed.

## Overview

Spezi Web Design System is a general-purpose component and utilities library designed to accelerate web application development by providing well-tested, comprehensive, accessible, and type-safe components out of the box. It strikes a balance between opinionated defaults and customization flexibility - enabling developers to focus on building features rather than implementing UI patterns, while maintaining the option to take ownership when needed.

The library enforces a consistent design language, includes robust state management patterns, and provides a comprehensive set of utilities - handling UI complexity behind the scenes.

As part of the broader **Spezi Web ecosystem**, this library serves as the foundation for building applications that can be extended with specialized packages (like health-specific components) and bootstrapped with the [spezi-web-template-application](https://github.com/StanfordSpezi/spezi-web-template-application) for rapid project setup.

## Key Features

- **40+ Production-Ready Components** - Comprehensive library including atoms (Button, Input, Select), molecules (DashboardLayout, ConsentDialog, NotFound, Notifications), and utilities
- **Modern Tech Stack** - Built on Radix UI, Tailwind CSS, TypeScript, and React 19
- **Theming Support** - Customizable design tokens and theme configuration
- **Well-Tested** - High test coverage with Vitest and Testing Library
- **Feature-Rich** - Integrated form with validation, data fetching patterns, authentication, application shell, error handling, and more
- **Comprehensive Documentation** - Interactive Storybook with live examples
- **Type-Safe** - Full TypeScript coverage with strict typing for enhanced developer experience
- **Accessibility First** - WCAG-compliant components with built-in keyboard navigation and screen reader support
- **Battle-Tested** - Used in production by multiple Stanford projects

## Documentation

- 🚀 **[Getting Started](https://spezi.health/spezi-web-design-system/docs/docs/getting-started)** - Installation, setup, and usage guide
- 📚 **[Interactive Storybook](https://spezi.health/spezi-web-design-system/storybook)** - Browse components, view live examples, and experiment with props
- 📖 **[API Reference](https://spezi.health/spezi-web-design-system/docs/api/SpeziProvider)** - Detailed technical documentation and API reference
- 🏗️ **[Template Application](https://github.com/StanfordSpezi/spezi-web-template-application)** - Get started quickly with a complete application setup

## Spezi Web Ecosystem

Spezi Web Design System is part of a larger ecosystem of tools and packages:

### Related Packages

- **[spezi-web-configurations](https://github.com/StanfordSpezi/spezi-web-configurations)** - Shared ESLint, Prettier, and TypeScript configurations used across Spezi Web projects (including this library)
- **[spezi-web-template-application](https://github.com/StanfordSpezi/spezi-web-template-application)** - Complete application template that combines all Spezi Web packages for rapid project bootstrapping

## Used In Production

Real-world Stanford projects using this library:

- **[ENGAGE-HF Web Frontend](https://github.com/StanfordBDHG/ENGAGE-HF-Web-Frontend)** - Heart failure management platform for patients and healthcare providers
- **[Spezi Web Study Platform](https://github.com/StanfordSpezi/spezi-web-study-platform)** - Research study management and participant enrollment system
- **[RadGPT](https://github.com/StanfordBDHG/RadGPT)** - AI-powered radiology assistance tool

Refer to them if you need inspiration or guidance on how to use the library in your own projects.

## Getting Started

For detailed setup instructions, configuration, and usage examples, see the **[Getting Started guide](https://spezi.health/spezi-web-design-system/docs/docs/getting-started)**.

## Why Spezi?

Spezi Web Design System strikes a balance between highly opinionated frameworks and copy-paste patterns. We provide package-based distribution for automatic updates, strong opinions for faster development, and escape hatches when you need deep customization.

**[Read more about our rationale, comparisons with alternatives, and detailed trade-offs →](https://spezi.health/spezi-web-design-system/docs/docs/why-spezi)**

## Technology Stack

Built on modern standards: TypeScript, React 19, Tailwind CSS v4, and Radix UI. Includes integrations with React Hook Form, Zod, TanStack Table, and more.

**[View complete technology stack and rationale →](https://spezi.health/spezi-web-design-system/docs/docs/technology-stack)**

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/spezi-web-design-system/tree/main/LICENSES) for more information.

## Contributors

This project is developed as part of the Stanford Byers Center for Biodesign at Stanford University.
See [CONTRIBUTORS.md](https://github.com/StanfordSpezi/spezi-web-design-system/tree/main/CONTRIBUTORS.md) for a full list of all Spezi Web Design System contributors.

![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-light.png#gh-light-mode-only)
![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-dark.png#gh-dark-mode-only)
