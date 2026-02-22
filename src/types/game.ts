export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export interface Stats {
  strength: number;
  intelligence: number;
  discipline: number;
  charisma: number;
  skill: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'side' | 'boss';
  xpReward: number;
  goldReward: number;
  statRewards: Partial<Stats>;
  completed: boolean;
  createdAt: string;
  deadline?: string;
  isTemplate: boolean;
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  requiredLevel: number;
  description: string;
}

export interface MarketItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  owned: boolean;
  category: 'reward' | 'gear';
}

export interface HeatmapEntry {
  date: string;
  count: number;
}

export interface GameState {
  playerName: string;
  level: number;
  xp: number;
  xpToNext: number;
  rank: Rank;
  gold: number;
  hp: number;
  maxHp: number;
  stats: Stats;
  quests: Quest[];
  skills: SkillNode[];
  inventory: MarketItem[];
  marketItems: MarketItem[];
  heatmap: HeatmapEntry[];
  streakDays: number;
  totalQuestsCompleted: number;
  setupDone: boolean;
}

export const RANK_ORDER: Rank[] = ['E', 'D', 'C', 'B', 'A', 'S'];

export const RANK_COLORS: Record<Rank, string> = {
  E: 'text-gray-400',
  D: 'neon-text-green',
  C: 'neon-text-blue',
  B: 'neon-text-purple',
  A: 'neon-text-gold',
  S: 'neon-text-red',
};

export const XP_PER_LEVEL = (level: number) => Math.floor(100 * Math.pow(1.3, level - 1));

export const RANK_THRESHOLDS: Record<Rank, number> = {
  E: 1, D: 5, C: 10, B: 20, A: 35, S: 50,
};

export const DEFAULT_DAILY_QUESTS: Omit<Quest, 'id' | 'completed' | 'createdAt'>[] = [
  { title: '100 Şınav', description: 'Günlük şınav hedefini tamamla', type: 'daily', xpReward: 30, goldReward: 10, statRewards: { strength: 2 }, isTemplate: true },
  { title: '30 dk Kitap Okuma', description: 'En az 30 dakika kitap oku', type: 'daily', xpReward: 25, goldReward: 8, statRewards: { intelligence: 2 }, isTemplate: true },
  { title: '10 dk Meditasyon', description: 'Zihinsel odaklanma egzersizi', type: 'daily', xpReward: 20, goldReward: 5, statRewards: { discipline: 2 }, isTemplate: true },
  { title: '5 km Koşu', description: 'Açık havada veya koşu bandında', type: 'daily', xpReward: 35, goldReward: 12, statRewards: { strength: 1, discipline: 1 }, isTemplate: true },
  { title: '1 Saat Kodlama', description: 'Proje üzerinde çalış veya yeni bir şey öğren', type: 'daily', xpReward: 30, goldReward: 10, statRewards: { skill: 2, intelligence: 1 }, isTemplate: true },
];

export const DEFAULT_SIDE_QUESTS: Omit<Quest, 'id' | 'completed' | 'createdAt'>[] = [
  { title: 'Yabancıyla Konuş', description: '3 yeni insanla sohbet başlat', type: 'side', xpReward: 50, goldReward: 20, statRewards: { charisma: 3 }, isTemplate: true },
  { title: 'Yeni Bir Yemek Yap', description: 'Hiç denemediğin bir tarif pişir', type: 'side', xpReward: 40, goldReward: 15, statRewards: { skill: 2 }, isTemplate: true },
  { title: 'Soğuk Duş', description: '3 dakika soğuk duş al', type: 'side', xpReward: 35, goldReward: 10, statRewards: { discipline: 3 }, isTemplate: true },
];

export const DEFAULT_BOSS_QUESTS: Omit<Quest, 'id' | 'completed' | 'createdAt'>[] = [
  { title: '24 Saat Sosyal Medyasız', description: 'Tüm sosyal medya uygulamalarını 24 saat kapalı tut', type: 'boss', xpReward: 150, goldReward: 75, statRewards: { discipline: 5, intelligence: 2 }, isTemplate: true },
  { title: 'Bir Günde Bir Kitap', description: 'Tam bir kitabı bir günde bitir', type: 'boss', xpReward: 200, goldReward: 100, statRewards: { intelligence: 5, discipline: 3 }, isTemplate: true },
];

export const DEFAULT_MARKET_ITEMS: Omit<MarketItem, 'id' | 'owned'>[] = [
  { name: '30 dk Video Oyunu', description: 'Favori oyununu 30 dakika oyna', cost: 30, category: 'reward' },
  { name: 'Film Gecesi', description: 'İstediğin bir filmi izle', cost: 50, category: 'reward' },
  { name: 'Atıştırmalık', description: 'Favori atıştırmalığını al', cost: 25, category: 'reward' },
  { name: 'Yeni Kitap', description: 'İstediğin bir kitabı satın al', cost: 80, category: 'gear' },
  { name: 'Online Kurs', description: 'Yeni bir beceri öğrenmek için kurs al', cost: 150, category: 'gear' },
  { name: 'Spor Ekipmanı', description: 'Antrenmanın için yeni ekipman', cost: 120, category: 'gear' },
];

export const DEFAULT_SKILLS: Omit<SkillNode, 'id'>[] = [
  { name: 'Temel Kodlama', category: 'Kodlama', level: 0, maxLevel: 5, unlocked: true, requiredLevel: 1, description: 'Programlama temelleri' },
  { name: 'Web Geliştirme', category: 'Kodlama', level: 0, maxLevel: 5, unlocked: false, requiredLevel: 5, description: 'Frontend & Backend' },
  { name: 'Yapay Zeka', category: 'Kodlama', level: 0, maxLevel: 5, unlocked: false, requiredLevel: 15, description: 'ML & AI temelleri' },
  { name: 'Dayanıklılık', category: 'Spor', level: 0, maxLevel: 5, unlocked: true, requiredLevel: 1, description: 'Kardiyo ve dayanıklılık' },
  { name: 'Güç Antrenmanı', category: 'Spor', level: 0, maxLevel: 5, unlocked: false, requiredLevel: 5, description: 'Ağırlık çalışması' },
  { name: 'Dövüş Sanatları', category: 'Spor', level: 0, maxLevel: 5, unlocked: false, requiredLevel: 20, description: 'Kendini savunma' },
  { name: 'Temel İngilizce', category: 'Dil', level: 0, maxLevel: 5, unlocked: true, requiredLevel: 1, description: 'İngilizce temelleri' },
  { name: 'İleri İngilizce', category: 'Dil', level: 0, maxLevel: 5, unlocked: false, requiredLevel: 10, description: 'Akıcı konuşma' },
  { name: 'Üçüncü Dil', category: 'Dil', level: 0, maxLevel: 5, unlocked: false, requiredLevel: 25, description: 'Yeni bir dil öğren' },
  { name: 'İletişim', category: 'Sosyal', level: 0, maxLevel: 5, unlocked: true, requiredLevel: 1, description: 'Etkili iletişim' },
  { name: 'Liderlik', category: 'Sosyal', level: 0, maxLevel: 5, unlocked: false, requiredLevel: 10, description: 'Takım yönetimi' },
  { name: 'Kamusal Konuşma', category: 'Sosyal', level: 0, maxLevel: 5, unlocked: false, requiredLevel: 20, description: 'Topluluk önünde konuşma' },
];
