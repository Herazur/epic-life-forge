import { Sword, ScrollText, GitBranch, ShoppingBag, BarChart3, Home, RotateCcw } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useGame } from '@/contexts/GameContext';
import { RANK_COLORS } from '@/types/game';

const navItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Görevler', url: '/quests', icon: ScrollText },
  { title: 'Beceri Ağacı', url: '/skills', icon: GitBranch },
  { title: 'Pazar Yeri', url: '/market', icon: ShoppingBag },
  { title: 'İstatistikler', url: '/stats', icon: BarChart3 },
];

export function AppSidebar() {
  const { state, resetGame } = useGame();

  return (
    <aside className="w-64 min-h-screen glass-panel border-r border-border flex flex-col">
      {/* Player Info */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/20 neon-glow-purple flex items-center justify-center">
            <Sword className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground text-sm">{state.playerName}</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Lv.{state.level}</span>
              <span className={`font-bold ${RANK_COLORS[state.rank]}`}>{state.rank}-Rank</span>
            </div>
          </div>
        </div>

        {/* Mini XP bar */}
        <div className="mt-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(state.xp / state.xpToNext) * 100}%`,
                background: 'linear-gradient(90deg, hsl(245 80% 65%), hsl(200 90% 55%))',
              }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{state.xp}/{state.xpToNext} XP</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === '/'}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="bg-primary/15 text-foreground neon-border"
          >
            <item.icon className="w-4 h-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Gold display */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Altın</span>
          <span className="neon-text-gold font-bold">{state.gold} 🪙</span>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive mt-3 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Sıfırla
        </button>
      </div>
    </aside>
  );
}
