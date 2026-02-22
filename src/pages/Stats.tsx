import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Stats() {
  const { state } = useGame();

  const statData = [
    { stat: 'Kuvvet', value: state.stats.strength },
    { stat: 'Zeka', value: state.stats.intelligence },
    { stat: 'Disiplin', value: state.stats.discipline },
    { stat: 'Karizma', value: state.stats.charisma },
    { stat: 'Beceri', value: state.stats.skill },
  ];

  // Heatmap: last 30 days
  const today = new Date();
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    const dateStr = d.toISOString().split('T')[0];
    const entry = state.heatmap.find(h => h.date === dateStr);
    return { date: dateStr, count: entry?.count || 0, day: d.getDate() };
  });

  const maxCount = Math.max(...last30.map(d => d.count), 1);

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold neon-text-blue">📊 İstatistikler</h1>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Görev', value: state.totalQuestsCompleted, color: 'neon-text-blue' },
          { label: 'Seviye', value: state.level, color: 'neon-text-purple' },
          { label: 'Altın', value: state.gold, color: 'neon-text-gold' },
          { label: 'Seri', value: `${state.streakDays} gün`, color: 'neon-text-green' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-panel rounded-xl p-4 text-center neon-border">
            <p className={`text-3xl font-black ${item.color}`}>{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Radar chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-panel rounded-xl p-5 neon-border">
        <h2 className="text-lg font-semibold mb-4">🕸️ Stat Radarı</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={statData}>
              <PolarGrid stroke="hsl(228 20% 25%)" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: 'hsl(220 20% 70%)', fontSize: 12 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="hsl(245 80% 65%)" fill="hsl(245 80% 65%)" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bar chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-panel rounded-xl p-5 neon-border">
        <h2 className="text-lg font-semibold mb-4">📈 Stat Değerleri</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statData}>
              <XAxis dataKey="stat" tick={{ fill: 'hsl(220 20% 70%)', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(220 20% 50%)', fontSize: 10 }} axisLine={false} />
              <Tooltip
                contentStyle={{ background: 'hsl(228 25% 11%)', border: '1px solid hsl(245 80% 65% / 0.3)', borderRadius: 8 }}
                labelStyle={{ color: 'hsl(220 20% 90%)' }}
              />
              <Bar dataKey="value" fill="hsl(200 90% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Heatmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass-panel rounded-xl p-5 neon-border">
        <h2 className="text-lg font-semibold mb-4">🔥 Son 30 Gün Aktivite</h2>
        <div className="flex gap-1 flex-wrap">
          {last30.map(d => (
            <div key={d.date} className="relative group">
              <div
                className="w-7 h-7 rounded-sm transition-all"
                style={{
                  background: d.count === 0
                    ? 'hsl(228 20% 14%)'
                    : `hsl(145 80% ${30 + (d.count / maxCount) * 30}% / ${0.3 + (d.count / maxCount) * 0.7})`,
                  boxShadow: d.count > 0 ? `0 0 ${4 + d.count * 2}px hsl(145 80% 50% / ${0.2 + (d.count / maxCount) * 0.3})` : 'none',
                }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block glass-panel rounded px-2 py-1 text-[10px] text-foreground whitespace-nowrap z-10">
                {d.date}: {d.count} görev
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
