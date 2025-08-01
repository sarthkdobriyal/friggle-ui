
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AboutUs from './pages/AboutUs';
import MakeVideos from './pages/MakeVideos';

// Protected pages
import Dashboard from './pages/dashboard/Dashboard';
import Credits from './pages/dashboard/Credits';
import Payment from './pages/dashboard/Payment';

import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';



const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout isHomepage>
              <Home  />
            </Layout>
          } />
          
          <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          } />
          
          <Route path="/register" element={
            <Layout>
              <Register />
            </Layout>
          } />
          
          <Route path="/about" element={
            <Layout>
              <AboutUs />
            </Layout>
          } />
          
          {/* Public Make Videos page (can be used without login) */}
          <Route path="/make-videos" element={
            <Layout>
              <MakeVideos />
            </Layout>
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout isAuthenticated>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/generate-videos" element={
            <Layout isAuthenticated>
              <MakeVideos />
            </Layout>
          } />
          
          <Route path="/credits" element={
            <ProtectedRoute>
              <Layout isAuthenticated>
                <Credits />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/payment" element={
            <ProtectedRoute>
              <Layout isAuthenticated>
                <Payment />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    <Toaster 
      position="top-right"
      richColors
    />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
