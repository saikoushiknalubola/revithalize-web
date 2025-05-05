
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useScreenSize } from '@/hooks/use-mobile';

// Mock data for the battery efficiency chart
const batteryEfficiencyData = [
  { month: 'Jan', efficiency: 95, temperature: 27, range: 155 },
  { month: 'Feb', efficiency: 94, temperature: 28, range: 152 },
  { month: 'Mar', efficiency: 93, temperature: 30, range: 148 },
  { month: 'Apr', efficiency: 92, temperature: 32, range: 145 },
  { month: 'May', efficiency: 91, temperature: 35, range: 141 },
  { month: 'Jun', efficiency: 90, temperature: 36, range: 138 },
];

export function BatteryEfficiencyChart() {
  const { isMobile } = useScreenSize();
  
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={batteryEfficiencyData}
          margin={{ top: 5, right: 30, left: isMobile ? -15 : 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" tick={{ fill: '#888' }} />
          <YAxis yAxisId="left" tick={{ fill: '#888' }} domain={[85, 100]} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: '#888' }} domain={[0, 50]} />
          <YAxis yAxisId="range" orientation="right" tick={{ fill: '#888' }} domain={[130, 160]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', borderRadius: '8px' }} 
            itemStyle={{ color: '#ddd' }}
            labelStyle={{ color: 'white', fontWeight: 'bold' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: 10 }}
            formatter={(value) => <span style={{ color: '#ddd' }}>{value}</span>}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="efficiency" 
            name="Efficiency (%)" 
            stroke="#00FF94" 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#00FF94' }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="temperature" 
            name="Temperature (°C)" 
            stroke="#FF6B6B" 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#FF6B6B' }}
          />
          <Line 
            yAxisId="range"
            type="monotone" 
            dataKey="range" 
            name="Range (km)" 
            stroke="#00B8FF" 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#00B8FF' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
