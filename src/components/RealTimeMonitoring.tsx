import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SpirometryData } from '../types';
import { Activity, Wifi, Bluetooth, Signal } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  data: SpirometryData[];
  latestReading: SpirometryData;
}

export const RealTimeMonitoring: React.FC<Props> = ({ data, latestReading }) => {
  const lastFiveMinutes = data.slice(-30);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold">Real-Time Monitoring</h2>
        </div>
        <div className="flex items-center gap-4">
          {latestReading.connection_type === 'wifi' ? (
            <Wifi className={`w-4 h-4 sm:w-5 sm:h-5 ${latestReading.device_status === 'connected' ? 'text-green-500' : 'text-red-500'}`} />
          ) : (
            <Bluetooth className={`w-4 h-4 sm:w-5 sm:h-5 ${latestReading.device_status === 'connected' ? 'text-green-500' : 'text-red-500'}`} />
          )}
          <Signal className={`w-4 h-4 sm:w-5 sm:h-5 ${
            latestReading.signal_strength > 80 ? 'text-green-500' :
            latestReading.signal_strength > 50 ? 'text-yellow-500' : 'text-red-500'
          }`} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600">FEV1</p>
          <p className="text-lg sm:text-2xl font-bold text-blue-600">{latestReading.fev1.toFixed(2)} L</p>
        </div>
        <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600">FVC</p>
          <p className="text-lg sm:text-2xl font-bold text-green-600">{latestReading.fvc.toFixed(2)} L</p>
        </div>
        <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600">PEF</p>
          <p className="text-lg sm:text-2xl font-bold text-purple-600">{latestReading.pef.toFixed(2)} L/s</p>
        </div>
        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600">FEV1/FVC</p>
          <p className="text-lg sm:text-2xl font-bold text-orange-600">
            {(latestReading.fev1_fvc_ratio * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lastFiveMinutes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(time) => format(new Date(time), 'HH:mm:ss')}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              labelFormatter={(time) => format(new Date(time), 'HH:mm:ss')}
              contentStyle={{ fontSize: '12px' }}
            />
            <Legend iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="fev1" stroke="#3B82F6" name="FEV1" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="fvc" stroke="#10B981" name="FVC" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="pef" stroke="#8B5CF6" name="PEF" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};