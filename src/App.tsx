import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider, useGame } from "@/contexts/GameContext";
import { GameLayout } from "@/components/GameLayout";
import { PlayerSetup } from "@/components/PlayerSetup";
import Dashboard from "@/pages/Dashboard";
import Quests from "@/pages/Quests";
import SkillTree from "@/pages/SkillTree";
import Market from "@/pages/Market";
import Stats from "@/pages/Stats";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function GameRoutes() {
  const { state } = useGame();

  if (!state.setupDone) return <PlayerSetup />;

  return (
    <GameLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/skills" element={<SkillTree />} />
        <Route path="/market" element={<Market />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GameLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GameProvider>
        <BrowserRouter>
          <GameRoutes />
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
