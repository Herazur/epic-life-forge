import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Plus, Swords, Scroll, Target } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Quest } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';

const TAB_CONFIG = [
  { type: 'daily' as const, label: 'Günlük', icon: Scroll, color: 'neon-text-blue' },
  { type: 'side' as const, label: 'Yan Görev', icon: Target, color: 'neon-text-purple' },
  { type: 'boss' as const, label: 'Boss', icon: Swords, color: 'neon-text-red' },
];

export default function Quests() {
  const { state, completeQuest, addQuest } = useGame();
  const [activeTab, setActiveTab] = useState<'daily' | 'side' | 'boss'>('daily');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newQuest, setNewQuest] = useState({ title: '', description: '', xpReward: 30, goldReward: 10 });

  const filtered = state.quests.filter(q => q.type === activeTab);
  const pending = filtered.filter(q => !q.completed);
  const completed = filtered.filter(q => q.completed);

  const handleAddQuest = () => {
    if (!newQuest.title) return;
    addQuest({
      ...newQuest,
      type: activeTab,
      statRewards: {},
      isTemplate: false,
    });
    setNewQuest({ title: '', description: '', xpReward: 30, goldReward: 10 });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold neon-text-blue">📜 Görevler</h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TAB_CONFIG.map(tab => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.type
                ? 'glass-panel neon-border ' + tab.color
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add Quest */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="neon-border">
            <Plus className="w-4 h-4 mr-2" /> Yeni Görev Ekle
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-panel border-border">
          <DialogHeader>
            <DialogTitle>Yeni {TAB_CONFIG.find(t => t.type === activeTab)?.label} Görevi</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-3">
            <Input placeholder="Görev adı" value={newQuest.title} onChange={e => setNewQuest(q => ({ ...q, title: e.target.value }))} className="bg-secondary/50" />
            <Textarea placeholder="Açıklama" value={newQuest.description} onChange={e => setNewQuest(q => ({ ...q, description: e.target.value }))} className="bg-secondary/50" />
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">XP Ödülü</label>
                <Input type="number" value={newQuest.xpReward} onChange={e => setNewQuest(q => ({ ...q, xpReward: +e.target.value }))} className="bg-secondary/50" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Altın Ödülü</label>
                <Input type="number" value={newQuest.goldReward} onChange={e => setNewQuest(q => ({ ...q, goldReward: +e.target.value }))} className="bg-secondary/50" />
              </div>
            </div>
            <Button onClick={handleAddQuest} className="w-full">Ekle</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pending Quests */}
      <div className="space-y-3">
        <AnimatePresence>
          {pending.map((quest, i) => (
            <QuestCard key={quest.id} quest={quest} onComplete={completeQuest} delay={i * 0.05} />
          ))}
        </AnimatePresence>
        {pending.length === 0 && (
          <p className="text-muted-foreground text-center py-8">Tüm görevler tamamlandı! 🎉</p>
        )}
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm text-muted-foreground mb-2">Tamamlanan ({completed.length})</h3>
          <div className="space-y-2 opacity-50">
            {completed.map(q => (
              <div key={q.id} className="glass-panel rounded-lg p-3 flex items-center gap-3 line-through">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">{q.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuestCard({ quest, onComplete, delay }: { quest: Quest; onComplete: (id: string) => void; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay }}
      className="glass-panel rounded-xl p-4 neon-border hover:scale-[1.01] transition-transform"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{quest.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{quest.description}</p>
          <div className="flex gap-3 mt-2">
            <span className="text-xs neon-text-blue">+{quest.xpReward} XP</span>
            <span className="text-xs neon-text-gold">+{quest.goldReward} 🪙</span>
            {Object.entries(quest.statRewards).map(([stat, val]) => (
              <span key={stat} className="text-xs neon-text-green">+{val} {stat}</span>
            ))}
          </div>
        </div>
        <Button size="sm" onClick={() => onComplete(quest.id)} className="ml-3 neon-glow-purple">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Tamamla
        </Button>
      </div>
    </motion.div>
  );
}
