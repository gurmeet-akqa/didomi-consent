# Modern React App

A beautiful, modern single-page application built with React.js and Vite, ready for deployment on Vercel.

## Features

- ⚡ **Fast & Lightweight** - Built with Vite for lightning-fast development
- 🎨 **Modern Design** - Beautiful, responsive UI with a clean aesthetic
- 🚀 **Easy Deployment** - Ready to deploy on Vercel with zero configuration
- 🍪 **Didomi CMP Integration** - Consent Management Platform with customizable styling

## Getting Started

### Prerequisites

- **Node.js** (v18.12.0 or higher) - Required for Yarn 4.x compatibility
- **npm** (v9.0.0 or higher) or **yarn** (Classic v1.x or Modern v4.x)

> **Note:** If you're using Yarn 4.x (Berry), you need Node.js 18.12.0+. If you encounter compatibility issues, you can:
> - Use Yarn Classic (v1.x) which works with Node.js 12+
> - Use npm instead
> - Update your Node.js version using Volta: `volta install node@18` or `volta install node@20`

### Installation

1. Install dependencies:

   **Using npm:**
   ```bash
   npm install
   ```

**Using yarn:**
```bash
yarn install
# or simply:
yarn
```

> **Troubleshooting:** If you get a syntax error with Yarn 4.x, your Node.js version is too old. Either:
> - Update Node.js: `volta install node@20` (if using Volta)
> - Use Yarn Classic: `npm install -g yarn@1` then use `yarn` commands
> - Use npm instead: `npm install`

2. Start the development server:

   **Using npm:**
   ```bash
   npm run dev
   ```

   **Using yarn:**
   ```bash
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

**Using npm:**
```bash
npm run build
```

**Using yarn:**
```bash
yarn build
```

The production build will be in the `dist` directory.

### Preview Production Build

**Using npm:**
```bash
npm run preview
```

**Using yarn:**
```bash
yarn preview
```

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:

   **Using npm:**
   ```bash
   npm i -g vercel
   ```

   **Using yarn:**
   ```bash
   yarn global add vercel
   ```

2. Deploy:
```bash
vercel
```

**Note:** Vercel automatically detects whether you're using npm or yarn based on the presence of `yarn.lock` or `package-lock.json` files. If you're using yarn, make sure to commit `yarn.lock` to your repository.

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Vite and configure the build settings
5. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect the framework and settings
5. Click "Deploy"

The `vercel.json` file is included for optimal configuration. Vercel will automatically detect whether you're using npm or yarn based on your lock files (`yarn.lock` or `package-lock.json`) and use the appropriate package manager.

## Project Structure

```
.
├── src/
│   ├── App.jsx              # Main application component (includes Didomi SDK)
│   ├── App.css              # Application styles
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles
│   ├── config/
│   │   └── didomi.config.js # Didomi SDK configuration
│   └── styles/
│       └── didomi-custom.css # Custom Didomi consent banner styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment configuration
├── package.json             # Project dependencies
├── DIDOMI_SETUP.md          # Detailed Didomi setup guide
└── .env                     # Environment variables (create this file)
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with CSS variables
- **Didomi** - Consent Management Platform (CMP) for GDPR compliance

## Didomi Setup

This application includes Didomi SDK for consent management. To set it up:

1. Get your API key from [Didomi Dashboard](https://dashboard.didomi.io/)
2. Create a `.env` file in the root directory:
   ```
   VITE_DIDOMI_API_KEY=your_api_key_here
   ```
3. Customize the consent banner styling in `src/styles/didomi-custom.css`

For detailed setup instructions, see [DIDOMI_SETUP.md](./DIDOMI_SETUP.md)

## License

MIT

