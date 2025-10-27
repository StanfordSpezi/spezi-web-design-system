# Spezi Web Design System Documentation

This documentation website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator. It provides comprehensive documentation for the Spezi Web Design System, including guides and auto-generated API reference.

## Prerequisites

- Node.js >= 22.0
- npm package manager

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run dev
```

This command starts a local development server at `http://localhost:3000` and opens up a browser window. Most changes are reflected live without having to restart the server.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the documentation site for production
- `npm run clear` - Clear Docusaurus cache
- `npm run docusaurus` - Run Docusaurus CLI commands

## Building for Production

Generate static content for production:

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

## API Documentation

The API documentation is automatically generated from TypeScript source files using TypeDoc. The documentation includes:

- Component props and interfaces
- Utility functions and hooks
- Type definitions
- Usage examples

The API documentation is generated during the build process and is available at `/api` when the site is running.

## Project Structure

```
docs/
├── docs/                   # Documentation content (MDX files)
│   ├── docs/               # Getting started and guides
│   └── api/                # Auto-generated API documentation
├── src/                    # Custom React components and styles
├── static/                 # Static assets (images, favicon)
├── docusaurus.config.ts    # Docusaurus configuration
├── sidebars.ts             # Navigation sidebar configuration
└── package.json            # Dependencies and scripts
```

## Customization

### Adding New Documentation Pages

1. Create new `.mdx` files in the `docs/docs/` directory
2. Update `sidebars.ts` to include the new pages in navigation
3. The pages will automatically appear in the documentation

### Modifying API Documentation

The API documentation is generated from the main project's TypeScript files. To modify what gets documented:

1. Update the `docusaurus.config.ts` file
2. Modify the TypeDoc configuration in the `docusaurusPluginOptions` object
3. Rebuild the documentation

### Styling

Custom styles can be added to `src/css/custom.css`.

## Deployment

The documentation is automatically deployed to GitHub Pages via GitHub Actions when the new version of the package is deployed. The deployment workflow:

1. Builds the documentation site
2. Deploys to the `gh-pages` branch
3. Makes the site available at `https://spezi.health/spezi-web-design-system/docs`

### Getting Help

- Check the [Docusaurus documentation](https://docusaurus.io/docs)
- Review the [TypeDoc documentation](https://typedoc.org/) for API generation issues
- Open an issue in the main project repository
