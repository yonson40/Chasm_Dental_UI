# Chasm Dental Billing Platform

An AI-powered dental billing platform that replaces clearinghouses and eAssist services, built with Electron, React, TypeScript, and Tailwind CSS.

## Features

- **Enhanced A2A Protocol Implementation**: Google's Agent-to-Agent protocol enabling sophisticated multi-agent workflows
- **CDT Code Knowledge Base**: Comprehensive database of dental procedure codes with documentation requirements
- **Insurance Verification**: Real-time verification in 1-3 seconds vs. 15-30 minutes with traditional methods
- **Pre-submission Validation**: Comprehensive claim validation before submission
- **Patient Cost Estimator**: Clear, visual breakdowns of insurance vs. patient responsibility
- **Front Desk Conversion Strategy**: Specialized onboarding for staff transitioning from traditional systems

## Tech Stack

- Electron 35
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Electron Vite

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

### Build

To build the application for production:

```bash
npm run build
```

### Package

To package the application for distribution:

```bash
npm run package
```

## Project Structure

```
chasm-electron-app/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── index.ts          # Main entry point
│   │   └── update.ts         # Auto-updater
│   ├── preload/              # Preload scripts
│   │   └── index.ts          # Preload entry point
│   ├── renderer/             # React renderer process
│   │   └── index.tsx         # Renderer entry point
│   ├── components/           # React components
│   │   ├── ui/               # UI components
│   │   ├── app-provider.tsx  # App provider
│   │   └── theme-toggle.tsx  # Theme toggle
│   ├── screens/              # Application screens
│   │   ├── Dashboard.tsx     # Dashboard screen
│   │   ├── InsuranceVerification.tsx # Insurance verification screen
│   │   └── ClaimSubmission.tsx # Claim submission screen
│   ├── styles/               # CSS styles
│   │   └── globals.css       # Global styles
│   └── lib/                  # Utility functions
│       ├── utils.ts          # Utility functions
│       └── theme-provider.tsx # Theme provider
├── electron.vite.config.ts   # Electron Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
└── index.html                # HTML entry point
```

## Forest Theme

The application uses a sophisticated forest color palette:

- **Moss Green**: #596a48 - Primary brand color
- **Blue Black**: #212528 - Dark backgrounds and text
- **Taupe**: #999788 - Neutral accent color
- **Beige**: #c9c1b6 - Light backgrounds
- **Dark Brown**: #403b35 - Secondary accent color

## License

[MIT](LICENSE)
