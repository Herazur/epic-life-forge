import { motion } from 'framer-motion';
import { Shield, Brain, Flame, Users, Zap, Heart, Coins, Trophy, Swords, Target } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { RANK_COLORS } from '@/types/game';

const STAT_CONFIG = [
  { key: 'strength', label: 'Kuvvet', icon: Shield, color: 'var(--neon-red)', bg: 'rgba(255, 0, 0, 0.1)' },
  { key: 'intelligence', label: 'Zeka', icon: Brain, color: 'var(--neon-blue)', bg: 'rgba(0, 191, 255, 0.1)' },
  { key: 'discipline', label: 'Disiplin', icon: Flame, color: 'var(--neon-gold)', bg: 'rgba(255, 215, 0, 0.1)' },
  { key: 'charisma', label: 'Karizma', icon: Users, color: 'var(--neon-purple)', bg: 'rgba(191, 0, 255, 0.1)' },
  { key: 'skill', label: 'Beceri', icon: Zap, color: 'var(--neon-green)', bg: 'rgba(50, 205, 50, 0.1)' },
] as const;

export default function Dashboard() {
  const { state } = useGame();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-8 max-w-6xl mx-auto pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1 
            className="text-4xl md:text-5xl font-black tracking-tighter neon-text-purple uppercase mb-2"
            variants={itemVariants}
          >
            AVCI DURUMU
          </motion.h1>
          <motion.p className="text-muted-foreground font-medium flex items-center gap-2" variants={itemVariants}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Sisteme Bağlanıldı: <span className="text-foreground">{state.playerName}</span>
          </motion.p>
        </div>
        <motion.div 
          className="flex items-center gap-3 px-4 py-2 glass-panel rounded-full"
          variants={itemVariants}
        >
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-black neon-text-gold">{state.gold.toLocaleString()}</span>
        </motion.div>
      </header>

      {/* Hero Row: Rank + XP + HP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rank Card */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-3 glass-panel rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <Trophy className="w-8 h-8 text-muted-foreground/30 absolute top-4 right-4" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Mevcut Sıralama</p>
          <p className={`text-8xl font-black italic tracking-tighter ${RANK_COLORS[state.rank]} drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]`}>
            {state.rank}
          </p>
          <p className="text-sm font-bold text-muted-foreground mt-2 uppercase tracking-widest">{state.rank}-SINIF AVCI</p>
        </motion.div>

        {/* Level & XP Card */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 glass-panel rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-accent/50 transition-colors"
        >
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Seviye</p>
              <h2 className="text-6xl font-black neon-text-blue leading-none">{state.level}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Tecrübe</p>
              <p className="font-mono text-sm">{state.xp} / {state.xpToNext} XP</p>
            </div>
          </div>
          <div className="relative h-6 bg-white/5 rounded-full p-1 border border-white/10">
            <motion.div
              className="h-full rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: `${(state.xp / state.xpToNext) * 100}%` }}
              transition={{ duration: 1.5, ease: 'circOut' }}
              style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-tighter opacity-50">
              Sıradaki Seviyeye İlerleme
            </div>
          </div>
        </motion.div>

        {/* Vitality Card */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-destructive/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-destructive/20 rounded-lg">
                <Heart className="w-5 h-5 text-destructive animate-pulse" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">Yaşam Enerjisi</span>
            </div>
            <span className="text-lg font-black font-mono neon-text-red">{state.hp} / {state.maxHp}</span>
          </div>
          
          <div className="space-y-2 mt-6">
            <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(state.hp / state.maxHp) * 100}%` }}
                transition={{ duration: 1, ease: 'backOut' }}
                style={{
                  background: state.hp > 50
                    ? 'linear-gradient(90deg, #10b981, #34d399)'
                    : state.hp > 25
                      ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                      : 'linear-gradient(90deg, #ef4444, #f87171)',
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
              <span>Kritik</span>
              <span>Stabil</span>
              <span>Maksimum</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stat Grid */}
      <section>
        <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
          <Swords className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-black uppercase tracking-widest">TEMEL NİTELİKLER</h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {STAT_CONFIG.map(({ key, label, icon: Icon, color, bg }, i) => (
            <motion.div
              key={key}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-panel glass-panel-hover rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-3 group relative"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-500"
                style={{ backgroundColor: bg }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div>
                <p className="text-3xl font-black leading-tight" style={{ color }}>
                  {state.stats[key as keyof typeof state.stats]}
                </p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  {label}
                </p>
              </div>
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quest Intelligence */}
      <section>
        <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
          <Target className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-black uppercase tracking-widest">GÖREV İSTİHBARATI</h2>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="glass-panel rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 -mr-32 -mt-32 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 -ml-32 -mb-32 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white/5 transition-colors">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Günlük Görev</span>
              <p className="text-5xl font-black neon-text-blue">
                {state.quests.filter(q => q.type === 'daily' && !q.completed).length}
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-medium italic">Tamamlanmayı Bekliyor</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white/5 transition-colors border-x border-white/5">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Yan Görevler</span>
              <p className="text-5xl font-black neon-text-purple">
                {state.quests.filter(q => q.type === 'side' && !q.completed).length}
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-medium italic">Aktif Maceralar</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white/5 transition-colors">
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Boss Tehdidi</span>
              <p className="text-5xl font-black neon-text-red">
                {state.quests.filter(q => q.type === 'boss' && !q.completed).length}
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-medium italic">Yüksek Öncelikli Hedef</p>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
