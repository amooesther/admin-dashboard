import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200 hover:shadow-md h-28">
      <div className="absolute top-3 right-3 flex items-center text-xs font-semibold">
        <span className={isPositive ? 'text-tablerGreen' : 'text-tablerRed'}>
          {change}
        </span>
        {isPositive ? (
           <TrendingUp className="ml-1 text-tablerGreen" size={14} />
        ) : (
           <TrendingDown className="ml-1 text-tablerRed" size={14} />
        )}
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight text-gray-800">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </div>
    </div>
  );
};

export default StatsCard;
