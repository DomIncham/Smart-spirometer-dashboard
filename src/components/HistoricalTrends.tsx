import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SpirometryData, ReferenceValue } from '../types';
import { TrendingUp, Calendar } from 'lucide-react';
import { format, subDays, subWeeks, subMonths } from 'date-fns';

interface Props {
  data: SpirometryData[];
  referenceValues: ReferenceValue;
}

type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y';

export const HistoricalTrends: React.FC<Props> = ({ data, referenceValues }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');

  const getFilteredData = () => {
    const now = new Date();
    const cutoffDate = {
      '1W': subDays(now, 7),
      '1M': subMonths(now, 1),
      '3M': subMonths(now, 3),
      '6M': subMonths(now, 6),
      '1Y': subMonths(now, 12),
    }[timeRange];

    return data.filter(reading => new Date(reading.timestamp) >= cutoffDate);
  };

  const filteredData = getFilteredData();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold">Historical Trends</h2>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="border rounded-md px-2 py-1"
          >
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="6M">6 Months</option>
            <option value="1Y">1 Year</option>
          </select>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
            />
            <Legend />
            <Line type="monotone" dataKey="fev1" stroke="#3B82F6" name="FEV1" />
            <Line type="monotone" dataKey="fvc" stroke="#10B981" name="FVC" />
            <Line type="monotone" dataKey="pef" stroke="#8B5CF6" name="PEF" />
            <Line 
              type="monotone" 
              data={[{ timestamp: filteredData[0]?.timestamp, fev1: referenceValues.fev1 }]} 
              dataKey="fev1"
              stroke="#3B82F6"
              strokeDasharray="5 5"
              name="Reference FEV1"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};