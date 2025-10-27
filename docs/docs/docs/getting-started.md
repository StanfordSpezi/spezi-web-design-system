---
sidebar_position: 0
---

# Getting Started

Get up and running with Spezi Web Design System in minutes.

## Quick Start with Template

The fastest way to start is using our template application, which includes all the necessary dependencies, configuration, boilerplate code and examples.

```bash
# Clone the template repository
git clone https://github.com/StanfordSpezi/spezi-web-template-application.git my-app
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The template includes:
- Pre-configured tech stack
- Spezi Web pre-configured
- Examples components and pages
- Routing and layout structure
- Authentication patterns

**[View Template Repository →](https://github.com/StanfordSpezi/spezi-web-template-application)**

## Manual Installation

If you're adding Spezi to an existing project:

### 1. Install the Package

```bash
npm install @stanfordspezi/spezi-web-design-system
```

### 2. Install Tailwind

This package is built with Tailwind CSS. You'll need to configure Tailwind CSS to use Spezi styles. Read more about setting up Tailwind CSS in the [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation). 

#### Simplified Tailwind installation guide

Install Tailwind CSS and PostCSS:
```bash
npm install tailwindcss @tailwindcss/postcss postcss --save-dev
```

Create `postcss.config.mjs` file:
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
```

Create `globals.css` file:
```css
@import "tailwindcss";
```

Ensure your `globals.css` is imported in your application. You can import it in the root file and add it to your `head` tag.


### 3. Configure Spezi

In the file where you're importing tailwindcss (`globals.css` from the previous step), replace it with the Spezi imports:

```css
/* This file automatically imports Tailwind CSS, Spezi CSS variables and custom utilities. */
@import '@stanfordspezi/spezi-web-design-system/tailwind.css';
/* This file applies global base styles, like background color, selection colors or cursor pointers. Separated from main file in case you want to opt-out from it.  */
@import '@stanfordspezi/spezi-web-design-system/base.css';
/* ⚠️ Important! 
 * This file is required for Tailwind to generate CSS for Spezi components.  
 * Ensure that this path points to the correct `node_modules` location.
 * It's relative to your `globals.css` file.
 * If globals is in the root directory, it's `../node_modules/...`. 
 */
@source '../node_modules/@stanfordspezi/spezi-web-design-system/dist/**/*.js';
```

Ensure that your `@source` points to the correct `node_modules` location.

### 4. Setup SpeziProvider

`SpeziProvider` provides global values to your Spezi components. 

It allows configuring:
- router objects
- theme
- localization messages

Wrap your entire application with the `SpeziProvider`. 

#### With Tanstack Router

```tsx
import { SpeziProvider, SpeziContextRouter } from "@stanfordspezi/spezi-web-design-system";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const routerProps: SpeziContextRouter = {
  Link: ({ href, ...props }) => <Link to={href} {...props} />,
};

const Root = () => (
  <SpeziProvider router={routerProps}>
    <Outlet />
  </SpeziProvider>
);

export const Route = createRootRoute({
  component: Root,
});
```


#### With Next.js

```tsx
"use client";
import Link from "next/link";
import { SpeziProvider, SpeziContextRouter } from "@stanfordspezi/spezi-web-design-system";

const routerProps: SpeziContextRouter = {
  Link: ({ href, ...props }) => <Link href={href ?? "#"} {...props} />,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SpeziProvider router={routerProps}>{children}</SpeziProvider>
      </body>
    </html>
  );
}

```

## Basic Usage

## Importing

### By root

You can import everything from the root of the package:

```tsx
import { Button, Input, Card } from '@stanfordspezi/spezi-web-design-system';
```

This approach guarantees simplicity.

### By module

You can also import specific modules:

```tsx
import { Button } from '@stanfordspezi/spezi-web-design-system/components/Button';
import { Input } from '@stanfordspezi/spezi-web-design-system/components/Input';
import { Card } from '@stanfordspezi/spezi-web-design-system/components/Card';
```

This approach might reduce bundle size, but it's more verbose. In Next.JS it might be necessary to import components individually if you want to use them on the server-side. Root includes all components, as well as those clients-only.

### Using Components

Import and use components to compose your UI:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  Notification,
  Badge,
  Tooltip,
  Button,
} from "@stanfordspezi/spezi-web-design-system";

const App = () => (
  <main className="flex-center h-screen w-screen">
    <Card className="min-w-lg">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <Tooltip tooltip="You have 1 unread notification">
          <Badge variant="destructiveLight" size="sm">
            1
          </Badge>
        </Tooltip>
      </CardHeader>
      <Notification
        title="Appointment scheduled"
        message="Your appointment scheduled at 10:00 AM"
        time={new Date()}
        isRead={false}
        actions={
          <Button size="xs" variant="outline">
            Reschedule
          </Button>
        }
      />
      <Notification
        title="New message"
        message="You have a new message from Dr. Smith"
        time={new Date(Date.now() - 1000 * 60 * 60 * 24 * 12)}
        isRead={true}
      />
      <footer className="flex gap-2 p-5">
        <Button>Mark all as read</Button>
        <Button variant="secondary">See more</Button>
      </footer>
    </Card>
  </main>
);
```

### Form Handling

Use the built-in form utilities with React Hook Form and Zod:

```tsx
import {
  Button,
  useForm,
  Field,
  Input,
  FormError,
  sleep,
} from "@stanfordspezi/spezi-web-design-system";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Emulated login call to backend
const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await sleep(1000);
  if (Math.random() > 0.5) {
    // automatically surfaced through `form.formError`
    throw new Error("Invalid credentials");
  } else {
    // login successful
  }
};

const LoginForm = () => {
  const form = useForm({
    formSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (form) => {
    await login(form);
    // proceed with a success path
    alert("Login worked, redirect...");
  });

  return (
    <form onSubmit={onSubmit}>
      <pre className="mb-4 text-xs">
        {JSON.stringify(form.watch(), null, 2)}
      </pre>
      <FormError formError={form.formError} />
      {/* Form errors, labels, name, aria attribute are automatically appended using Field component */}
      <Field
        control={form.control}
        name="email"
        label="Email"
        render={({ field }) => <Input {...field} />}
      />
      <Field
        control={form.control}
        name="password"
        label="Password"
        render={({ field }) => <Input {...field} type="password" />}
      />
      <Button type="submit" isPending={form.formState.isSubmitting}>
        Login
      </Button>
    </form>
  );
};

const App = () => (
  <main className="flex-center h-screen">
    <div className="w-lg">
      <LoginForm />
    </div>
  </main>
);
```

### Using Molecules

Molecules are higher-level components that provide complex, yet common UI patterns:

```tsx
import { DashboardLayout } from '@stanfordspezi/spezi-web-design-system/molecules/DashboardLayout';
import { Notifications } from '@stanfordspezi/spezi-web-design-system/molecules/Notifications';

function Dashboard() {
  return (
    <DashboardLayout
      navigation={[
        { label: 'Home', href: '/' },
        { label: 'Settings', href: '/settings' },
      ]}
    >
      <Notifications />
      <h1>Dashboard Content</h1>
    </DashboardLayout>
  );
}
```

### Utilities

Use helper utilities throughout your app:

```tsx
import {
  cn,
  formatDate,
  useOpenState,
} from "@stanfordspezi/spezi-web-design-system";

const MyComponent = () => {
  const dialog = useOpenState();

  return (
    <div className={cn("p-4", dialog.isOpen && "bg-destructive")}>
      <p>Date: {formatDate(new Date())}</p>
      <button onClick={dialog.open}>Open Dialog</button>
      {dialog.isOpen && <div>Dialog</div>}
    </div>
  );
};
```

## Next Steps

- **[Browse Components in Storybook](https://spezi.health/spezi-web-design-system/storybook)** - Interactive examples and documentation
- **[API Reference](/api/SpeziProvider)** - Detailed component and utility documentation
- **[Why Spezi?](/docs/why-spezi)** - Learn about our philosophy and approach
- **[Technology Stack](/docs/technology-stack)** - Understand the underlying technologies

## Production Examples

See real-world implementations:

- **[ENGAGE-HF Web Frontend](https://github.com/StanfordBDHG/ENGAGE-HF-Web-Frontend)** - Heart failure management platform
- **[Spezi Web Study Platform](https://github.com/StanfordSpezi/spezi-web-study-platform)** - Research study management system
- **[RadGPT](https://github.com/StanfordBDHG/RadGPT)** - AI-powered radiology assistance tool

## Need Help?

- Look at [template application](https://github.com/StanfordSpezi/spezi-web-template-application) for an example implementation
- Look at [production examples](#production-examples) for inspiration
- Report issues on [GitHub](https://github.com/StanfordSpezi/spezi-web-design-system/issues)
