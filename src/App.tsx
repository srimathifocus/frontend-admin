import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ContactList from "./pages/contacts/ContactList";
import ContactDetail from "./pages/contacts/ContactDetail";
import DemoList from "./pages/demos/DemoList";
import DemoDetail from "./pages/demos/DemoDetail";
import AdminList from "./pages/admin/AdminList";
import AdminDetail from "./pages/admin/AdminDetail";
import Profile from "./pages/auth/Profile";

import ClientList from "./pages/clients/ClientList";
import ClientOnboardingForm from "./pages/clients/ClientOnboardingForm";
import ClientDetail from "./pages/clients/ClientDetail";
import LandingPage from "./pages/LandingPage";
import GlobalLoader from "./components/GlobalLoader";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative">
            <Toaster
              position="top-right"
              toastOptions={{
                className: "dark:bg-gray-800 dark:text-white",
                duration: 4000,
              }}
            />

            {/* Global full-page loader */}
            <GlobalLoader />

            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/contacts" element={<ContactList />} />
                        <Route
                          path="/contacts/:id"
                          element={<ContactDetail />}
                        />
                        <Route path="/demos" element={<DemoList />} />
                        <Route path="/demos/:id" element={<DemoDetail />} />
                        <Route path="/admins" element={<AdminList />} />
                        <Route path="/admins/:id" element={<AdminDetail />} />
                        <Route path="/clients" element={<ClientList />} />
                        <Route
                          path="/clients/new"
                          element={<ClientOnboardingForm />}
                        />
                        <Route
                          path="/clients/:id/edit"
                          element={<ClientOnboardingForm />}
                        />
                        <Route path="/clients/:id" element={<ClientDetail />} />
                        <Route path="/profile" element={<Profile />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
