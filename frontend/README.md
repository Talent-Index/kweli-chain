# Kwelichain - React App

A modern, professional Web3 certificate verification application built with React, JavaScript, Vite, and Tailwind CSS.

## Features

- **Landing Page**: Hero section with animated certificate preview and feature showcase
- **Institution Dashboard**: Admin panel with certificate management, statistics, and upload functionality
- **Student Page**: Student profile with certificate collection and sharing capabilities
- **Verifier Page**: Certificate verification with file upload, hash input, and QR code scanning

## Tech Stack

- **React 18** with JavaScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom design system
- **React Router** for navigation
- **Font Awesome** for icons
- **Responsive Design** for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Navbar.jsx
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── DashboardPage.jsx
│   ├── StudentPage.jsx
│   └── VerifierPage.jsx
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles with Tailwind
```

## Design System

The app uses a custom design system with:

- **Colors**: Primary blue (#003399), Primary green (#00C389)
- **Typography**: Inter font family
- **Components**: Custom button styles, cards, and layouts
- **Animations**: Float, fade-in, and slide animations
- **Responsive**: Mobile-first design with breakpoints

## Features Implemented

### Landing Page
- Responsive navigation with mobile menu
- Hero section with gradient text and call-to-action buttons
- Feature grid with hover animations
- Animated certificate preview

### Dashboard
- Sidebar navigation
- Statistics cards
- File upload with drag & drop
- Certificate management table
- Action buttons for revoke and QR code

### Student Page
- Student profile header
- Certificate grid with cards
- Share and QR code functionality
- Responsive layout

### Verifier Page
- File upload interface
- Hash input verification
- QR code scanning option
- Verification results display
- Loading states and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.