# MWA.AI Website - Refactored Version

## 🚀 Modern Stack

This is a refactored version of the MWA.AI website built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety and better developer experience  
- **ESLint + Prettier** - Code quality and formatting
- **Three.js** - 3D graphics and animations
- **AOS** - Animate on scroll library

## 📁 Project Structure

```
refactor-app/
├── src/
│   ├── features/           # Modular feature implementations
│   │   ├── animations.ts   # Visual effects and animations
│   │   ├── card-interactions.ts # Card flip and selection logic
│   │   ├── journey.ts      # Journey timeline functionality
│   │   ├── navigation.ts   # Navigation and scroll handling
│   │   ├── scroll-progress.ts # Scroll progress bar
│   │   ├── timeline.ts     # Office transformation timeline
│   │   └── vapi-service.ts # Voice AI integration
│   ├── styles/
│   │   └── main.css        # Main stylesheet
│   ├── main.ts             # Application entry point
│   └── vite-env.d.ts       # TypeScript environment definitions
├── public/                 # Static assets
├── dist/                   # Build output
├── index.html              # Main HTML file
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration
├── .prettierrc             # Prettier configuration
├── vercel.json             # Deployment configuration with security headers
└── package.json            # Dependencies and scripts
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Configure environment variables:**
   Edit `.env.local` with your actual values:
   ```env
   VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
   VITE_VAPI_ASSISTANT_ID=your_assistant_id_here
   ```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 🔒 Security Features

- **Content Security Policy (CSP)** - Prevents XSS attacks
- **X-Content-Type-Options** - Prevents MIME type sniffing
- **X-Frame-Options** - Prevents clickjacking
- **Referrer-Policy** - Controls referrer information
- **Environment Variables** - Secure configuration management

## 🏗️ Architecture

### Modular Design

Each feature is isolated in its own module with clear responsibilities:

- **Navigation**: Handles scroll navigation and mobile menu
- **Card Interactions**: Manages the experience selection cards
- **Timeline**: Controls the office transformation timeline
- **Journey**: Manages the AI liberation journey stages
- **Animations**: Handles visual effects and micro-interactions
- **VAPI Service**: Voice AI integration with proper error handling

### Type Safety

Full TypeScript implementation with:
- Strict mode enabled
- Custom type definitions for environment variables
- Proper typing for all DOM interactions
- Type-safe event handling

### Performance

- **Tree-shaking**: Only used code is bundled
- **Code splitting**: Automatic chunking for optimal loading
- **Asset optimization**: Images and fonts are optimized
- **Modern JS**: Targets modern browsers for smaller bundles

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Build

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_VAPI_PUBLIC_KEY` | VAPI public API key | Yes (for voice features) |
| `VITE_VAPI_ASSISTANT_ID` | VAPI assistant ID | Yes (for voice features) |
| `VITE_APP_NAME` | Application name | No |
| `VITE_APP_VERSION` | Application version | No |
| `VITE_API_BASE_URL` | API base URL | No |

### Build Configuration

The project uses Vite with TypeScript. Key configurations:

- **Target**: ES2020 for modern browser support
- **Bundling**: Rollup with optimizations
- **Source Maps**: Enabled for debugging
- **Asset Handling**: Automatic optimization

## 📝 Development Notes

### Code Quality

- **ESLint**: Enforces consistent code style
- **Prettier**: Automatic code formatting
- **TypeScript**: Compile-time error checking
- **Strict Mode**: Enhanced type checking

### Best Practices Implemented

1. **Separation of Concerns**: Each feature is modular
2. **Event Delegation**: Efficient event handling
3. **Error Boundaries**: Graceful error handling
4. **Performance**: Passive event listeners where appropriate
5. **Accessibility**: Semantic HTML and ARIA labels
6. **Security**: CSP headers and input validation

## 🎯 Features

- ✅ **Interactive Experience Cards** - Flip animations and selection
- ✅ **Timeline Navigation** - Smooth transitions between phases  
- ✅ **Journey Progression** - Scroll-based stage advancement
- ✅ **Voice AI Integration** - VAPI service integration
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Smooth Animations** - AOS and custom animations
- ✅ **3D Effects** - Three.js integration ready
- ✅ **Performance Optimized** - Lazy loading and efficient rendering

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Run `npm run type-check` to see TypeScript issues
2. **Missing Dependencies**: Run `npm install` to ensure all packages are installed
3. **Environment Variables**: Check `.env.local` file exists and has correct values
4. **Port Conflicts**: Vite dev server runs on port 5173 by default

### Debug Mode

For debugging, the app exposes global variables in development:

```javascript
// Available in browser console during development
window.__MWA_APP__ // App instance
window.vapiService // VAPI service instance
```

## 📄 License

MIT License - see original project for full license terms.

## 🤝 Contributing

1. Follow the established TypeScript patterns
2. Run linting before committing: `npm run lint:fix`
3. Test the build: `npm run build`
4. Ensure type safety: `npm run type-check`
