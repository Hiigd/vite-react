import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

interface SeismographProps {
  data: any[];
}

export const SeismographChart: React.FC<SeismographProps> = ({ data }) => {
  return (
    <div className="w-full h-64 bg-white p-4 rounded-lg shadow-inner border border-gray-200">
      <h4 className="text-center text-gray-500 text-sm mb-2 font-mono">محاكاة مخطط الزلزال (Seismogram)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
          <Tooltip 
            labelFormatter={() => ''}
            formatter={(value: number) => [value.toFixed(2), 'Amplitude']}
            contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '4px' }}
          />
          <ReferenceLine x={20} stroke="green" strokeDasharray="3 3" label={{ position: 'top', value: 'P-Wave', fill: 'green', fontSize: 12 }} />
          <ReferenceLine x={45} stroke="orange" strokeDasharray="3 3" label={{ position: 'top', value: 'S-Wave', fill: 'orange', fontSize: 12 }} />
          <ReferenceLine x={75} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: 'Surface', fill: 'red', fontSize: 12 }} />
          <Line 
            type="monotone" 
            dataKey="amplitude" 
            stroke="#2563eb" 
            strokeWidth={2} 
            dot={false} 
            isAnimationActive={true}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};