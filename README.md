# Admin Dashboard

A modern, responsive admin dashboard built with React 19, Vite, and Redux Toolkit. This application provides a comprehensive interface for managing users, viewing analytics, and monitoring system activity.

## 🚀 Features

- **Authentication System**: Secure login and registration with Redux-based state management
- **Dashboard Analytics**: Real-time statistics with interactive charts and graphs
- **User Management**: View and manage user data with activity tables
- **Data Visualization**: Beautiful charts using Recharts library
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Modern Stack**: Built with React 19, Vite, and latest web technologies

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite 7** - Fast build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### State Management
- **Redux Toolkit** - Predictable state container
- **Redux Saga** - Asynchronous state management
- **React Redux** - React bindings for Redux

### Data & UI
- **Recharts** - Composable charting library
- **clsx & tailwind-merge** - Conditional class utilities
- **PostCSS & Autoprefixer** - CSS processing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ActivityTable.jsx
│   ├── ChartCard.jsx
│   ├── DocsAlert.jsx
│   └── StatsCard.jsx
├── layouts/            # Layout components
│   └── MainLayout.jsx
├── pages/              # Page components
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── store/              # Redux store configuration
│   ├── authSlice.js
│   ├── dashboardSlice.js
│   ├── authSaga.js
│   ├── dashboardSaga.js
│   ├── rootReducer.js
│   ├── rootSaga.js
│   └── store.js
├── assets/             # Static assets
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
├── App.css             # App-specific styles
└── index.css           # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Architecture

### Authentication Flow
- Users can register new accounts or login with existing credentials
- Authentication state is managed through Redux Toolkit
- Protected routes redirect to login/register based on user existence
- User data is persisted in localStorage for demo purposes

### State Management
- **Redux Toolkit** manages authentication and dashboard state
- **Redux Saga** handles asynchronous operations and side effects
- **Selectors** provide efficient access to store data
- **Actions** dispatch state changes consistently

### Component Architecture
- **Pages** represent main application routes
- **Components** are reusable UI elements
- **Layouts** provide consistent page structure
- **Hooks** encapsulate business logic and state interactions

## 📊 Dashboard Features

### Statistics Cards
- Display key metrics with visual indicators
- Responsive grid layout
- Customizable colors and icons

### Data Visualization
- Interactive charts using Recharts
- Pie charts for categorical data
- Donut charts for percentage displays
- Responsive and animated visualizations

### Activity Table
- Sortable user activity data
- Row deletion functionality
- Pagination support
- Search and filter capabilities

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **PostCSS** for CSS processing
- **Responsive design** with mobile-first approach
- **Modern UI** with clean aesthetics
- **Lucide icons** for consistent iconography

## 🔧 Configuration

### Vite Configuration
- React plugin for fast refresh
- Build optimization for production
- Development server configuration

### ESLint Configuration
- React hooks linting
- Code quality enforcement
- Consistent coding standards

### Tailwind Configuration
- Custom theme configuration
- Plugin integrations
- Build optimization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Projects

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development
