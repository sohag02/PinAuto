import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', pins: 24, clicks: 180, impressions: 2400 },
  { name: 'Tue', pins: 28, clicks: 220, impressions: 2800 },
  { name: 'Wed', pins: 32, clicks: 340, impressions: 3200 },
  { name: 'Thu', pins: 25, clicks: 280, impressions: 2900 },
  { name: 'Fri', pins: 30, clicks: 390, impressions: 3400 },
  { name: 'Sat', pins: 35, clicks: 420, impressions: 3800 },
  { name: 'Sun', pins: 22, clicks: 290, impressions: 2600 },
];

export function PerformanceChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Overview</h3>
          <p className="text-sm text-muted-foreground">Impressions & clicks this week</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Impressions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Clicks</span>
          </div>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(16, 90%, 55%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(16, 90%, 55%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(223, 30%, 22%)" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(215, 20%, 65%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215, 20%, 65%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(223, 47%, 13%)', 
                border: '1px solid hsl(223, 30%, 22%)',
                borderRadius: '8px',
                boxShadow: '0 4px 24px -4px rgba(0,0,0,0.4)'
              }}
              labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
              itemStyle={{ color: 'hsl(215, 20%, 65%)' }}
            />
            <Area 
              type="monotone" 
              dataKey="impressions" 
              stroke="hsl(16, 90%, 55%)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorImpressions)" 
            />
            <Area 
              type="monotone" 
              dataKey="clicks" 
              stroke="hsl(280, 65%, 60%)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorClicks)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
