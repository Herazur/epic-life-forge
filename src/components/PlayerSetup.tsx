import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Sparkles, Shield, Zap } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PlayerSetup() {
  const { setPlayerName } = useGame();
  const [name, setName] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (name.trim()) {
      setIsStarting(true);
      setTimeout(() => setPlayerName(name.trim()), 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background mesh-gradient relative overflow-hidden p-6 text-foreground">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence>
        {!isStarting ? (
          <motion.div
            key="setup-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-panel rounded-[2rem] p-12 max-w-lg w-full text-center relative z-10 border-white/10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="inline-block mb-8 relative"
            >
              <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full" />
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto relative z-10 shadow-2xl">
                <Sword className="w-12 h-12 text-white" />
              </div>
              <motion.div 
                className="absolute -top-2 -right-2 p-2 bg-background rounded-xl border border-white/10 shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </motion.div>

            <h1 className="text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
              <span className="text-white">EPIC</span> <span className="neon-text-purple">LIFE</span><br/>
              <span className="text-2xl text-muted-foreground tracking-[0.3em] font-bold">FORGE</span>
            </h1>
            
            <p className="text-muted-foreground font-medium mb-10 max-w-[280px] mx-auto leading-relaxed">
              Kendi kaderini yazmaya hazır mısın? İsmini gir ve sisteme giriş yap.
            </p>

            <div className="space-y-6 relative group">
              <div className="relative">
                <Input
                  placeholder="AVCI ADINIZ..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleStart()}
                  className="h-16 bg-white/5 border-white/10 text-center text-xl font-black uppercase tracking-widest rounded-2xl focus:ring-primary focus:border-primary transition-all pr-12"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <Button 
                onClick={handleStart} 
                disabled={!name.trim()} 
                className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white text-xl font-black uppercase tracking-widest shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all duration-500 overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="flex items-center gap-3">
                  MACERAYI BAŞLAT ⚔️
                </span>
              </Button>
              
              <div className="flex justify-center gap-6 opacity-40">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span className="text-[10px] font-black tracking-widest uppercase">GÜVENLİ</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span className="text-[10px] font-black tracking-widest uppercase">HIZLI</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl font-black neon-text-purple tracking-tighter uppercase mb-4"
            >
              SISTEM BAŞLATILIYOR...
            </motion.div>
            <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/10">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
