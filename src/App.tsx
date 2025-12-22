import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/register";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { ProductDetails } from "@/pages/ProductDetails";

import DashboardLayoutWrapper from "./components/layout/DashboardLayoutWrapper";
import { Dashboard } from "@/components/dashboard/Dashboard";
import ProtectedRoute from "@/protectedRoute/ProtectedRoute";
// import DashboardHome from "@/pages/dashboard/DashboardHome";
// import ProductsPage from "@/pages/dashboard/ProductsPage";
// import PinterestPage from "@/pages/dashboard/PinterestPage";
// import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
// import SettingsPage from "@/pages/dashboard/SettingsPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* DASHBOARD (OPTION B) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              {/* <Route index element={<DashboardHome />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="pinterest" element={<PinterestPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} /> */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
