import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ContentManagement from "./pages/ContentManagement";
import Brainstorming from "./pages/Brainstorming";
import NewCampaign from "./pages/NewCampaign";
import TopPerformers from "./pages/TopPerformers";
import Trending from "./pages/Trending";
import ContentCalendar from "./pages/ContentCalendar";
import BrandAssets from "./pages/BrandAssets";
import Reports from "./pages/Reports";
import Templates from "./pages/Templates";
import Influencers from "./pages/Influencers";
import Campaigns from "./pages/Campaigns";
import AIPlayground from "./pages/AIPlayground";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/brainstorming" element={
                <ProtectedRoute>
                  <Brainstorming />
                </ProtectedRoute>
              } />
              <Route path="/content" element={
                <ProtectedRoute>
                  <ContentManagement />
                </ProtectedRoute>
              } />
              <Route path="/campaigns/new" element={
                <ProtectedRoute>
                  <NewCampaign />
                </ProtectedRoute>
              } />
              <Route path="/top-performers" element={
                <ProtectedRoute>
                  <TopPerformers />
                </ProtectedRoute>
              } />
              <Route path="/trending" element={
                <ProtectedRoute>
                  <Trending />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <ContentCalendar />
                </ProtectedRoute>
              } />
              <Route path="/assets" element={
                <ProtectedRoute>
                  <BrandAssets />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/templates" element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              } />
              <Route path="/influencers" element={
                <ProtectedRoute>
                  <Influencers />
                </ProtectedRoute>
              } />
              <Route path="/campaigns" element={
                <ProtectedRoute>
                  <Campaigns />
                </ProtectedRoute>
              } />
              <Route path="/playground" element={
                <ProtectedRoute>
                  <AIPlayground />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </ThemeProvider>
</QueryClientProvider>
);

export default App;
