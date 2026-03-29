import { Sword, ScrollText, GitBranch, ShoppingBag, BarChart3, Home, RotateCcw } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useGame } from '@/contexts/GameContext';
import { RANK_COLORS } from '@/types/game';
import { motion } from 'framer-motion';

const navItems = [
  { title: 'Kontrol Paneli', url: '/', icon: Home },
  { title: 'Görev Günlüğü', url: '/quests', icon: ScrollText },
  { title: 'Yetenek Ağacı', url: '/skills', icon: GitBranch },
  { title: 'Pazar Yeri', url: '/market', icon: ShoppingBag },
  { title: 'Karakter Verisi', url: '/stats', icon: BarChart3 },
];

export function AppSidebar() {
  const { state, resetGame } = useGame();

  return (
    <aside className="w-72 min-h-screen bg-sidebar-background/80 backdrop-blur-xl border-r border-white/5 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-primary/10 blur-[100px] pointer-events-none" />
      
      {/* Brand Header */}
      <div className="p-8 pb-4">
        <motion.div 
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Sword className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">EPIC LIFE</h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1 text-primary">FORGE SYSTEM</p>
          </div>
        </motion.div>

        {/* Player Profile Card */}
        <motion.div 
          className="p-4 rounded-2xl glass-panel border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border-2 border-primary/30 p-0.5 bg-secondary/50 overflow-hidden">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-sm font-black uppercase">{state.playerName.charAt(0)}</span>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-tight">{state.playerName}</h2>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/5 ${RANK_COLORS[state.rank]}`}>
                {state.rank}-SINIF
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground tracking-tighter mb-1">
              <span>Seviye {state.level}</span>
              <span>{Math.round((state.xp / state.xpToNext) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                initial={{ width: 0 }}
                animate={{ width: `${(state.xp / state.xpToNext) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 px-2">ANA MENÜ</p>
        {navItems.map((item, i) => (
          <motion.div
            key={item.url}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
          >
            <NavLink
              to={item.url}
              end={item.url === '/'}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground transition-all duration-300 relative overflow-hidden hover:text-foreground"
              activeClassName="bg-primary/10 text-primary !text-foreground shadow-[inset_0_0_20px_rgba(139,92,246,0.05)] border border-primary/20"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="tracking-tight uppercase font-bold text-xs">{item.title}</span>
              {/* Active Indicator */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full opacity-0 group-data-[active=true]:opacity-100 transition-opacity" />
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Gold & Quick Actions */}
      <div className="p-8 border-t border-white/5 bg-black/20">
        <div className="flex items-center justify-between font-black uppercase tracking-widest text-[10px] text-muted-foreground mb-4">
          <span>KREDİLER</span>
          <span className="neon-text-gold">{state.gold.toLocaleString()} 🪙</span>
        </div>
        
        <button
          onClick={resetGame}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground hover:text-destructive hover:bg-destructive/5 border border-transparent hover:border-destructive/10 transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          SISTEMI SIFIRLA
        </button>
      </div>
    </aside>
  );
}
