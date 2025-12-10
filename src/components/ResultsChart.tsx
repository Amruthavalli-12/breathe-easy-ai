import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { PredictionResult } from '@/lib/symptomAnalyzer';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface ResultsChartProps {
  predictions: PredictionResult[];
}

const COLORS = [
  'hsl(174, 58%, 40%)',   // Primary teal
  'hsl(152, 55%, 45%)',   // Accent green
  'hsl(200, 60%, 45%)',   // Blue
  'hsl(38, 92%, 50%)',    // Warning amber
  'hsl(280, 50%, 50%)',   // Purple
];

const ResultsChart = ({ predictions }: ResultsChartProps) => {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const chartData = predictions.map((p, idx) => ({
    name: p.disease.name,
    probability: p.probability,
    color: COLORS[idx % COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { name: string; probability: number } }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-medium p-3">
          <p className="font-semibold text-foreground">{payload[0].payload.name}</p>
          <p className="text-primary font-medium">{payload[0].value}% probability</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Chart Type Toggle */}
      <div className="flex justify-end gap-2">
        <Button
          variant={chartType === 'bar' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setChartType('bar')}
        >
          <BarChart3 className="w-4 h-4" />
          Bar
        </Button>
        <Button
          variant={chartType === 'pie' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setChartType('pie')}
        >
          <PieChartIcon className="w-4 h-4" />
          Pie
        </Button>
      </div>

      {/* Chart Container */}
      <div className="h-[300px] w-full">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 10 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="probability" radius={[0, 8, 8, 0]} maxBarSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="probability"
                nameKey="name"
                label={({ name, probability }) => `${name}: ${probability}%`}
                labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--background))" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ResultsChart;
