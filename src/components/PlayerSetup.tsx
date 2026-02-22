import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sword } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PlayerSetup() {
  const { setPlayerName } = useGame();
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) setPlayerName(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-panel rounded-2xl p-10 neon-border max-w-md w-full text-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-block mb-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/20 neon-glow-purple flex items-center justify-center mx-auto">
            <Sword className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-black neon-text-purple mb-2">SOLO LEVELING</h1>
        <p className="text-sm text-muted-foreground mb-6">Gerçek hayat RPG sistemine hoş geldin. Adını gir ve macerana başla!</p>

        <div className="space-y-4">
          <Input
            placeholder="Avcı adını gir..."
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            className="bg-secondary/50 text-center text-lg"
          />
          <Button onClick={handleStart} disabled={!name.trim()} className="w-full neon-glow-purple text-lg py-5">
            ⚔️ Macerayı Başlat
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
