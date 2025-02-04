import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ForecastData } from '../types';
import { TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  data: ForecastData[];
}

export const ForecastChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-bold">FEV1 Forecast</h2>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="predicted_fev1" 
              stroke="#10B981" 
              name="Predicted FEV1"
            />
            <Line 
              type="monotone" 
              dataKey="confidence_upper" 
              stroke="#D1FAE5" 
              name="Confidence Interval"
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="confidence_lower" 
              stroke="#D1FAE5" 
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};