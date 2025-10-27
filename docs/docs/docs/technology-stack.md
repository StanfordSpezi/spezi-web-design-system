---
sidebar_position: 2
---

# Technology Stack

Our technology stack is based on the production-proven open source libraries. We do not re-invent the wheel and use existing solutions that are widely adopted, well-tested, and well-documented. 

Frequently, you might find yourself exploring the documentation of these libraries to learn more about their features and usage.

Our choices prioritize simplicity, performance, accessibility, and developer experience. You can leverage the toolset to maximize the productivity and focus on building features rather than wrestling with low-level implementation details.

## Core Technologies

- **[TypeScript](https://www.typescriptlang.org/)** - Strict typing for improved developer experience and fewer runtime errors
- **[React](https://react.dev/)** - Industry standard for building user interfaces
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework, rapid and reliable styling
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server

## Key Integrations

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives providing robust interaction patterns and WCAG compliance
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling with validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[TanStack Table](https://tanstack.com/table)** - Headless table utilities for DataTable component
- **[Firebase](https://firebase.google.com/)** - Authentication utilities and patterns
- **[date-fns](https://date-fns.org/)** - Date manipulation and formatting
- **[ES-Toolkit](https://es-toolkit.slash.page/)** - Modern utility library for efficient JavaScript operations

## Why These Choices?

### React

React is the most widely adopted front-end library. It provides:
- A component-based architecture for modular, reusable UI
- A mature ecosystem of libraries and tools
- Strong community support and resources

React in 2025 is still the most sensible choice, given our needs. 

[More about React](https://react.dev/)

### TypeScript

TypeScript is essential for a modern web application. It allows:
- Catching errors at compile time rather than runtime
- Providing excellent autocomplete and IntelliSense
- Making refactoring safer and easier
- Improving overall code quality and maintainability
- Enables better collaboration in teams through clear type definitions

We strongly believe in type-safety. Our APIs are designed to provide excellent, type-safe developer experience.

You can use our library with vanilla JavaScript, but we strongly recommend adopting TypeScript.

[More about TypeScript](https://www.typescriptlang.org/)


### Vite

Vite is a modern build tool and development server. It's fast, lightweight, and has excellent developer experience. We also rely on [vitest](https://vitest.dev/) for unified testing.

You can still consume our library with Next or any other React tool, we use it internally for out build process.

[More about Vite](https://vitejs.dev/)


### Tailwind CSS

Tailwind is the industry standard for utility-first CSS. It speeds up development with pre-defined utility classes constructed out of the theme system. Theming is based on CSS variables, which allows for easy customization and simple implementation.

Tailwind provides excellent developer experience with IntelliSense. It guarantees the ultimate speed of development. It's widely adopted and familiar to most developers. Thanks to its utility-first nature, it allows moving with high confidence. 

We build our system using Tailwind because it allows us to leverage a system that's widely adopted and requires no further abstractions. Our components are straightforward to understand. They are built using the same tools you're familiar with. We don't create custom APIs just for styling. Use Tailwind directly for common grid, flex, typography, or spacing utilities.

Tailwind at first might seem like a wrong abstraction and a step back. Nevertheless, it proves itself to be the ultimate way of styling modern web applications. Read more about its philosophy [here](https://tailwindcss.com/docs/styling-with-utility-classes).

[More about Tailwind](https://tailwindcss.com/)

### Radix UI

Radix UI provides unstyled, accessible component primitives. These primitives provide built-in accessibility compliance (WCAG), robust keyboard navigation, and focus management. We can focus on the styling and functionality of our components, rather than worrying about the underlying implementation.

At the same time, thanks to the modular structure, you can swap out components with your own custom ones and leverage Radix UI directly.

[More about RadixUI primitives](https://www.radix-ui.com/primitives)

### TanStack Table

TanStack Table is a headless table library for React. It's a powerful and flexible solution for building data-driven tables. We use it to build our DataTable component. It enables complex features like sorting, filtering, pagination, and more.

[More about TanStack Table](https://tanstack.com/table)

### Zod

Zod is a powerful schema validation library for TypeScript. It lets you define complex data structures and provides powerful type inference. We can use it to validate our forms.

[More about Zod](https://zod.dev/)

### React Hook Form

React Hook Form is a performant form library for React. It minimizes re-renders and provides a simple API for managing form state and validation. We integrate it with Zod and custom form components.

This ensures consistent, performant, type-safe, and declarative form handling. 

[More about React Hook Form](https://react-hook-form.com/)


### date-fns

Functional date manipulation and formatting library. Use it to format dates, calculate durations, and more. Provides everything you need to work with dates in TypeScript.

[More about date-fns](https://date-fns.org/)


### ESToolkit

Modern utility library for efficient TypeScript operations. Provides functions for deep cloning, debouncing, throttling, and more. It's a lightweight alternative to lodash with a focus on modern JavaScript features.

[More about ESToolkit](https://es-toolkit.dev/)