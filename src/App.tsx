import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ContentManagement from "./pages/ContentManagement";
import NewCampaign from "./pages/NewCampaign";
import TopPerformers from "./pages/TopPerformers";
import Trending from "./pages/Trending";
import ContentCalendar from "./pages/ContentCalendar";
import BrandAssets from "./pages/BrandAssets";
import Reports from "./pages/Reports";
import Templates from "./pages/Templates";
import Influencers from "./pages/Influencers";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/campaigns/new" element={<NewCampaign />} />
            <Route path="/top-performers" element={<TopPerformers />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/calendar" element={<ContentCalendar />} />
            <Route path="/assets" element={<BrandAssets />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/campaigns" element={<Campaigns />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
