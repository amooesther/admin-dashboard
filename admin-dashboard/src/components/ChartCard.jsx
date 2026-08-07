import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ChartCard = ({ title, data, type }) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded shadow p-2 text-sm">
          <p className="label">{`${payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col h-[300px]">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-gray-700 font-medium text-sm">{title}</h3>
      </div>
      <div className="flex-1 p-4 flex justify-center items-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
             <Pie
               data={data}
               cx="50%"
               cy="50%"
               innerRadius={type === 'donut' ? 60 : 0}
               outerRadius={80}
               paddingAngle={type === 'donut' ? 2 : 0}
               dataKey="value"
               stroke="none"
             >
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={entry.fill} />
               ))}
             </Pie>
             <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Absolute labels could go here to match Tabler mock more precisely */}
      </div>
    </div>
  );
};

export default ChartCard;
