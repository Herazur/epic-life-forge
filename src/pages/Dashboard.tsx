import { motion } from 'framer-motion';
import { Shield, Brain, Flame, Users, Zap, Heart, Coins } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { RANK_COLORS } from '@/types/game';

const STAT_CONFIG = [
  { key: 'strength', label: 'Kuvvet', icon: Shield, color: 'hsl(0 85% 55%)' },
  { key: 'intelligence', label: 'Zeka', icon: Brain, color: 'hsl(200 90% 55%)' },
  { key: 'discipline', label: 'Disiplin', icon: Flame, color: 'hsl(45 95% 55%)' },
  { key: 'charisma', label: 'Karizma', icon: Users, color: 'hsl(265 85% 60%)' },
  { key: 'skill', label: 'Beceri', icon: Zap, color: 'hsl(145 80% 50%)' },
] as const;

export default function Dashboard() {
  const { state } = useGame();

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold neon-text-purple">⚔️ Oyuncu Durumu</h1>
        <p className="text-muted-foreground text-sm mt-1">Hoş geldin, {state.playerName}</p>
      </motion.div>

      {/* Top row: Rank + Level + XP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-panel rounded-xl p-5 neon-border text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sıralama</p>
          <p className={`text-5xl font-black ${RANK_COLORS[state.rank]}`}>{state.rank}</p>
          <p className="text-xs text-muted-foreground mt-1">{state.rank}-Rank Avcı</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass-panel rounded-xl p-5 neon-border text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Seviye</p>
          <p className="text-5xl font-black neon-text-blue">{state.level}</p>
          <div className="mt-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(state.xp / state.xpToNext) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ background: 'linear-gradient(90deg, hsl(245 80% 65%), hsl(200 90% 55%))' }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{state.xp} / {state.xpToNext} XP</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-panel rounded-xl p-5 neon-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-xs text-muted-foreground uppercase">HP</span>
            </div>
            <span className="text-sm font-mono neon-text-red">{state.hp}/{state.maxHp}</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(state.hp / state.maxHp) * 100}%` }}
              transition={{ duration: 1 }}
              style={{
                background: state.hp > 50
                  ? 'linear-gradient(90deg, hsl(145 80% 50%), hsl(145 80% 40%))'
                  : state.hp > 25
                    ? 'linear-gradient(90deg, hsl(45 95% 55%), hsl(30 90% 50%))'
                    : 'linear-gradient(90deg, hsl(0 85% 55%), hsl(0 70% 40%))',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4" style={{ color: 'hsl(45 95% 55%)' }} />
              <span className="text-xs text-muted-foreground uppercase">Altın</span>
            </div>
            <span className="font-bold neon-text-gold">{state.gold} 🪙</span>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold mb-3 text-foreground">📊 Temel İstatistikler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {STAT_CONFIG.map(({ key, label, icon: Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="glass-panel rounded-xl p-4 text-center neon-border"
            >
              <Icon className="w-6 h-6 mx-auto mb-2" style={{ color }} />
              <p className="text-2xl font-black" style={{ color }}>{state.stats[key as keyof typeof state.stats]}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick quest summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="glass-panel rounded-xl p-5 neon-border">
          <h2 className="text-lg font-semibold mb-3">📋 Görev Özeti</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold neon-text-blue">
                {state.quests.filter(q => q.type === 'daily' && !q.completed).length}
              </p>
              <p className="text-xs text-muted-foreground">Günlük Görev</p>
            </div>
            <div>
              <p className="text-2xl font-bold neon-text-purple">
                {state.quests.filter(q => q.type === 'side' && !q.completed).length}
              </p>
              <p className="text-xs text-muted-foreground">Yan Görev</p>
            </div>
            <div>
              <p className="text-2xl font-bold neon-text-red">
                {state.quests.filter(q => q.type === 'boss' && !q.completed).length}
              </p>
              <p className="text-xs text-muted-foreground">Boss Savaşı</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
