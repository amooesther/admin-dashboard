import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Trash } from 'lucide-react';

const ActivityTable = ({ activityData, users, onRemoveUser }) => {
  return (
    <div className="bg-white flex flex-col rounded border border-gray-200 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-gray-700 font-medium text-sm">Development Activity</h3>
      </div>

      {/* Legend & Chart Area */}
      <div className="pt-4  flex flex-col">
        <div className="flex px-6 items-center text-xs text-gray-500 mb-2 font-medium">
             <div className="w-2.5 h-2.5 bg-tablerBlue rounded-sm mr-2"></div>
             Purchases
        </div>
        
        <div className="h-40 w-full px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#206bc4" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#206bc4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '4px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                itemStyle={{ color: '#206bc4' }}
              />
              <Area 
                type="monotone" 
                dataKey="Purchases" 
                stroke="#206bc4" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPurchases)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border-t border-gray-200">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="lowercase text-xs text-gray-400 bg-white border-b border-gray-100 font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Commit</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs">
                     {user.id === 1 ? (
                        <img src="https://i.pravatar.cc/150?img=11" alt="User 1" className="h-full w-full object-cover" />
                     ) : user.id === 3 ? (
                        <img src="https://i.pravatar.cc/150?img=32" alt="User 3" className="h-full w-full object-cover" />
                     ) : (
                        user.initial
                     )}
                  </div>
                  <span>{user.name}</span>
                </td>
                <td className="px-6 py-3 max-w-[200px] truncate">
                  {user.commit}
                </td>
                <td className="px-6 py-3 text-gray-500">
                  {user.date}
                </td>
                <td className="px-6 py-3 text-right">
                  <button 
                    onClick={() => onRemoveUser(user.id)}
                    className="text-gray-400 hover:text-tablerRed transition-colors"
                    title="Remove User"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
            
            {users.length === 0 && (
                <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">No activity recorded.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
