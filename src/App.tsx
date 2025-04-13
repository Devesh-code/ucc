
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Players from "./pages/Players";
import PlayerDetail from "./pages/PlayerDetail";
import PlayerStats from "./pages/PlayerStats";
import Schedule from "./pages/Schedule";
import Standings from "./pages/Standings";
import Layout from "./components/Layout";
import WebCrawler from "./components/WebCrawler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="players" element={<Players />} />
            <Route path="players/:id" element={<PlayerDetail />} />
            <Route path="playerstats" element={<PlayerStats />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="standings" element={<Standings />} />
            <Route path="crawler" element={<WebCrawler />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
