import { motion } from 'framer-motion';
import { Lock, Unlock, ChevronUp } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

const CATEGORY_COLORS: Record<string, string> = {
  'Kodlama': 'hsl(200 90% 55%)',
  'Spor': 'hsl(0 85% 55%)',
  'Dil': 'hsl(45 95% 55%)',
  'Sosyal': 'hsl(265 85% 60%)',
};

export default function SkillTree() {
  const { state, upgradeSkill } = useGame();

  const categories = [...new Set(state.skills.map(s => s.category))];

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold neon-text-green">🌳 Beceri Ağacı</h1>
        <p className="text-muted-foreground text-sm mt-1">Seviye {state.level} — Yeni beceriler açmak için seviye atla</p>
      </motion.div>

      {categories.map((cat, ci) => (
        <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: CATEGORY_COLORS[cat] }} />
            {cat}
          </h2>
          <div className="flex gap-4 flex-wrap">
            {state.skills.filter(s => s.category === cat).map((skill, si) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: ci * 0.1 + si * 0.05 }}
                className={`glass-panel rounded-xl p-4 w-48 text-center transition-all ${
                  skill.unlocked ? 'neon-border hover:scale-105' : 'opacity-40 border border-border'
                }`}
              >
                <div className="mb-2">
                  {skill.unlocked ? (
                    <Unlock className="w-6 h-6 mx-auto" style={{ color: CATEGORY_COLORS[cat] }} />
                  ) : (
                    <Lock className="w-6 h-6 mx-auto text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-semibold text-sm">{skill.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-1">{skill.description}</p>

                {/* Level dots */}
                <div className="flex justify-center gap-1 mt-3">
                  {Array.from({ length: skill.maxLevel }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: i < skill.level ? CATEGORY_COLORS[cat] : 'hsl(228 20% 18%)',
                        boxShadow: i < skill.level ? `0 0 6px ${CATEGORY_COLORS[cat]}` : 'none',
                      }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{skill.level}/{skill.maxLevel}</p>

                {skill.unlocked && skill.level < skill.maxLevel ? (
                  <Button size="sm" variant="outline" className="mt-2 text-xs neon-border" onClick={() => upgradeSkill(skill.id)}>
                    <ChevronUp className="w-3 h-3 mr-1" /> Yükselt
                  </Button>
                ) : !skill.unlocked ? (
                  <p className="text-[10px] text-muted-foreground mt-2">Lv.{skill.requiredLevel} gerekli</p>
                ) : (
                  <p className="text-[10px] neon-text-gold mt-2">MAX</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
