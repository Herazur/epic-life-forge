import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Plus, Coins } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';

export default function Market() {
  const { state, buyItem, addMarketItem } = useGame();
  const [tab, setTab] = useState<'shop' | 'inventory'>('shop');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<{ name: string; description: string; cost: number; category: 'reward' | 'gear' }>({ name: '', description: '', cost: 50, category: 'reward' });

  const handleAdd = () => {
    if (!newItem.name) return;
    addMarketItem(newItem);
    setNewItem({ name: '', description: '', cost: 50, category: 'reward' });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold neon-text-gold">🏪 Pazar Yeri</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Altın bakiyesi: <span className="neon-text-gold font-bold">{state.gold} 🪙</span>
        </p>
      </motion.div>

      <div className="flex gap-2">
        <button onClick={() => setTab('shop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'shop' ? 'glass-panel neon-border neon-text-gold' : 'text-muted-foreground hover:text-foreground'}`}>
          <ShoppingCart className="w-4 h-4" /> Mağaza
        </button>
        <button onClick={() => setTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === 'inventory' ? 'glass-panel neon-border neon-text-purple' : 'text-muted-foreground hover:text-foreground'}`}>
          <Package className="w-4 h-4" /> Envanter ({state.inventory.length})
        </button>
      </div>

      {tab === 'shop' && (
        <>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="neon-border"><Plus className="w-4 h-4 mr-2" /> Ödül Ekle</Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-border">
              <DialogHeader><DialogTitle>Yeni Ödül / Eşya</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-3">
                <Input placeholder="İsim" value={newItem.name} onChange={e => setNewItem(i => ({ ...i, name: e.target.value }))} className="bg-secondary/50" />
                <Input placeholder="Açıklama" value={newItem.description} onChange={e => setNewItem(i => ({ ...i, description: e.target.value }))} className="bg-secondary/50" />
                <Input type="number" placeholder="Altın maliyeti" value={newItem.cost} onChange={e => setNewItem(i => ({ ...i, cost: +e.target.value }))} className="bg-secondary/50" />
                <div className="flex gap-2">
                  {(['reward', 'gear'] as const).map(c => (
                    <button key={c} onClick={() => setNewItem(i => ({ ...i, category: c }))}
                      className={`px-3 py-1.5 rounded-lg text-xs ${newItem.category === c ? 'glass-panel neon-border' : 'text-muted-foreground'}`}>
                      {c === 'reward' ? '🎁 Ödül' : '⚔️ Eşya'}
                    </button>
                  ))}
                </div>
                <Button onClick={handleAdd} className="w-full">Ekle</Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.marketItems.filter(i => !i.owned).map((item, idx) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                className="glass-panel rounded-xl p-4 neon-border">
                <div className="text-2xl mb-2">{item.category === 'reward' ? '🎁' : '⚔️'}</div>
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="neon-text-gold text-sm font-bold flex items-center gap-1">
                    <Coins className="w-3 h-3" /> {item.cost}
                  </span>
                  <Button size="sm" disabled={state.gold < item.cost} onClick={() => buyItem(item.id)}
                    className={state.gold >= item.cost ? 'neon-glow-gold' : ''}>
                    Satın Al
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {tab === 'inventory' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.inventory.length === 0 ? (
            <p className="text-muted-foreground col-span-3 text-center py-8">Envanterin boş. Mağazadan eşya satın al!</p>
          ) : state.inventory.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className="glass-panel rounded-xl p-4 neon-border">
              <div className="text-2xl mb-2">{item.category === 'reward' ? '🎁' : '⚔️'}</div>
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
