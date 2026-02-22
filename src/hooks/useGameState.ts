import { useState, useCallback, useEffect } from 'react';
import {
  GameState, Quest, MarketItem, Stats, Rank,
  XP_PER_LEVEL, RANK_ORDER, RANK_THRESHOLDS,
  DEFAULT_DAILY_QUESTS, DEFAULT_SIDE_QUESTS, DEFAULT_BOSS_QUESTS,
  DEFAULT_MARKET_ITEMS, DEFAULT_SKILLS,
} from '@/types/game';

const STORAGE_KEY = 'solo-leveling-state';

const generateId = () => Math.random().toString(36).substring(2, 9);

const createInitialState = (): GameState => ({
  playerName: 'Avcı',
  level: 1,
  xp: 0,
  xpToNext: XP_PER_LEVEL(1),
  rank: 'E',
  gold: 0,
  hp: 100,
  maxHp: 100,
  stats: { strength: 1, intelligence: 1, discipline: 1, charisma: 1, skill: 1 },
  quests: [
    ...DEFAULT_DAILY_QUESTS.map(q => ({ ...q, id: generateId(), completed: false, createdAt: new Date().toISOString() })),
    ...DEFAULT_SIDE_QUESTS.map(q => ({ ...q, id: generateId(), completed: false, createdAt: new Date().toISOString() })),
    ...DEFAULT_BOSS_QUESTS.map(q => ({ ...q, id: generateId(), completed: false, createdAt: new Date().toISOString() })),
  ],
  skills: DEFAULT_SKILLS.map(s => ({ ...s, id: generateId() })),
  inventory: [],
  marketItems: DEFAULT_MARKET_ITEMS.map(i => ({ ...i, id: generateId(), owned: false })),
  heatmap: [],
  streakDays: 0,
  totalQuestsCompleted: 0,
  setupDone: false,
});

const loadState = (): GameState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return createInitialState();
};

export function useGameState() {
  const [state, setState] = useState<GameState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = useCallback((updater: (prev: GameState) => GameState) => {
    setState(prev => updater(prev));
  }, []);

  const setPlayerName = useCallback((name: string) => {
    updateState(s => ({ ...s, playerName: name, setupDone: true }));
  }, [updateState]);

  const getRankForLevel = (level: number): Rank => {
    let rank: Rank = 'E';
    for (const r of RANK_ORDER) {
      if (level >= RANK_THRESHOLDS[r]) rank = r;
    }
    return rank;
  };

  const addXp = useCallback((amount: number) => {
    updateState(s => {
      let newXp = s.xp + amount;
      let newLevel = s.level;
      let newXpToNext = s.xpToNext;

      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel++;
        newXpToNext = XP_PER_LEVEL(newLevel);
      }

      const newRank = getRankForLevel(newLevel);
      const newSkills = s.skills.map(sk => ({
        ...sk,
        unlocked: sk.unlocked || newLevel >= sk.requiredLevel,
      }));

      return { ...s, xp: newXp, level: newLevel, xpToNext: newXpToNext, rank: newRank, skills: newSkills };
    });
  }, [updateState]);

  const completeQuest = useCallback((questId: string) => {
    updateState(s => {
      const quest = s.quests.find(q => q.id === questId);
      if (!quest || quest.completed) return s;

      const newStats = { ...s.stats };
      for (const [key, val] of Object.entries(quest.statRewards)) {
        newStats[key as keyof Stats] += val as number;
      }

      const today = new Date().toISOString().split('T')[0];
      const heatmap = [...s.heatmap];
      const todayEntry = heatmap.find(h => h.date === today);
      if (todayEntry) todayEntry.count++;
      else heatmap.push({ date: today, count: 1 });

      let newXp = s.xp + quest.xpReward;
      let newLevel = s.level;
      let newXpToNext = s.xpToNext;
      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel++;
        newXpToNext = XP_PER_LEVEL(newLevel);
      }
      const newRank = getRankForLevel(newLevel);
      const newHp = Math.min(s.maxHp, s.hp + 5);

      const newSkills = s.skills.map(sk => ({
        ...sk,
        unlocked: sk.unlocked || newLevel >= sk.requiredLevel,
      }));

      return {
        ...s,
        quests: s.quests.map(q => q.id === questId ? { ...q, completed: true } : q),
        stats: newStats,
        gold: s.gold + quest.goldReward,
        xp: newXp,
        level: newLevel,
        xpToNext: newXpToNext,
        rank: newRank,
        hp: newHp,
        heatmap,
        totalQuestsCompleted: s.totalQuestsCompleted + 1,
        skills: newSkills,
      };
    });
  }, [updateState]);

  const addQuest = useCallback((quest: Omit<Quest, 'id' | 'completed' | 'createdAt'>) => {
    updateState(s => ({
      ...s,
      quests: [...s.quests, { ...quest, id: generateId(), completed: false, createdAt: new Date().toISOString() }],
    }));
  }, [updateState]);

  const buyItem = useCallback((itemId: string) => {
    updateState(s => {
      const item = s.marketItems.find(i => i.id === itemId);
      if (!item || item.owned || s.gold < item.cost) return s;
      return {
        ...s,
        gold: s.gold - item.cost,
        marketItems: s.marketItems.map(i => i.id === itemId ? { ...i, owned: true } : i),
        inventory: [...s.inventory, { ...item, owned: true }],
      };
    });
  }, [updateState]);

  const addMarketItem = useCallback((item: Omit<MarketItem, 'id' | 'owned'>) => {
    updateState(s => ({
      ...s,
      marketItems: [...s.marketItems, { ...item, id: generateId(), owned: false }],
    }));
  }, [updateState]);

  const upgradeSkill = useCallback((skillId: string) => {
    updateState(s => {
      const sk = s.skills.find(s2 => s2.id === skillId);
      if (!sk || !sk.unlocked || sk.level >= sk.maxLevel) return s;
      return {
        ...s,
        skills: s.skills.map(s2 => s2.id === skillId ? { ...s2, level: s2.level + 1 } : s2),
      };
    });
  }, [updateState]);

  const takeDamage = useCallback((amount: number) => {
    updateState(s => ({ ...s, hp: Math.max(0, s.hp - amount) }));
  }, [updateState]);

  const resetGame = useCallback(() => {
    setState(createInitialState());
  }, []);

  return {
    state,
    setPlayerName,
    addXp,
    completeQuest,
    addQuest,
    buyItem,
    addMarketItem,
    upgradeSkill,
    takeDamage,
    resetGame,
  };
}
