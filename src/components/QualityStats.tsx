import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SpirometryData } from '../types';
import { Activity } from 'lucide-react';

interface Props {
  data: SpirometryData[];
}

export const QualityStats: React.FC<Props> = ({ data }) => {
  const averageQuality = data.reduce((acc, curr) => acc + curr.quality, 0) / data.length;
  
  const qualityDistribution = data.reduce((acc: Record<string, number>, curr) => {
    const range = Math.floor(curr.quality / 20) * 20;
    const key = `${range}-${range + 20}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(qualityDistribution).map(([range, count]) => ({
    range,
    count,
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">Quality Statistics</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">Average Quality Score</p>
        <p className="text-3xl font-bold text-blue-600">
          {averageQuality.toFixed(1)}%
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" name="Number of Readings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};