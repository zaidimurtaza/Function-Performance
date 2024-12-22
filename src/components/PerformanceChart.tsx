import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Timer } from 'lucide-react';

interface PerformanceChartProps {
  data: string[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  if (!data?.length) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center text-gray-400">
        <p>No performance data available</p>
      </div>
    );
  }

  const chartData = data.map((time, index) => ({
    run: `Run ${index + 1}`,
    time: parseFloat(time),
  }));

  const avgTime = chartData.reduce((acc, curr) => acc + curr.time, 0) / chartData.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-100 flex items-center">
          <Timer className="h-5 w-5 mr-2 text-indigo-400" />
          Performance Analysis
        </h3>
        <span className="text-sm text-gray-400">
          Avg: {avgTime.toFixed(2)}ms
        </span>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="run" stroke="#9CA3AF" />
            <YAxis
              stroke="#9CA3AF"
              label={{
                value: 'Time (ms)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#9CA3AF' }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.375rem',
                color: '#E5E7EB'
              }}
            />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#818CF8"
              strokeWidth={2}
              dot={{ r: 6, fill: '#818CF8' }}
              name="Execution Time"
              activeDot={{ r: 8, fill: '#C7D2FE' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}