import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ForecastData } from '../types';
import { AlertTriangle, BrainCircuit } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  forecastData: ForecastData[];
}

export const RiskAnalysis: React.FC<Props> = ({ forecastData }) => {
  const latestForecast = forecastData[forecastData.length - 1];
  const riskColor = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  }[latestForecast.risk_level];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold">AI Prediction & Risk Analysis</h2>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${riskColor}`}>
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium capitalize">
            {latestForecast.risk_level} Risk
          </span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
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
              stroke="#8B5CF6" 
              name="Predicted FEV1"
            />
            <Line 
              type="monotone" 
              dataKey="confidence_upper" 
              stroke="#C4B5FD" 
              name="Confidence Interval"
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="confidence_lower" 
              stroke="#C4B5FD" 
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {latestForecast.risk_level !== 'low' && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Risk Alert</h3>
          </div>
          <p className="mt-2 text-red-700">
            Your lung function shows signs of decline. Consider consulting your healthcare provider.
          </p>
        </div>
      )}
    </div>
  );
};