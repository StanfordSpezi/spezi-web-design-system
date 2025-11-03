---
sidebar_position: 1
sidebar_label: "Why Spezi Web?"
---

# Why Spezi Web Design System?

## Rationale

### Why This Library Exists

Most existing component libraries fall into two categories:

1. **Highly opinionated** (Material-UI, Ant Design) - Fast to start but difficult to customize, steep learning curve
2. **Copy-paste patterns** (shadcn/ui) - Maximum flexibility but requires maintaining duplicated code across projects

Spezi Web Design System occupies the middle ground:

- **Package-based distribution** means updates and improvements benefit all projects automatically
- **Strong opinions** reduce decision fatigue and provide sensible defaults
- **Built on familiar patterns** (Radix UI for headless components, shadcn/ui architecture, Tailwind styling) means you can take ownership when needed
- **Focus on business logic** by leaving us to handle UI complexity, accessibility, and common patterns

### Design Philosophy

The library is built on these core principles:

1. **Reduce Barrier to Entry** - Developers don't need perfect frontend expertise to build quality applications
2. **Batteries included** - Together with the [template application](https://github.com/StanfordSpezi/spezi-web-template-application), you get a full-featured boilerplate and tools for building your application focusing on the features
3. **Escape Hatches** - When you need deep customization, you can take ownership of components while maintaining familiar patterns (Tailwind, Radix UI)
4. **Modern Standards** - Leverage industry best practices (TypeScript, Tailwind, Radix) rather than proprietary systems
5. **Ecosystem Integration** - Designed to work seamlessly with other Spezi Web packages for domain-specific needs

## Comparison with Alternatives

### vs shadcn/ui

**Similarities:**
- Both built on Radix UI primitives
- Both use Tailwind CSS for styling
- Many components in this library are based on shadcn/ui patterns

**Key Differences:**
- **Distribution**: shadcn/ui uses copy-paste (you own the code immediately), Spezi uses package distribution (centralized updates)
- **Philosophy**: shadcn/ui maximizes flexibility, Spezi maximizes productivity with opinionated defaults
- **Scope**: Spezi includes additional molecules, utilities, and ecosystem integrations (auth, forms, layouts)

**Choose Spezi when:** You want centralized updates, pre-built patterns, and faster development

**Choose shadcn/ui when:** You want maximum control and don't mind maintaining component code in your project. You can still refer to Spezi Web Design System to copy components as needed.

### vs Material-UI / Chakra UI

**Advantages of Spezi:**
- Lower learning curve - built on standard tools (Tailwind, Radix)
- More modern tech stack aligned with current ecosystem trends
- Lighter weight and less opinionated about design language
- Easier to customize without fighting the framework

**Advantages of Material-UI/Chakra:**
- More mature ecosystems with larger communities
- More comprehensive component libraries
- Built-in design languages (Material Design)

## Pros

✅ **Opinionated Defaults** - Sensible choices made for you, accelerating development

✅ **Modern Standards** - Built on latest industry best practices (Radix UI, Tailwind v4, React 19)

✅ **Extensive Component Library** - 40+ components including atoms, molecules, and utilities

✅ **Type Safety** - Comprehensive TypeScript coverage improves DX and prevents bugs

✅ **Flexible Architecture** - Use as-is or customize/extend components as needed

✅ **Proven in Production** - Used by multiple Stanford projects in production

✅ **Ecosystem Integration** - Works seamlessly with other Spezi Web packages and [template application](https://github.com/StanfordSpezi/spezi-web-template-application)

✅ **Package-Based Updates** - Improvements and bug fixes distributed automatically

✅ **Accessibility Built-In** - WCAG-compliant via Radix UI primitives

✅ **Well-Tested** - High test coverage with Vitest ensures reliability

✅ **Interactive Documentation** - Comprehensive Storybook with live examples

## Cons / Trade-offs

⚠️ **Deep Customization Requires Ownership** - For extensive modifications, you may need to copy and maintain some components locally

⚠️ **Learning Curve** - While simpler than some alternatives, you still need basic knowledge of Tailwind, React Hook Form, and other dependencies

⚠️ **Tailwind Config Requirements** - Uses specific Tailwind CSS variables that may clash with existing configurations

⚠️ **Less Flexible Than Copy-Paste** - Package-based approach means less control compared to owning the code (like shadcn/ui)

⚠️ **Opinionated Choices** - Strong opinions may not fit every use case or design system
